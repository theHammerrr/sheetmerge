import { describe, it, expect, vi } from 'vitest';
import { runValidate } from './run-validate';

describe('runValidate', () => {
  it('reports compatible headers', () => {
    const resolvePlan = vi.fn(() => ({ spec: { sheet: { selector: { index: 0 } } } }));
    const readInputs = vi.fn(() => [Buffer.from('a'), Buffer.from('b')]);
    const readHeaders = vi.fn(() => ({ headers: ['id'] }));
    const validateCompatibility = vi.fn(() => ({ compatible: true, headers: ['id'], mismatches: [] }));
    const log = vi.fn();

    const result = runValidate(
      { inputs: ['a.xlsx', 'b.xlsx'], headerRow: 1 },
      { resolvePlan, readInputs, readHeaders, validateCompatibility, log }
    );

    expect(result.compatible).toBe(true);
    expect(log).toHaveBeenCalledWith('Inputs are compatible.');
  });
});
