import { describe, it, expect } from 'vitest';
import { collectInput } from './collect-input';

describe('collectInput', () => {
  it('appends input to list', () => {
    expect(collectInput('a', ['b'])).toEqual(['b', 'a']);
  });
});
