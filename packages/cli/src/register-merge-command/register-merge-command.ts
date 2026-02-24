'use strict';

import { Command } from 'commander';
import { buildMergeArgs } from '../build-merge-args';
import { collectInput } from '../collect-input';
import { parseList } from '../parse-list';
import { parseNumber } from '../parse-number';
import { runMerge } from '../run-merge';

export function registerMergeCommand(program: Command): void {
  program
    .command('merge')
    .description('Merge input files')
    .option('-i, --input <path>', 'Input file path', collectInput, [])
    .option('-o, --output <path>', 'Output file path')
    .option('-c, --config <path>', 'Path to sheetmerge.config.json')
    .option('--sheet-name <name>', 'Sheet name')
    .option('--sheet-index <index>', 'Sheet index (0-based)', parseNumber)
    .option('--header-row <index>', 'Header row (1-based)', parseNumber)
    .option('--data-start-row <index>', 'Data start row (1-based)', parseNumber)
    .option('--mode <mode>', 'append|union|join')
    .option('--keys <keys>', 'Comma-separated key columns', parseList)
    .option('--join-type <type>', 'inner|left|right|full')
    .option('--format <format>', 'xlsx|csv')
    .option('--include-source', 'Include source column')
    .action((options) => {
      runMerge(buildMergeArgs(options));
    });
}
