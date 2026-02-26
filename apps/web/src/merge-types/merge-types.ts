export type MergeConfig = {
  mode: 'append' | 'union' | 'join';
  keys: string;
  joinType: 'inner' | 'left' | 'right' | 'full';
  includeSource: boolean;
  headerRow: number;
  dataStartRow: number;
};

export type MergeReport = {
  rowCount: number;
  warnings: string[];
};
