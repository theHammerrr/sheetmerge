'use strict';

import { Command } from 'commander';
import { buildMergeArgs } from '../build-merge-args';
import { collectInput } from '../collect-input';
import { parseNumber } from '../parse-number';
import { runInspect } from '../run-inspect';

export function registerInspectCommand(program: Command): void {
  program
    .command('inspect')
    .description('Print sheet names and headers for each input')
    .option('-i, --input <path>', 'Input file path', collectInput, [])
    .option('--sheet-name <name>', 'Sheet name')
    .option('--sheet-index <index>', 'Sheet index (0-based)', parseNumber)
    .option('--header-row <index>', 'Header row (1-based)', parseNumber)
    .action((options) => {
      runInspect(buildMergeArgs(options));
    });
}
