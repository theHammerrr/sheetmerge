'use strict';

import { Command } from 'commander';
import type { MergeArgs } from '../cli-types';
import { runMerge } from '../run-merge';

function parseList(value: string): string[] {
  return value.split(',').map((item) => item.trim()).filter((item) => item.length > 0);
}

function toNumber(value: string): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error('Value must be a number.');
  }

  return parsed;
}

function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

export function runCli(argv: string[]): void {
  const program = new Command();

  program.name('sheetmerge').description('Merge spreadsheet files').version('0.0.0');

  program
    .command('merge')
    .description('Merge input files')
    .option('-i, --input <path>', 'Input file path', collect, [])
    .option('-o, --output <path>', 'Output file path')
    .option('-c, --config <path>', 'Path to sheetmerge.config.json')
    .option('--sheet-name <name>', 'Sheet name')
    .option('--sheet-index <index>', 'Sheet index (0-based)', toNumber)
    .option('--header-row <index>', 'Header row (1-based)', toNumber)
    .option('--data-start-row <index>', 'Data start row (1-based)', toNumber)
    .option('--mode <mode>', 'append|union|join')
    .option('--keys <keys>', 'Comma-separated key columns', parseList)
    .option('--join-type <type>', 'inner|left|right|full')
    .option('--format <format>', 'xlsx|csv')
    .option('--include-source', 'Include source column')
    .action((options) => {
      const args: MergeArgs = {
        inputs: options.input,
        output: options.output,
        configPath: options.config,
        sheetName: options.sheetName,
        sheetIndex: options.sheetIndex,
        headerRow: options.headerRow,
        dataStartRow: options.dataStartRow,
        mode: options.mode,
        keys: options.keys,
        joinType: options.joinType,
        format: options.format,
        includeSource: options.includeSource,
        includeSourceProvided: options.includeSource !== undefined,
      };

      runMerge(args);
    });

  program.parse(argv);
}
