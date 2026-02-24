'use strict';

import type { MergeArgs } from '../cli-types';
import { readInputBuffers } from '../read-input-buffers';
import { resolveMergePlan } from '../resolve-merge-plan';

export type ValidateResult = {
  compatible: boolean;
  mismatches: Array<{ index: number; headers: string[] }>;
};

export type RunValidateDeps = {
  resolvePlan: (args: MergeArgs) => { spec: { sheet: { selector: { name?: string; index?: number } } } };
  readInputs: (paths: string[]) => Buffer[];
  readHeaders: (
    buffer: Buffer,
    selector?: { name?: string; index?: number },
    headerRow?: number
  ) => { headers: string[] };
  validateCompatibility: (headerSets: Array<string[]>) => ValidateResult;
  log: (message: string) => void;
};

const defaultDeps: RunValidateDeps = {
  resolvePlan: resolveMergePlan,
  readInputs: readInputBuffers,
  readHeaders: (buffer, selector, headerRow) => {
    const { sheetmergeCore } = require('sheetmerge-core');

    return sheetmergeCore.inspectCore.readHeaders(buffer, selector, headerRow);
  },
  validateCompatibility: (headerSets) => {
    const { sheetmergeCore } = require('sheetmerge-core');

    return sheetmergeCore.inspectCore.validateCompatibility(headerSets);
  },
  log: (message) => console.log(message),
};

export function runValidate(args: MergeArgs, deps: RunValidateDeps = defaultDeps): ValidateResult {
  const inputs = args.inputs ?? [];

  if (inputs.length === 0) {
    throw new Error('At least one input is required.');
  }

  const plan = deps.resolvePlan(args);
  const selector = plan.spec.sheet.selector;
  const buffers = deps.readInputs(inputs);
  const headerSets = buffers.map((buffer) =>
    deps.readHeaders(buffer, selector, args.headerRow).headers
  );
  const result = deps.validateCompatibility(headerSets);

  if (result.compatible) {
    deps.log('Inputs are compatible.');
  } else {
    deps.log('Inputs are not compatible.');

    for (const mismatch of result.mismatches) {
      deps.log(`Input ${mismatch.index + 1} headers: ${mismatch.headers.join(', ')}`);
    }
  }

  return result;
}
