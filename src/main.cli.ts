#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap(): void {
  const cliApplication: CLIApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
