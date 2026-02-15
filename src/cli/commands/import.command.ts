import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { CommandName } from './enums/command-name.enum.js';
import { ICommand } from './interfaces/command.interface.js';
import chalk from 'chalk';

export class ImportCommand implements ICommand {
  public getName(): string {
    return CommandName.Import;
  }

  public execute(...params: string[]): void {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${chalk.cyan.underline(fileName)}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
