import { describe, expect, it } from 'vitest';
import type { WebMergeSpec } from '../../../../merge-spec-types';
import { applyWebMergeSpec } from './apply-web-merge-spec';

describe('applyWebMergeSpec', () => {
  it('maps joinKeyMaps to join groups and config', () => {
    const spec: WebMergeSpec = {
      version: '1.0',
      inputs: [{ path: 'a.csv', id: '0' }, { path: 'b.csv', id: '1' }],
      sheet: { selector: { index: 0 }, headerRow: 3, dataStartRow: 4 },
      merge: {
        mode: 'join',
        keys: ['id'],
        joinType: 'full',
        joinKeyMaps: [{ key: '__join_key_1', byInput: { '0': 'user_id', '1': 'id' } }],
      },
      output: { format: 'csv', includeSource: true },
    };
    const result = applyWebMergeSpec(spec);

    expect(result.config.mode).toBe('join');
    expect(result.config.keys).toBe('id');
    expect(result.config.joinType).toBe('full');
    expect(result.groups).toEqual([
      { id: 'imported-group-1', links: [{ fileIndex: 0, header: 'user_id' }, { fileIndex: 1, header: 'id' }] },
    ]);
  });

  it('drops invalid join mapping entries', () => {
    const spec: WebMergeSpec = {
      version: '1.0',
      inputs: [{ path: 'a.csv', id: 'A' }, { path: 'b.csv', id: 'B' }],
      sheet: { selector: { index: 0 } },
      merge: { mode: 'append', joinKeyMaps: [{ key: '__join_key_1', byInput: { A: 'id', X: 'id' } }] },
      output: { format: 'csv' },
    };
    const result = applyWebMergeSpec(spec);

    expect(result.groups).toEqual([]);
    expect(result.config.headerRow).toBe(1);
    expect(result.config.dataStartRow).toBe(2);
  });
});
