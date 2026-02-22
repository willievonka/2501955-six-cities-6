import { inject, injectable } from 'inversify';
import { IConfig, RestSchema } from '../shared/libs/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly _logger: ILogger,
    @inject(Component.Config) private readonly _config: IConfig<RestSchema>
  ) {}

  public async init(): Promise<void> {
    this._logger.info('REST application init');
    this._logger.info(`Get value from env $PORT: ${this._config.get('PORT')}`);
  }
}
