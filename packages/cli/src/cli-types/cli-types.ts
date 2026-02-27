'use strict';

export type MergeMode = 'append' | 'union' | 'join';
export type MergeJoinType = 'inner' | 'left' | 'right' | 'full';
export type OutputFormat = 'xlsx' | 'csv';

export type MergeArgs = {
  inputs: string[];
  output?: string;
  sheetName?: string;
  sheetIndex?: number;
  headerRow?: number;
  dataStartRow?: number;
  mode?: MergeMode;
  keys?: string[];
  joinType?: MergeJoinType;
  format?: OutputFormat;
  includeSource?: boolean;
  includeSourceProvided?: boolean;
  configPath?: string;
};

export type MergeSpec = {
  version: '1.0';
  inputs: Array<{ path: string; id?: string; label?: string }>;
  sheet: {
    selector: { name?: string; index?: number };
    headerRow?: number;
    dataStartRow?: number;
  };
  merge: {
    mode: MergeMode;
    keys?: string[];
    joinKeyMaps?: Array<{ key: string; byInput: Record<string, string> }>;
    joinType?: MergeJoinType;
  };
  output: {
    format: OutputFormat;
    fileName?: string;
    sheetName?: string;
    includeSource?: boolean;
  };
};

type MergeReport = {
  mode: MergeMode;
  inputs: Array<{ index: number; id?: string; label?: string; rowCount: number }>;
  output: { rowCount: number; format: OutputFormat; sheetName?: string; fileName?: string };
  warnings: string[];
};

type MergeResult = {
  buffer: Buffer;
  report: MergeReport;
};

export type { MergeReport, MergeResult };
