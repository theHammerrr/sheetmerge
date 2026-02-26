import type { MergeConfig } from '../../merge-types';

export function createDefaultMergeConfig(): MergeConfig {
  return {
    mode: 'join',
    keys: '',
    joinType: 'inner',
    includeSource: false,
    headerRow: 1,
    dataStartRow: 2,
  };
}
