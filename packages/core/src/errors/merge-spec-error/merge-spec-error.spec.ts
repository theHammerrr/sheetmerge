import { describe, it, expect } from 'vitest';
import { MergeSpecError } from './merge-spec-error';

describe('MergeSpecError', () => {
  it('stores details when provided', () => {
    const error = new MergeSpecError('fail', ['detail']);
    expect(error.details).toEqual(['detail']);
  });

  it('defaults details to null', () => {
    const error = new MergeSpecError('fail');
    expect(error.details).toBeNull();
  });
});
