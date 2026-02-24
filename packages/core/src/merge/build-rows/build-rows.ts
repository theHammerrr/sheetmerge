'use strict';

import { MergeSpecError } from '../../errors/merge-spec-error';

type Row = Record<string, unknown>;

type BuildRowsResult = { rows: Row[]; headers: string[] };

export function buildRows(
  rawRows: unknown,
  headerRowIndex: number,
  dataStartRowIndex: number,
  includeSource: boolean,
  sourceLabel: string
): BuildRowsResult {
  if (!Array.isArray(rawRows)) {
    throw new MergeSpecError('Sheet data is not a row array.');
  }

  const headerRow = rawRows[headerRowIndex - 1];

  if (!Array.isArray(headerRow)) {
    throw new MergeSpecError('Header row is missing or invalid.');
  }

  const headerMap = headerRow
    .map((value, index) => {
      const name = value === null || value === undefined ? '' : String(value).trim();

      return name.length > 0 ? { name, index } : null;
    })
    .filter((entry) => entry !== null);

  const headers = headerMap.map((entry) => (entry ? entry.name : ''));
  const rows: Row[] = [];

  for (let rowIndex = dataStartRowIndex - 1; rowIndex < rawRows.length; rowIndex += 1) {
    const row = rawRows[rowIndex];

    if (!Array.isArray(row)) {
      continue;
    }

    const output: Row = {};
    let hasValue = false;

    for (const entry of headerMap) {
      if (!entry) {
        continue;
      }

      const value = row[entry.index];

      if (value !== null && value !== undefined && value !== '') {
        hasValue = true;
      }

      output[entry.name] = value;
    }

    if (includeSource) {
      output.source = sourceLabel;
    }

    if (hasValue) {
      rows.push(output);
    }
  }

  if (includeSource) {
    headers.push('source');
  }

  return { rows, headers };
}
