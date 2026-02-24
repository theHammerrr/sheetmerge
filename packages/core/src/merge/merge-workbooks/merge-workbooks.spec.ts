import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { mergeWorkbooks } from './merge-workbooks';

function createWorkbookBuffer(rows: Array<Array<string | number>>): Buffer {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

describe('mergeWorkbooks', () => {
  it('merges inputs and returns a buffer and report', () => {
    const bufferA = createWorkbookBuffer([
      ['id', 'name'],
      [1, 'alpha'],
    ]);
    const bufferB = createWorkbookBuffer([
      ['id', 'name'],
      [2, 'beta'],
    ]);
    const result = mergeWorkbooks([bufferA, bufferB], {
      version: '1.0',
      inputs: [{ id: 'a', path: 'a.xlsx' }, { id: 'b', path: 'b.xlsx' }],
      sheet: { selector: { name: 'Sheet1' }, headerRow: 1 },
      merge: { mode: 'append' },
      output: { format: 'xlsx', sheetName: 'Merged' },
    });
    const workbook = XLSX.read(result.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });
    const count = Array.isArray(rawRows) ? rawRows.length : 0;

    expect(result.report.output.rowCount).toBe(2);
    expect(count).toBe(3);
  });
});
