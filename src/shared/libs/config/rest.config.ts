import { config, DotenvConfigOutput } from 'dotenv';
import { IConfig } from './interfaces/config.interface.js';
import { ILogger } from '../logger/index.js';
import { RestSchema } from './types/rest-schema.type.js';
import { configRestSchema } from './rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';

@injectable()
export class RestConfig implements IConfig<RestSchema> {
  private readonly _config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly _logger: ILogger
  ) {
    const parsedOutput: DotenvConfigOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist');
    }

    configRestSchema.load({});
    try {
      configRestSchema.validate({ allowed: 'strict', output: this._logger.info });
    } catch(error: unknown) {
      if (error instanceof Error) {
        this._logger.error('Config schema is invalid', error);
      }
    }

    this._config = configRestSchema.getProperties();
    this._logger.info('.env file found and parsed successfully');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this._config[key];
  }
}
