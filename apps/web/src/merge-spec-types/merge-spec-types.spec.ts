import { describe, expect, it } from 'vitest';
import type { WebMergeSpec } from './merge-spec-types';

describe('merge spec types', () => {
  it('supports joinKeyMaps', () => {
    const spec: WebMergeSpec = {
      version: '1.0',
      inputs: [{ path: 'a.csv' }, { path: 'b.csv' }],
      sheet: { selector: { index: 0 }, headerRow: 1 },
      merge: { mode: 'join', joinKeyMaps: [{ key: '__join_1', byInput: { '0': 'id', '1': 'uid' } }] },
      output: { format: 'csv', fileName: 'merged.csv' },
    };

    expect(spec.merge.joinKeyMaps?.length).toBe(1);
  });
});
