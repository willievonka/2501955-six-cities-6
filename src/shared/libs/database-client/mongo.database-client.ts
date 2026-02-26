import { inject, injectable } from 'inversify';
import { IDatabaseClient } from './interfaces/database-client.interface.js';
import * as Mongoose from 'mongoose';
import { Component } from '../../types/index.js';
import { ILogger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private _mongoose!: typeof Mongoose;
  private _isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly _logger: ILogger
  ) {
    this._isConnected = false;
  }

  public isConnectedToDatabase(): boolean {
    return this._isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client is already connected');
    }

    this._logger.info('Trying to connect to MongoDB...');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this._mongoose = await Mongoose.connect(uri);
        this._isConnected = true;
        this._logger.info('Database connection established');

        return;
      } catch (error) {
        attempt++;
        this._logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connectioon after ${RETRY_COUNT} attempts`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this._mongoose.disconnect?.();
    this._isConnected = false;
    this._logger.info('Database connection closed');
  }
}
