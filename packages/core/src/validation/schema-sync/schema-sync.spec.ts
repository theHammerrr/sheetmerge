import { describe, expect, it } from 'vitest';
import { schemasAreSynced } from './schema-sync';

describe('schemasAreSynced', () => {
  it('keeps docs schema identical to core schema', () => {
    expect(schemasAreSynced()).toBe(true);
  });
});
