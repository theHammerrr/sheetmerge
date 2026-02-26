import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runLocalMerge } from './run-local-merge';
import { parseCsvFile } from '../parse-csv-file';
import { mergeCsv } from '../merge-csv';
import { coreWebAdapter } from '../../features/merge/infra/core-web-adapter';

vi.mock('../parse-csv-file', () => ({ parseCsvFile: vi.fn() }));
vi.mock('../merge-csv', () => ({ mergeCsv: vi.fn() }));
vi.mock('../../features/merge/infra/core-web-adapter', () => ({
  coreWebAdapter: { validateCompatibility: vi.fn() },
}));

describe('runLocalMerge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const baseConfig = {
    keys: '',
    joinType: 'inner' as const,
    includeSource: false,
    headerRow: 1,
    dataStartRow: 2,
  };

  it('rejects when fewer than two files are provided', async () => {
    await expect(runLocalMerge([], { ...baseConfig, mode: 'append' })).rejects.toThrow(
      'errors.noFiles'
    );
  });

  it('rejects append mode when headers are incompatible', async () => {
    vi.mocked(parseCsvFile).mockResolvedValue({
      name: 'a.csv',
      headers: ['id'],
      rows: [{ id: '1' }],
    });
    vi.mocked(coreWebAdapter.validateCompatibility).mockReturnValue({
      compatible: false,
      commonHeaders: [],
      missingByInput: [],
      extraByInput: [],
      normalizedByInput: [],
    });

    const files = [
      new File(['id\n1\n'], 'a.csv', { type: 'text/csv' }),
      new File(['id\n2\n'], 'b.csv', { type: 'text/csv' }),
    ];

    await expect(runLocalMerge(files, { ...baseConfig, mode: 'append' })).rejects.toThrow(
      'errors.headerMismatch'
    );
  });

  it('parses keys and returns merge result payload', async () => {
    vi.mocked(parseCsvFile)
      .mockResolvedValueOnce({
        name: 'a.csv',
        headers: ['id'],
        rows: [{ id: '1' }],
      })
      .mockResolvedValueOnce({
        name: 'b.csv',
        headers: ['id'],
        rows: [{ id: '2' }],
      });
    vi.mocked(coreWebAdapter.validateCompatibility).mockReturnValue({
      compatible: true,
      commonHeaders: ['id'],
      missingByInput: [],
      extraByInput: [],
      normalizedByInput: [],
    });
    vi.mocked(mergeCsv).mockReturnValue({
      csv: 'id\n1\n2\n',
      rowCount: 2,
      warnings: [],
    });
    const files = [
      new File(['id\n1\n'], 'a.csv', { type: 'text/csv' }),
      new File(['id\n2\n'], 'b.csv', { type: 'text/csv' }),
    ];

    const result = await runLocalMerge(files, { ...baseConfig, mode: 'union', keys: ' id , email ' });

    expect(mergeCsv).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ mode: 'union', keys: ['id', 'email'] })
    );
    expect(result).toEqual({
      csv: 'id\n1\n2\n',
      report: { rowCount: 2, warnings: [] },
    });
  });
});
