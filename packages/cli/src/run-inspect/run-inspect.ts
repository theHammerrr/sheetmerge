'use strict';

import type { MergeArgs } from '../cli-types';
import { readInputBuffers } from '../read-input-buffers';
import { resolveMergePlan } from '../resolve-merge-plan';

export type InspectResult = {
  filePath: string;
  sheetName: string;
  sheets: string[];
  headers: string[];
};

export type RunInspectDeps = {
  resolvePlan: (args: MergeArgs) => { spec: { sheet: { selector: { name?: string; index?: number } } } };
  readInputs: (paths: string[]) => Buffer[];
  inspectWorkbook: (
    buffer: Buffer,
    selector?: { name?: string; index?: number },
    headerRow?: number
  ) => { sheets: string[]; headers: string[]; sheetName: string };
  log: (message: string) => void;
};

const defaultDeps: RunInspectDeps = {
  resolvePlan: resolveMergePlan,
  readInputs: readInputBuffers,
  inspectWorkbook: (buffer, selector, headerRow) => {
    const { sheetmergeCore } = require('sheetmerge-core');

    return sheetmergeCore.inspectCore.inspectWorkbook(buffer, selector, headerRow);
  },
  log: (message) => console.log(message),
};

export function runInspect(args: MergeArgs, deps: RunInspectDeps = defaultDeps): InspectResult[] {
  const inputs = args.inputs ?? [];

  if (inputs.length === 0) {
    throw new Error('At least one input is required.');
  }

  const plan = deps.resolvePlan(args);
  const selector = plan.spec.sheet.selector;
  const buffers = deps.readInputs(inputs);

  const results = buffers.map((buffer, index) => {
    const info = deps.inspectWorkbook(buffer, selector, args.headerRow);

    return {
      filePath: inputs[index],
      sheetName: info.sheetName,
      sheets: info.sheets,
      headers: info.headers,
    };
  });

  for (const result of results) {
    deps.log(`${result.filePath}: ${result.sheetName}`);
    deps.log(`Sheets: ${result.sheets.join(', ')}`);
    deps.log(`Headers: ${result.headers.join(', ')}`);
  }

  return results;
}
