'use strict';

import type { MergeArgs, MergeReport, MergeResult, MergeSpec } from '../cli-types';
import { formatReport } from '../format-report';
import { readInputBuffers } from '../read-input-buffers';
import { resolveMergePlan } from '../resolve-merge-plan';
import { writeOutputFile } from '../write-output-file';

export type MergePlan = { spec: MergeSpec; outputPath: string };

export type RunMergeDeps = {
  resolvePlan: (args: MergeArgs) => MergePlan;
  readInputs: (paths: string[]) => Buffer[];
  writeOutput: (buffer: Buffer, outputPath: string) => void;
  mergeWorkbooks: (buffers: Buffer[], spec: MergeSpec) => MergeResult;
  format: (report: MergeReport) => string;
  log: (message: string) => void;
};

const defaultDeps: RunMergeDeps = {
  resolvePlan: resolveMergePlan,
  readInputs: readInputBuffers,
  writeOutput: writeOutputFile,
  mergeWorkbooks: (buffers, spec) => {
    const { sheetmergeCore } = require('sheetmerge-core');

    return sheetmergeCore.mergeWorkbooks(buffers, spec);
  },
  format: formatReport,
  log: (message) => console.log(message),
};

export function runMerge(args: MergeArgs, deps: RunMergeDeps = defaultDeps): MergeReport {
  const plan = deps.resolvePlan(args);
  const inputPaths = plan.spec.inputs.map((input) => input.path);
  const buffers = deps.readInputs(inputPaths);
  const result = deps.mergeWorkbooks(buffers, plan.spec);

  deps.writeOutput(result.buffer, plan.outputPath);
  deps.log(deps.format(result.report));

  return result.report;
}
