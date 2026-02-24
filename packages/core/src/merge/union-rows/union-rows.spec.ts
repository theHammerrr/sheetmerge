import { describe, it, expect } from 'vitest';
import { unionRows } from './union-rows';

describe('unionRows', () => {
  it('dedupes by key', () => {
    const result = unionRows(
      [[{ id: 1, name: 'a' }], [{ id: 1, name: 'b' }, { id: 2 }]],
      ['id']
    );

    expect(result).toEqual([{ id: 1, name: 'a' }, { id: 2 }]);
  });
});
