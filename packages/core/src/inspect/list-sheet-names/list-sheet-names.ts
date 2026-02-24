'use strict';

import * as XLSX from 'xlsx';

export function listSheetNames(buffer: Buffer | Uint8Array | ArrayBuffer): string[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });

  return workbook.SheetNames.slice();
}
