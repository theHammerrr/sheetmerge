'use strict';

import type { MergeArgs } from '../cli-types';
import { resolveCliFormat } from '../resolve-cli-format';
import { resolveCliJoinType } from '../resolve-cli-join-type';
import { resolveCliMode } from '../resolve-cli-mode';

type Options = Record<string, unknown>;

export function buildMergeArgs(options: Options): MergeArgs {
  return {
    inputs: Array.isArray(options.input) ? options.input : [],
    output: typeof options.output === 'string' ? options.output : undefined,
    configPath: typeof options.config === 'string' ? options.config : undefined,
    sheetName: typeof options.sheetName === 'string' ? options.sheetName : undefined,
    sheetIndex: typeof options.sheetIndex === 'number' ? options.sheetIndex : undefined,
    headerRow: typeof options.headerRow === 'number' ? options.headerRow : undefined,
    dataStartRow: typeof options.dataStartRow === 'number' ? options.dataStartRow : undefined,
    mode: resolveCliMode(options.mode),
    keys: Array.isArray(options.keys) ? options.keys : undefined,
    joinType: resolveCliJoinType(options.joinType),
    format: resolveCliFormat(options.format),
    includeSource: Boolean(options.includeSource),
    includeSourceProvided: options.includeSource !== undefined,
  };
}
