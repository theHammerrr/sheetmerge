'use strict';

import type { MergeConfig, OutputConfig } from '../merge-types';

type MergeReport = {
  mode: MergeConfig['mode'];
  inputs: Array<{ index: number; id?: string; label?: string; rowCount: number }>;
  output: { rowCount: number; format: OutputConfig['format']; sheetName?: string; fileName?: string };
  warnings: string[];
};

type MergeResult = {
  buffer: Buffer;
  report: MergeReport;
};

export type { MergeReport, MergeResult };
