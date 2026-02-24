'use strict';

import type { InspectResult } from '../inspect-core-types';
import { listSheetNames } from '../list-sheet-names';
import { readHeaders } from '../read-headers';

export function inspectWorkbook(
  buffer: Buffer | Uint8Array | ArrayBuffer,
  selector?: { name?: string; index?: number },
  headerRow: number = 1
): InspectResult {
  const sheets = listSheetNames(buffer);
  const headerInfo = readHeaders(buffer, selector, headerRow);

  return {
    sheets,
    headers: headerInfo.headers,
    sheetName: headerInfo.sheetName,
  };
}
