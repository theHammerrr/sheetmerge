'use strict';

import path from 'path';
import type { MergeArgs, MergeSpec, MergeMode, OutputFormat } from '../cli-types';

function ensureNumber(value: number | undefined, label: string): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (Number.isNaN(value)) {
    throw new Error(`${label} must be a number.`);
  }

  return value;
}

function buildSelector(args: MergeArgs) {
  if (args.sheetName && args.sheetIndex !== undefined) {
    throw new Error('Provide either sheetName or sheetIndex, not both.');
  }

  if (args.sheetName) {
    return { name: args.sheetName };
  }

  if (args.sheetIndex !== undefined) {
    return { index: args.sheetIndex };
  }

  return { index: 0 };
}

function resolveMode(mode?: MergeMode): MergeMode {
  return mode ?? 'append';
}

function resolveFormat(format?: OutputFormat): OutputFormat {
  return format ?? 'xlsx';
}

function ensureKeys(mode: MergeMode, keys?: string[]): string[] | undefined {
  if (mode === 'append') {
    return undefined;
  }

  if (!keys || keys.length === 0) {
    throw new Error('Keys are required for union/join modes.');
  }

  return keys;
}

export function buildMergeSpec(args: MergeArgs): MergeSpec {
  if (!args.inputs || args.inputs.length < 2) {
    throw new Error('At least two inputs are required.');
  }

  if (!args.output) {
    throw new Error('Output path is required.');
  }

  const headerRow = ensureNumber(args.headerRow, 'headerRow');
  const dataStartRow = ensureNumber(args.dataStartRow, 'dataStartRow');

  const fileName = path.basename(args.output);
  const selector = buildSelector(args);
  const mode = resolveMode(args.mode);
  const format = resolveFormat(args.format);
  const keys = ensureKeys(mode, args.keys);

  return {
    version: '1.0',
    inputs: args.inputs.map((input) => ({ path: input })),
    sheet: {
      selector,
      headerRow,
      dataStartRow,
    },
    merge: {
      mode,
      keys,
      joinType: args.joinType,
    },
    output: {
      format,
      fileName,
      includeSource: args.includeSource ?? false,
    },
  };
}
