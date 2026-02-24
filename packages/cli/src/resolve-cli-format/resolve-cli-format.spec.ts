import { describe, it, expect } from 'vitest';
import { resolveCliFormat } from './resolve-cli-format';

describe('resolveCliFormat', () => {
  it('returns undefined for invalid values', () => {
    expect(resolveCliFormat('bad')).toBeUndefined();
  });
});
