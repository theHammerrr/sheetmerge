import { describe, it, expect } from 'vitest';
import { mergeRows } from './merge-rows';

describe('mergeRows', () => {
  it('appends rows', () => {
    const result = mergeRows([[{ id: 1 }], [{ id: 2 }]], { mode: 'append' });

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('unions rows by key', () => {
    const result = mergeRows(
      [[{ id: 1, name: 'a' }], [{ id: 1, name: 'b' }, { id: 2 }]],
      { mode: 'union', keys: ['id'] }
    );

    expect(result).toEqual([{ id: 1, name: 'a' }, { id: 2 }]);
  });

  it('joins rows by key', () => {
    const result = mergeRows(
      [[{ id: 1, left: 'x' }], [{ id: 1, right: 'y' }]],
      { mode: 'join', keys: ['id'], joinType: 'inner' }
    );

    expect(result).toEqual([{ id: 1, left: 'x', right: 'y' }]);
  });
});
