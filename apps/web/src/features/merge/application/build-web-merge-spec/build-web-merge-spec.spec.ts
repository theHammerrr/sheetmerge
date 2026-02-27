import { describe, expect, it } from 'vitest';
import { buildWebMergeSpec } from './build-web-merge-spec';

describe('buildWebMergeSpec', () => {
  it('builds join spec with joinKeyMaps', () => {
    const files = [new File(['a'], 'a.csv'), new File(['b'], 'b.csv')];
    const spec = buildWebMergeSpec(
      files,
      {
        mode: 'join',
        keys: 'id',
        joinType: 'left',
        includeSource: true,
        headerRow: 1,
        dataStartRow: 2,
      },
      [{ id: 'g1', links: [{ fileIndex: 0, header: 'id' }, { fileIndex: 1, header: 'uid' }] }],
    );

    expect(spec.inputs).toHaveLength(2);
    expect(spec.merge.mode).toBe('join');
    expect(spec.merge.joinKeyMaps).toEqual([{ key: '__join_key_1', byInput: { '0': 'id', '1': 'uid' } }]);
  });

  it('omits keys when append mode is selected', () => {
    const files = [new File(['a'], 'a.csv'), new File(['b'], 'b.csv')];
    const spec = buildWebMergeSpec(
      files,
      {
        mode: 'append',
        keys: 'id',
        joinType: 'inner',
        includeSource: false,
        headerRow: 1,
        dataStartRow: 2,
      },
      [],
    );

    expect(spec.merge.keys).toBeUndefined();
    expect(spec.merge.joinType).toBeUndefined();
  });
});
