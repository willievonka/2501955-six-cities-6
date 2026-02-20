import chalk from 'chalk';
import got from 'got';
import { MockServerData } from '../../shared/types/index.js';
import { CommandName } from './enums/command-name.enum.js';
import { ICommand } from './interfaces/command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements ICommand {
  private _initialData!: MockServerData;

  public getName(): string {
    return CommandName.Generate;
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filePath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filePath, offerCount);
      console.info(chalk.green(`File ${filePath} was created`));
    } catch (error: unknown) {
      console.error(chalk.red('Can\'t generate data'));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private async load(url: string): Promise<void> {
    try {
      this._initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filePath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator: TSVOfferGenerator = new TSVOfferGenerator(this._initialData);
    const tsvFileWriter: TSVFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }
}
