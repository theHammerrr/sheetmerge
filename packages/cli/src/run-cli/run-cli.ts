'use strict';

import { Command } from 'commander';
import { registerInspectCommand } from '../register-inspect-command';
import { registerMergeCommand } from '../register-merge-command';
import { registerValidateCommand } from '../register-validate-command';

export function runCli(argv: string[]): void {
  const program = new Command();

  program.name('sheetmerge').description('Merge spreadsheet files').version('0.0.0');

  registerMergeCommand(program);
  registerInspectCommand(program);
  registerValidateCommand(program);

  program.parse(argv);
}
