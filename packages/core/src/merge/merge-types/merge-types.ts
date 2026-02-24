'use strict';

export type Row = Record<string, unknown>;

export type InputSpec = {
  id?: string;
  label?: string;
};

export type SheetSelector = {
  selector: { name?: string; index?: number };
  headerRow?: number;
  dataStartRow?: number;
};

export type ColumnsConfig = {
  include?: string[];
  exclude?: string[];
  rename?: Record<string, string>;
};

export type MergeConfig = {
  mode: 'append' | 'union' | 'join';
  keys?: string[];
  joinType?: 'inner' | 'left' | 'right' | 'full';
  columns?: ColumnsConfig;
};

export type OutputConfig = {
  format: 'xlsx' | 'csv';
  sheetName?: string;
  fileName?: string;
  includeSource?: boolean;
};

export type MergeSpec = {
  inputs: InputSpec[];
  sheet: SheetSelector;
  merge: MergeConfig;
  output: OutputConfig;
};

export type ReadSpec = {
  sheet: SheetSelector;
  output: OutputConfig;
};
