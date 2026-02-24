'use strict';

import * as XLSX from 'xlsx';
import { MergeSpecError } from '../../errors/merge-spec-error';

type SheetSelector = { name?: string; index?: number };

type HeaderResult = {
  sheetName: string;
  headers: string[];
};

function toNodeBuffer(input: Buffer | Uint8Array | ArrayBuffer): Buffer {
  if (Buffer.isBuffer(input)) {
    return input;
  }

  if (input instanceof Uint8Array) {
    return Buffer.from(input);
  }

  return Buffer.from(new Uint8Array(input));
}

function resolveSheetName(workbook: XLSX.WorkBook, selector?: SheetSelector): string {
  if (selector?.name) {
    return selector.name;
  }

  const index = selector?.index ?? 0;
  const name = workbook.SheetNames[index];

  if (!name) {
    throw new MergeSpecError('Sheet selector did not resolve to a sheet.');
  }

  return name;
}

export function readHeaders(
  buffer: Buffer | Uint8Array | ArrayBuffer,
  selector?: SheetSelector,
  headerRow: number = 1
): HeaderResult {
  const workbook = XLSX.read(toNodeBuffer(buffer), { type: 'buffer' });
  const sheetName = resolveSheetName(workbook, selector);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new MergeSpecError(`Sheet "${sheetName}" was not found.`);
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  if (!Array.isArray(rows)) {
    throw new MergeSpecError('Sheet data is not a row array.');
  }

  const headerRowValues = rows[headerRow - 1];

  if (!Array.isArray(headerRowValues)) {
    throw new MergeSpecError('Header row is missing or invalid.');
  }

  const headers = headerRowValues
    .map((value) => (value === null || value === undefined ? '' : String(value).trim()))
    .filter((value) => value.length > 0);

  return { sheetName, headers };
}
