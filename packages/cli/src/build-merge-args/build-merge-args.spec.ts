import { describe, it, expect } from 'vitest';
import { buildMergeArgs } from './build-merge-args';

describe('buildMergeArgs', () => {
  it('maps cli options to args', () => {
    const result = buildMergeArgs({ input: ['a.xlsx'], output: 'out.xlsx', mode: 'append' });

    expect(result.inputs).toEqual(['a.xlsx']);
    expect(result.output).toBe('out.xlsx');
  });
});
