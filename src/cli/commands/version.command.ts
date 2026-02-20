import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CommandName } from './enums/command-name.enum.js';
import { ICommand } from './interfaces/command.interface.js';
import { isPackageJSONConfig } from './utils/is-package-json-config.util.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class VersionCommand implements ICommand {
  constructor (
    private readonly _filePath: string = './package.json'
  ) {}

  public getName(): string {
    return CommandName.Version;
  }

  public execute(): void {
    try {
      const version: string = this.readVersion();
      console.info(chalk.green(`Version: ${version}`));
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from: ${chalk.cyan.underline(this._filePath)}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private readVersion(): string {
    const jsonContent: string = readFileSync(resolve(this._filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error ('Failed to parse json content');
    }

    return importedContent.version;
  }
}
