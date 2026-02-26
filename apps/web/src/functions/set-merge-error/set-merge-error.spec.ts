import { describe, expect, it, vi } from 'vitest';
import { setMergeError } from './set-merge-error';

describe('setMergeError', () => {
  it('uses translated message when key exists', () => {
    const setError = vi.fn();
    const t = (key: string) => (key === 'errors.noFiles' ? 'Please add at least two files.' : key);

    setMergeError(t, new Error('errors.noFiles'), setError);

    expect(setError).toHaveBeenCalledWith('Please add at least two files.');
  });

  it('falls back to unknown when message is not a translation key', () => {
    const setError = vi.fn();
    const t = (key: string) => (key === 'errors.unknown' ? 'Unable to merge files.' : key);

    setMergeError(t, new Error('raw boom'), setError);

    expect(setError).toHaveBeenCalledWith('Unable to merge files.');
  });
});
