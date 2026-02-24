import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { writeOutputBuffer } from './write-output-buffer';

describe('writeOutputBuffer', () => {
  it('creates an xlsx buffer with rows', () => {
    const rows = [{ id: 1 }, { id: 2 }];
    const buffer = writeOutputBuffer(rows, { format: 'xlsx', sheetName: 'Merged' });
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });
    const count = Array.isArray(rawRows) ? rawRows.length : 0;

    expect(count).toBe(3);
  });
});
