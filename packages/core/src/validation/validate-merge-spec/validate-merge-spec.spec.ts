import { describe, it, expect } from 'vitest';
import { validateMergeSpec } from './validate-merge-spec';

function createValidSpec() {
  return {
    version: '1.0',
    inputs: [{ path: './a.xlsx' }, { path: './b.xlsx' }],
    sheet: {
      selector: { name: 'Sheet1' },
      headerRow: 1
    },
    merge: {
      mode: 'append'
    },
    output: {
      format: 'xlsx'
    }
  };
}

describe('validateMergeSpec', () => {
  it('accepts a valid spec', () => {
    const result = validateMergeSpec(createValidSpec());
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('rejects an invalid spec with missing fields', () => {
    const result = validateMergeSpec({ version: '1.0' });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('rejects include + exclude columns together', () => {
    const spec = createValidSpec();
    spec.merge = {
      mode: 'append',
      columns: {
        include: ['a'],
        exclude: ['b']
      }
    };

    const result = validateMergeSpec(spec);
    expect(result.valid).toBe(false);
  });
});
