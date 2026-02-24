import { describe, it, expect } from 'vitest';
import { validateInputs } from './validate-inputs';
import { MergeSpecError } from '../../errors/merge-spec-error';

describe('validateInputs', () => {
  it('accepts buffers', () => {
    const buffer = Buffer.from('data');
    expect(() => validateInputs([buffer])).not.toThrow();
  });

  it('accepts Uint8Array', () => {
    const bytes = new Uint8Array([1, 2, 3]);
    expect(() => validateInputs([bytes])).not.toThrow();
  });

  it('rejects empty array', () => {
    expect(() => validateInputs([])).toThrow(MergeSpecError);
  });

  it('rejects invalid input types', () => {
    expect(() => validateInputs(['nope'])).toThrow(MergeSpecError);
  });
});
