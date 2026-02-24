import { describe, it, expect } from 'vitest';
import { resolveCliMode } from './resolve-cli-mode';

describe('resolveCliMode', () => {
  it('returns undefined for invalid values', () => {
    expect(resolveCliMode('bad')).toBeUndefined();
  });
});
