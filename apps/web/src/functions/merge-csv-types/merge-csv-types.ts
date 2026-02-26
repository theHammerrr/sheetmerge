export type ParsedCsv = {
  name: string;
  headers: string[];
  rows: Array<Record<string, string>>;
};

export type MergeOptions = {
  mode: 'append' | 'union' | 'join';
  keys: string[];
  joinType: 'inner' | 'left' | 'right' | 'full';
  includeSource: boolean;
};

export type MergeOutput = {
  csv: string;
  rowCount: number;
  warnings: string[];
};
