import { ILogger } from './interfaces/logger.interface.js';
import { Logger as PinoInstanse, pino } from 'pino';

export class PinoLogger implements ILogger {
  private readonly _logger: PinoInstanse;

  constructor() {
    this._logger = pino();
  }

  public info(message: string): void {
    this._logger.info(message);
  }

  public warn(message: string): void {
    this._logger.warn(message);
  }

  public error(message: string, error: Error): void {
    this._logger.error(error, message);
  }

  public debug(message: string): void {
    this._logger.debug(message);
  }
}
