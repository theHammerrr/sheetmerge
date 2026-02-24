import { describe, it, expect } from 'vitest';
import { mergeSpecValidation } from './merge-spec-validation';

describe('mergeSpecValidation', () => {
  it('exposes validation helpers', () => {
    expect(typeof mergeSpecValidation.validateMergeSpec).toBe('function');
    expect(typeof mergeSpecValidation.assertValidMergeSpec).toBe('function');
  });
});
