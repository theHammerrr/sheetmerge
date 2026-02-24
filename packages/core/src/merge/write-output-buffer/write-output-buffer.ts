'use strict';

import * as XLSX from 'xlsx';
import type { OutputConfig, Row } from '../merge-types';

type OutputOptions = Pick<OutputConfig, 'format' | 'sheetName'>;

function collectHeaders(rows: Row[]): string[] {
  const headers: string[] = [];
  const seen = new Set<string>();

  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        headers.push(key);
      }
    }
  }

  return headers;
}

export function writeOutputBuffer(rows: Row[], output: OutputOptions): Buffer {
  const headers = collectHeaders(rows);
  const sheet = XLSX.utils.json_to_sheet(rows, { header: headers });

  if (output.format === 'csv') {
    const csv = XLSX.utils.sheet_to_csv(sheet);

    return Buffer.from(csv, 'utf8');
  }

  const workbook = XLSX.utils.book_new();
  const sheetName = output.sheetName ?? 'Merged';

  XLSX.utils.book_append_sheet(workbook, sheet, sheetName);

  const outputBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  if (Buffer.isBuffer(outputBuffer)) {
    return outputBuffer;
  }

  return Buffer.from(outputBuffer);
}
