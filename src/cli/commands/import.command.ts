import { getErrorMessage } from '../../shared/helpers/common.helper.js';
import { createOffer } from '../../shared/helpers/offer.helper.js';
import { FileReaderEventType, TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { CommandName } from './enums/command-name.enum.js';
import { ICommand } from './interfaces/command.interface.js';
import chalk from 'chalk';

export class ImportCommand implements ICommand {
  public getName(): string {
    return CommandName.Import;
  }

  public async execute(...params: string[]): Promise<void> {
    const [fileName] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    fileReader.on(FileReaderEventType.Line, this.onImportedLine);
    fileReader.on(FileReaderEventType.End, this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(chalk.red(`Can't import data from file: ${chalk.cyan.underline(fileName)}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private onImportedLine(line: string): void {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number): void {
    console.info(chalk.green(`${count} rows imported`));
  }
}
