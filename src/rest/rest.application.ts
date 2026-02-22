import { ILogger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly _logger: ILogger
  ) {}

  public async init(): Promise<void> {
    this._logger.info('REST application init');
  }
}
