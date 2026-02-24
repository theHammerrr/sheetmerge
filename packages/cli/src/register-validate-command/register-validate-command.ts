'use strict';

import { Command } from 'commander';
import { buildMergeArgs } from '../build-merge-args';
import { collectInput } from '../collect-input';
import { parseNumber } from '../parse-number';
import { runValidate } from '../run-validate';

export function registerValidateCommand(program: Command): void {
  program
    .command('validate')
    .description('Check header compatibility across inputs')
    .option('-i, --input <path>', 'Input file path', collectInput, [])
    .option('--sheet-name <name>', 'Sheet name')
    .option('--sheet-index <index>', 'Sheet index (0-based)', parseNumber)
    .option('--header-row <index>', 'Header row (1-based)', parseNumber)
    .action((options) => {
      runValidate(buildMergeArgs(options));
    });
}
