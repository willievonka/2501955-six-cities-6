import chalk from 'chalk';
import got from 'got';
import { MockServerData } from '../../shared/types/index.js';
import { CommandName } from './enums/command-name.enum.js';
import { ICommand } from './interfaces/command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { appendFile } from 'node:fs/promises';

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

      if (error instanceof Error) {
        console.error(chalk.red(`Details: ${error.message}`));
      }
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
    for (let i = 0; i < offerCount; i++) {
      await appendFile(
        filePath,
        `${tsvOfferGenerator.generate()}\n`,
        'utf-8'
      );
    }
  }
}
