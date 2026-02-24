import { describe, it, expect } from 'vitest';
import { buildKey } from './build-key';

describe('buildKey', () => {
  it('builds a composite key', () => {
    const row = { id: 1, name: 'alpha' };
    const result = buildKey(row, ['id', 'name']);

    expect(result).toBe('1|alpha');
  });
});
