import { describe, expect, it } from 'vitest';
import type { JoinGroup } from '../../join-mapping-types';
import { buildJoinKeyMaps } from './build-join-key-maps';

describe('buildJoinKeyMaps', () => {
  it('builds key maps for one-to-many connections', () => {
    const groups: JoinGroup[] = [
      {
        id: 'group-1',
        links: [
          { fileIndex: 0, header: 'id' },
          { fileIndex: 1, header: 'customer_id' },
          { fileIndex: 2, header: 'user_id' },
        ],
      },
    ];
    const result = buildJoinKeyMaps(groups, 3);

    expect(result).toEqual([
      { key: '__join_key_1', byFile: { 0: 'id', 1: 'customer_id', 2: 'user_id' } },
    ]);
  });

  it('builds key maps for many-to-many connections', () => {
    const groups: JoinGroup[] = [
      {
        id: 'group-1',
        links: [
          { fileIndex: 0, header: 'id' },
          { fileIndex: 1, header: 'customer_id' },
          { fileIndex: 2, header: 'user_id' },
        ],
      },
      {
        id: 'group-2',
        links: [
          { fileIndex: 0, header: 'email' },
          { fileIndex: 1, header: 'customer_email' },
          { fileIndex: 2, header: 'user_email' },
        ],
      },
    ];
    const result = buildJoinKeyMaps(groups, 3);

    expect(result).toEqual([
      { key: '__join_key_1', byFile: { 0: 'id', 1: 'customer_id', 2: 'user_id' } },
      { key: '__join_key_2', byFile: { 0: 'email', 1: 'customer_email', 2: 'user_email' } },
    ]);
  });
});
