import { describe, it, expect } from 'vitest';
import { resolveCliJoinType } from './resolve-cli-join-type';

describe('resolveCliJoinType', () => {
  it('returns undefined for invalid values', () => {
    expect(resolveCliJoinType('bad')).toBeUndefined();
  });
});
