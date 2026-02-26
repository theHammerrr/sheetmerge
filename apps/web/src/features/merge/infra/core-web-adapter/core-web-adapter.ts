import { validateCompatibility } from 'sheetmerge-core/inspect/validate-compatibility';
import { mergeRows } from 'sheetmerge-core/merge/merge-rows';
import type { MergeConfig, Row } from 'sheetmerge-core/merge/merge-types';

type CompatibilityResult = ReturnType<typeof validateCompatibility>;

type CoreWebAdapter = {
  mergeRows: (rowSets: Row[][], merge: MergeConfig) => Row[];
  validateCompatibility: (headers: string[][]) => CompatibilityResult;
};

export type CoreMergeConfig = MergeConfig;
export type CoreRow = Row;

export const coreWebAdapter: CoreWebAdapter = {
  mergeRows,
  validateCompatibility,
};
