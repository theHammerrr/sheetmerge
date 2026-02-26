import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runLocalJoinMerge } from './run-local-join-merge';
import { buildJoinKeyMaps } from '../build-join-key-maps';
import { parseCsvFile } from '../parse-csv-file';
import { applyJoinMapping } from '../apply-join-mapping';
import { mergeCsv } from '../merge-csv';

vi.mock('../build-join-key-maps', () => ({ buildJoinKeyMaps: vi.fn() }));
vi.mock('../parse-csv-file', () => ({ parseCsvFile: vi.fn() }));
vi.mock('../apply-join-mapping', () => ({ applyJoinMapping: vi.fn() }));
vi.mock('../merge-csv', () => ({ mergeCsv: vi.fn() }));

describe('runLocalJoinMerge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds key maps and merges mapped rows', async () => {
    const files = [
      new File(['id\n1\n'], 'a.csv', { type: 'text/csv' }),
      new File(['id\n2\n'], 'b.csv', { type: 'text/csv' }),
    ];
    const groups = [{ id: 'g1', links: [{ fileIndex: 0, header: 'id' }, { fileIndex: 1, header: 'id' }] }];
    const keyMaps = [{ key: '__join_key_1', byFile: { 0: 'id', 1: 'id' } }];
    const parsed = [
      { name: 'a.csv', headers: ['id'], rows: [{ id: '1' }] },
      { name: 'b.csv', headers: ['id'], rows: [{ id: '2' }] },
    ];
    const mapped = parsed;
    vi.mocked(buildJoinKeyMaps).mockReturnValue(keyMaps);
    vi.mocked(parseCsvFile)
      .mockResolvedValueOnce(parsed[0])
      .mockResolvedValueOnce(parsed[1]);
    vi.mocked(applyJoinMapping).mockReturnValue(mapped);
    vi.mocked(mergeCsv).mockReturnValue({ csv: 'id\n1\n2\n', rowCount: 2, warnings: ['w'] });

    const result = await runLocalJoinMerge(files, {
      mode: 'join',
      keys: '',
      joinType: 'inner',
      includeSource: false,
      headerRow: 1,
      dataStartRow: 2,
    }, groups);

    expect(buildJoinKeyMaps).toHaveBeenCalledWith(groups, 2);
    expect(applyJoinMapping).toHaveBeenCalledWith(parsed, keyMaps);
    expect(mergeCsv).toHaveBeenCalledWith(
      mapped,
      expect.objectContaining({ mode: 'join', keys: ['__join_key_1'] })
    );
    expect(result).toEqual({ csv: 'id\n1\n2\n', report: { rowCount: 2, warnings: ['w'] } });
  });
});
