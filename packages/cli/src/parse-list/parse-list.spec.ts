import { describe, it, expect } from 'vitest';
import { parseList } from './parse-list';

describe('parseList', () => {
  it('splits comma-separated values', () => {
    expect(parseList('a, b, c')).toEqual(['a', 'b', 'c']);
  });
});
