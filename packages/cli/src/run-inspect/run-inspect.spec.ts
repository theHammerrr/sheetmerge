import { describe, it, expect, vi } from 'vitest';
import { runInspect } from './run-inspect';

const baseArgs = {
  inputs: ['a.xlsx'],
  headerRow: 1,
};

describe('runInspect', () => {
  it('prints sheet info for each input', () => {
    const resolvePlan = vi.fn(() => ({ spec: { sheet: { selector: { index: 0 } } } }));
    const readInputs = vi.fn(() => [Buffer.from('a')]);
    const inspectWorkbook = vi.fn(() => ({
      sheets: ['Sheet1'],
      headers: ['id'],
      sheetName: 'Sheet1',
    }));
    const log = vi.fn();

    const result = runInspect(baseArgs, { resolvePlan, readInputs, inspectWorkbook, log });

    expect(result[0].headers).toEqual(['id']);
    expect(log).toHaveBeenCalled();
  });
});
