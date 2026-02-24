import { describe, it, expect } from 'vitest';
import { loadMergeSpecSchema } from './load-merge-spec-schema';

describe('loadMergeSpecSchema', () => {
  it('loads a schema object with $id', () => {
    const schema = loadMergeSpecSchema();
    expect(schema).toHaveProperty('$id');
  });
});
