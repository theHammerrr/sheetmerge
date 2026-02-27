export type WebMergeSpec = {
  version: '1.0';
  inputs: Array<{ path: string; id?: string; label?: string }>;
  sheet: {
    selector: { name?: string; index?: number };
    headerRow?: number;
    dataStartRow?: number;
  };
  merge: {
    mode: 'append' | 'union' | 'join';
    keys?: string[];
    joinKeyMaps?: Array<{ key: string; byInput: Record<string, string> }>;
    joinType?: 'inner' | 'left' | 'right' | 'full';
  };
  output: {
    format: 'xlsx' | 'csv';
    fileName?: string;
    includeSource?: boolean;
  };
};
