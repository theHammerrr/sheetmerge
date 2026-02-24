import { describe, it, expect } from 'vitest';
import { applyMergeOverrides } from './apply-merge-overrides';

const baseSpec = {
  version: '1.0',
  inputs: [{ path: 'a.xlsx' }, { path: 'b.xlsx' }],
  sheet: { selector: { index: 0 }, headerRow: 1 },
  merge: { mode: 'append' },
  output: { format: 'xlsx', fileName: 'out.xlsx', includeSource: false },
};

describe('applyMergeOverrides', () => {
  it('overrides inputs and output', () => {
    const result = applyMergeOverrides(baseSpec, {
      inputs: ['c.xlsx', 'd.xlsx'],
      output: 'new.xlsx',
      mode: 'append',
      format: 'xlsx',
      includeSource: true,
      includeSourceProvided: true,
    });

    expect(result.inputs[0].path).toBe('c.xlsx');
    expect(result.output.fileName).toBe('new.xlsx');
    expect(result.output.includeSource).toBe(true);
  });
});
