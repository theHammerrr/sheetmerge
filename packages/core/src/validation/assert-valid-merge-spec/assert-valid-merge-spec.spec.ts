import { describe, it, expect } from 'vitest';
import { assertValidMergeSpec } from './assert-valid-merge-spec';
import { MergeSpecError } from '../../errors/merge-spec-error';

describe('assertValidMergeSpec', () => {
  it('throws MergeSpecError for invalid spec', () => {
    expect(() => assertValidMergeSpec({ version: '1.0' })).toThrow(MergeSpecError);
  });
});
