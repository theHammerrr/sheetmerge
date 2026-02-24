import { describe, it, expect } from 'vitest';
import { joinRows } from './join-rows';

describe('joinRows', () => {
  it('joins rows by key', () => {
    const result = joinRows(
      [[{ id: 1, left: 'x' }], [{ id: 1, right: 'y' }]],
      ['id'],
      'inner'
    );

    expect(result).toEqual([{ id: 1, left: 'x', right: 'y' }]);
  });
});
