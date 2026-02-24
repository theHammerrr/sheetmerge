'use strict';

import path from 'path';
import type { MergeArgs, MergeSpec } from '../cli-types';
import { applyMergeOverrides } from '../apply-merge-overrides';
import { buildMergeSpec } from '../build-merge-spec';
import { loadMergeConfig } from '../load-merge-config';
import { resolveConfigPath } from '../resolve-config-path';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isMergeSpec(value: unknown): value is MergeSpec {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.inputs)) {
    return false;
  }

  if (!isRecord(value.sheet)) {
    return false;
  }

  if (!isRecord(value.merge)) {
    return false;
  }

  if (!isRecord(value.output)) {
    return false;
  }

  return true;
}

function ensureMergeSpec(value: unknown): MergeSpec {
  if (!isMergeSpec(value)) {
    throw new Error('Config must match MergeSpec shape.');
  }

  return value;
}

function resolveOutputPath(args: MergeArgs, spec: MergeSpec): string {
  if (args.output) {
    return path.resolve(args.output);
  }

  if (spec.output.fileName) {
    return path.resolve(spec.output.fileName);
  }

  throw new Error('Output path is required.');
}

export type MergePlan = { spec: MergeSpec; outputPath: string };

export function resolveMergePlan(args: MergeArgs, baseDir?: string): MergePlan {
  const configPath = resolveConfigPath(args.configPath, baseDir);

  if (!configPath) {
    const spec = buildMergeSpec(args);

    return { spec, outputPath: resolveOutputPath(args, spec) };
  }

  const rawConfig = loadMergeConfig(configPath);
  const { sheetmergeCore } = require('sheetmerge-core');

  sheetmergeCore.mergeSpecValidation.assertValidMergeSpec(rawConfig);

  const baseSpec = ensureMergeSpec(rawConfig);
  const mergedSpec = applyMergeOverrides(baseSpec, args);

  sheetmergeCore.mergeSpecValidation.assertValidMergeSpec(mergedSpec);

  return { spec: mergedSpec, outputPath: resolveOutputPath(args, mergedSpec) };
}
