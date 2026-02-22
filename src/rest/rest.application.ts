import { IConfig, RestSchema } from '../shared/libs/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly _logger: ILogger,
    private readonly _config: IConfig<RestSchema>
  ) {}

  public async init(): Promise<void> {
    this._logger.info('REST application init');
    this._logger.info(`Get value from env $PORT: ${this._config.get('PORT')}`);
  }
}
