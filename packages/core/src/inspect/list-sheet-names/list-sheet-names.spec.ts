import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { listSheetNames } from './list-sheet-names';

describe('listSheetNames', () => {
  it('returns sheet names', () => {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet([['id']]);

    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const names = listSheetNames(buffer);

    expect(names).toEqual(['Sheet1']);
  });
});
