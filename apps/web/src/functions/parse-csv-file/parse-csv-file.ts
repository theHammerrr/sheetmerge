import Papa from 'papaparse';
import type { ParsedCsv } from '../merge-csv-types';

function normalizeHeaders(values: unknown[]): string[] {
  return values
    .map((value) => (value === null || value === undefined ? '' : String(value).trim()))
    .filter((value) => value.length > 0);
}

function buildRows(headers: string[], rows: unknown[][]): Array<Record<string, string>> {
  return rows
    .map((row) => {
      const output: Record<string, string> = {};

      headers.forEach((header, index) => {
        const value = row[index];
        output[header] = value === null || value === undefined ? '' : String(value);
      });

      return output;
    })
    .filter((row) => Object.values(row).some((value) => value.length > 0));
}

function isRow(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export async function parseCsvFile(
  file: File,
  headerRow: number,
  dataStartRow: number
): Promise<ParsedCsv> {
  const text = await file.text();
  const result = Papa.parse<string[]>(text, { skipEmptyLines: true });

  if (result.errors.length > 0) {
    throw new Error(`Failed to parse ${file.name}.`);
  }

  const rows = result.data;
  const headerIndex = headerRow - 1;

  if (headerIndex < 0 || headerIndex >= rows.length) {
    throw new Error('Header row is out of range.');
  }

  const headerValues = rows[headerIndex];
  const headers = Array.isArray(headerValues) ? normalizeHeaders(headerValues) : [];

  if (headers.length === 0) {
    throw new Error('Headers are missing or invalid.');
  }

  const startIndex = Math.max(dataStartRow - 1, headerIndex + 1);
  const dataRows = rows.slice(startIndex).filter(isRow);
  const outputRows = buildRows(headers, dataRows);

  return { name: file.name, headers, rows: outputRows };
}
