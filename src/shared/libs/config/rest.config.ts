import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { IConfig } from './interfaces/config.interface.js';
import { ILogger } from '../logger/index.js';

export class RestConfig implements IConfig {
  private readonly _config: NodeJS.ProcessEnv;

  constructor(
    private readonly _logger: ILogger
  ) {
    const parsedOutput: DotenvConfigOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist');
    }

    this._config = <DotenvParseOutput>parsedOutput.parsed;
    this._logger.info('.env file found and parsed successfully');
  }

  public get(key: string): string | undefined {
    return this._config[key];
  }
}
