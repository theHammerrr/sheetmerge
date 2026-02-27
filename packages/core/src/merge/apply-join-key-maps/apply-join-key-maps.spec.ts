import { describe, expect, it } from 'vitest';
import { MergeSpecError } from '../../errors/merge-spec-error';
import { applyJoinKeyMaps } from './apply-join-key-maps';

describe('applyJoinKeyMaps', () => {
  it('adds synthetic join keys for each input set', () => {
    const result = applyJoinKeyMaps(
      [[{ idA: 1 }], [{ idB: 1 }]],
      [{ key: '__join_1', byInput: { '0': 'idA', '1': 'idB' } }]
    );

    expect(result[0][0]).toEqual({ idA: 1, __join_1: 1 });
    expect(result[1][0]).toEqual({ idB: 1, __join_1: 1 });
  });

  it('throws when a join map is missing input header mapping', () => {
    expect(() =>
      applyJoinKeyMaps([[{ idA: 1 }], [{ idB: 1 }]], [{ key: '__join_1', byInput: { '0': 'idA' } }])
    ).toThrow(MergeSpecError);
  });
});
