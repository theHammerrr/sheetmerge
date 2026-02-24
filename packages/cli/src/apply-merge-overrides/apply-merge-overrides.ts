'use strict';

import path from 'path';
import type { MergeArgs, MergeSpec } from '../cli-types';

function resolveSelector(spec: MergeSpec, args: MergeArgs) {
  if (args.sheetName && args.sheetIndex !== undefined) {
    throw new Error('Provide either sheetName or sheetIndex, not both.');
  }

  if (args.sheetName) {
    return { name: args.sheetName };
  }

  if (args.sheetIndex !== undefined) {
    return { index: args.sheetIndex };
  }

  return spec.sheet.selector;
}

function resolveIncludeSource(spec: MergeSpec, args: MergeArgs): boolean | undefined {
  if (args.includeSourceProvided) {
    return Boolean(args.includeSource);
  }

  return spec.output.includeSource;
}

export function applyMergeOverrides(spec: MergeSpec, args: MergeArgs): MergeSpec {
  const selector = resolveSelector(spec, args);
  const headerRow = args.headerRow ?? spec.sheet.headerRow;
  const dataStartRow = args.dataStartRow ?? spec.sheet.dataStartRow;

  const inputs = args.inputs.length > 0
    ? args.inputs.map((input) => ({ path: input }))
    : spec.inputs;

  const outputFileName = args.output ? path.basename(args.output) : spec.output.fileName;

  return {
    ...spec,
    inputs,
    sheet: {
      ...spec.sheet,
      selector,
      headerRow,
      dataStartRow,
    },
    merge: {
      ...spec.merge,
      mode: args.mode ?? spec.merge.mode,
      keys: args.keys ?? spec.merge.keys,
      joinType: args.joinType ?? spec.merge.joinType,
    },
    output: {
      ...spec.output,
      format: args.format ?? spec.output.format,
      fileName: outputFileName,
      includeSource: resolveIncludeSource(spec, args),
    },
  };
}
