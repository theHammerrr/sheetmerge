import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { readHeaders } from './read-headers';

describe('readHeaders', () => {
  it('reads headers from the selected sheet', () => {
    const workbook = XLSX.utils.book_new();
    const rows = [['id', 'name'], [1, 'alpha']];
    const sheet = XLSX.utils.aoa_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const result = readHeaders(buffer, { name: 'Sheet1' }, 1);

    expect(result.headers).toEqual(['id', 'name']);
  });
});
