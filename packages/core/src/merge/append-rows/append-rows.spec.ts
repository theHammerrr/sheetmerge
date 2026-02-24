import { describe, it, expect } from 'vitest';
import { appendRows } from './append-rows';

describe('appendRows', () => {
  it('flattens row sets', () => {
    const result = appendRows([[{ id: 1 }], [{ id: 2 }]]);

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
