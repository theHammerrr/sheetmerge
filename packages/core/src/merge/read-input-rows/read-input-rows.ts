'use strict';

import * as XLSX from 'xlsx';
import { MergeSpecError } from '../../errors/merge-spec-error';
import { buildRows } from '../build-rows';
import type { InputSpec, ReadSpec, Row } from '../merge-types';

type ReadResult = { rows: Row[]; headers: string[]; rowCount: number; sourceLabel: string };

function toNodeBuffer(input: Buffer | Uint8Array | ArrayBuffer): Buffer {
  if (Buffer.isBuffer(input)) {
    return input;
  }

  if (input instanceof Uint8Array) {
    return Buffer.from(input);
  }

  return Buffer.from(new Uint8Array(input));
}

function getSheetName(workbook: XLSX.WorkBook, selector: ReadSpec['sheet']['selector']): string {
  if (typeof selector.name === 'string' && selector.name.length > 0) {
    return selector.name;
  }

  const index = typeof selector.index === 'number' ? selector.index : 0;
  const sheetName = workbook.SheetNames[index];

  if (!sheetName) {
    throw new MergeSpecError('Sheet selector did not resolve to a sheet.');
  }

  return sheetName;
}

export function readInputRows(
  input: Buffer | Uint8Array | ArrayBuffer,
  spec: ReadSpec,
  meta: InputSpec,
  index: number
): ReadResult {
  const buffer = toNodeBuffer(input);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = getSheetName(workbook, spec.sheet.selector);
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new MergeSpecError(`Sheet "${sheetName}" was not found.`);
  }

  const headerRowIndex = spec.sheet.headerRow ?? 1;
  const dataStartRowIndex = spec.sheet.dataStartRow ?? headerRowIndex + 1;
  const sourceLabel = meta.label ?? meta.id ?? String(index + 1);
  const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
  const { rows, headers } = buildRows(
    rawRows,
    headerRowIndex,
    dataStartRowIndex,
    Boolean(spec.output.includeSource),
    sourceLabel
  );

  return { rows, headers, rowCount: rows.length, sourceLabel };
}
