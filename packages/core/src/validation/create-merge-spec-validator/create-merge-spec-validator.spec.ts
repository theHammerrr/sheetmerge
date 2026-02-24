import { describe, it, expect } from 'vitest';
import { createMergeSpecValidator } from './create-merge-spec-validator';

describe('createMergeSpecValidator', () => {
  it('creates a validator function', () => {
    const validator = createMergeSpecValidator();
    expect(typeof validator).toBe('function');
  });
});
