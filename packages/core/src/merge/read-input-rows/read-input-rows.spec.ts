import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { readInputRows } from './read-input-rows';

function createWorkbookBuffer(): Buffer {
  const workbook = XLSX.utils.book_new();
  const rows = [
    ['id', 'name'],
    [1, 'alpha'],
    [2, 'beta'],
  ];
  const sheet = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

describe('readInputRows', () => {
  it('reads rows with headers', () => {
    const buffer = createWorkbookBuffer();
    const result = readInputRows(
      buffer,
      {
        sheet: { selector: { name: 'Sheet1' }, headerRow: 1 },
        output: { includeSource: true },
      },
      { label: 'A' },
      0
    );

    expect(result.rowCount).toBe(2);
    expect(result.headers).toContain('id');
    expect(result.headers).toContain('source');
  });
});
