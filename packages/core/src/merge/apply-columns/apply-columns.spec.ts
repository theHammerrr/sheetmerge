import { describe, it, expect } from 'vitest';
import { applyColumns } from './apply-columns';

describe('applyColumns', () => {
  it('filters and renames columns', () => {
    const rows = [{ a: 1, b: 2, c: 3 }];
    const result = applyColumns(rows, {
      include: ['a', 'b'],
      rename: { b: 'beta' },
    });

    expect(result).toEqual([{ a: 1, beta: 2 }]);
  });

  it('returns original rows when config is missing', () => {
    const rows = [{ a: 1 }];
    const result = applyColumns(rows);

    expect(result).toBe(rows);
  });
});
