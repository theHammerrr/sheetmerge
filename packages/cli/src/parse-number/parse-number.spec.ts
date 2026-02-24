import { describe, it, expect } from 'vitest';
import { parseNumber } from './parse-number';

describe('parseNumber', () => {
  it('parses numeric input', () => {
    expect(parseNumber('3')).toBe(3);
  });
});
