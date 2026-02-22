import { resolve } from 'node:path';
import { ILogger } from './interfaces/logger.interface.js';
import { DestinationStream as PinoDestinationStream, Logger as PinoInstanse, pino, transport } from 'pino';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';

export class PinoLogger implements ILogger {
  private readonly _logger: PinoInstanse;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport: PinoDestinationStream = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info'
        }
      ]
    });

    this._logger = pino({}, multiTransport);
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
