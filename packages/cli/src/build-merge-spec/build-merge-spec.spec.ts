import { describe, it, expect } from 'vitest';
import { buildMergeSpec } from './build-merge-spec';

const baseArgs = {
  inputs: ['a.xlsx', 'b.xlsx'],
  output: 'out.xlsx',
  mode: 'append',
  format: 'xlsx',
  includeSource: false,
};

describe('buildMergeSpec', () => {
  it('builds a valid spec', () => {
    const spec = buildMergeSpec(baseArgs);

    expect(spec.inputs.length).toBe(2);
    expect(spec.output.fileName).toBe('out.xlsx');
  });

  it('requires keys for union mode', () => {
    expect(() => buildMergeSpec({ ...baseArgs, mode: 'union' })).toThrowError(
      'Keys are required for union/join modes.'
    );
  });
});
