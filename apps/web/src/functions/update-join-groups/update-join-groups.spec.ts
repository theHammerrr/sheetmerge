import { describe, expect, it } from 'vitest';
import type { JoinGroup } from '../../join-mapping-types';
import { updateJoinGroups } from './update-join-groups';

describe('updateJoinGroups', () => {
  it('moves an existing link into the active group', () => {
    const groups: JoinGroup[] = [
      {
        id: 'base',
        links: [
          { fileIndex: 0, header: 'id' },
          { fileIndex: 1, header: 'id' },
        ],
      },
      {
        id: 'other',
        links: [
          { fileIndex: 2, header: 'id' },
          { fileIndex: 3, header: 'id' },
        ],
      },
    ];

    const result = updateJoinGroups(groups, { fileIndex: 0, header: 'id' }, { fileIndex: 2, header: 'id' });

    expect(result).toEqual([
      {
        id: 'base',
        links: [
          { fileIndex: 0, header: 'id' },
          { fileIndex: 1, header: 'id' },
          { fileIndex: 2, header: 'id' },
        ],
      },
    ]);
  });

  it('keeps the same group when selecting a link already in that group', () => {
    const groups: JoinGroup[] = [
      {
        id: 'base',
        links: [
          { fileIndex: 0, header: 'id' },
          { fileIndex: 1, header: 'id' },
        ],
      },
    ];

    const result = updateJoinGroups(groups, { fileIndex: 0, header: 'id' }, { fileIndex: 1, header: 'id' });

    expect(result).toEqual(groups);
  });
});
