import { CommandName } from './enums/command-name.enum.js';
import { ICommand } from './interfaces/command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public getName(): string {
    return CommandName.Help;
  }

  public execute(): void {
    console.info(chalk.magenta('<---------------------------- CLI ---------------------------->'));
    console.info('Программа для подготовки данных для REST API сервера\n');
    console.info(chalk.cyan.underline('Пример:'));
    console.info(`  cli.js ${chalk.yellow('--<command>')} ${chalk.green('[--arguments]')}`);
    console.info(chalk.cyan.underline('Команды:'));
    console.info(`  ${chalk.yellow('--version:')}                     ${chalk.blue('# выводит номер версии')}`);
    console.info(`  ${chalk.yellow('--help:')}                        ${chalk.blue('# печатает этот текст')}`);
    console.info(`  ${chalk.yellow('--import <path>:')}               ${chalk.blue('# импортирует данные из TSV')}`);
    console.info(`  ${chalk.yellow('--generate <n> <path> <url>:')}   ${chalk.blue('# генерирует произвольное количество тестовых данных')}`);
    console.info(chalk.magenta('<------------------------------------------------------------->'));
  }
}
