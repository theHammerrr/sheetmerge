import { describe, it, expect } from 'vitest';
import { buildRows } from './build-rows';

describe('buildRows', () => {
  it('builds rows and headers', () => {
    const rawRows = [
      ['id', 'name'],
      [1, 'alpha'],
      [2, 'beta'],
    ];
    const result = buildRows(rawRows, 1, 2, false, 'source');

    expect(result.headers).toEqual(['id', 'name']);
    expect(result.rows.length).toBe(2);
  });
});
