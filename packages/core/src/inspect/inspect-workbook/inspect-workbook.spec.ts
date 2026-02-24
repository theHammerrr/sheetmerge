import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { inspectWorkbook } from './inspect-workbook';

describe('inspectWorkbook', () => {
  it('returns sheets and headers', () => {
    const workbook = XLSX.utils.book_new();
    const rows = [['id', 'name']];
    const sheet = XLSX.utils.aoa_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const result = inspectWorkbook(buffer, { name: 'Sheet1' }, 1);

    expect(result.sheets).toEqual(['Sheet1']);
    expect(result.headers).toEqual(['id', 'name']);
  });
});
