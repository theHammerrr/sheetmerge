import { describe, expect, it, vi } from 'vitest';
import { setMergeResult } from './set-merge-result';

type MergeReport = {
  rowCount: number;
  warnings: string[];
};

describe('setMergeResult', () => {
  it('revokes old url and sets the next url/report', () => {
    const createObjectUrl = vi.fn(() => 'blob:new');
    const revokeObjectUrl = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectUrl, configurable: true });
    Object.defineProperty(URL, 'revokeObjectURL', { value: revokeObjectUrl, configurable: true });
    const setDownloadUrl = vi.fn();
    const setReport = vi.fn();
    const report: MergeReport = { rowCount: 2, warnings: [] };

    setMergeResult('id,name\n1,a', report, 'blob:old', setDownloadUrl, setReport);

    expect(revokeObjectUrl).toHaveBeenCalledWith('blob:old');
    expect(createObjectUrl).toHaveBeenCalledTimes(1);
    expect(setDownloadUrl).toHaveBeenCalledWith('blob:new');
    expect(setReport).toHaveBeenCalledWith(report);
  });
});
