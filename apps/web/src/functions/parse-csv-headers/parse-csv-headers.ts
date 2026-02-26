import Papa from 'papaparse';

type ParsedHeaders = {
  name: string;
  headers: string[];
};

function normalizeHeaders(values: unknown[]): string[] {
  return values
    .map((value) => (value === null || value === undefined ? '' : String(value).trim()))
    .filter((value) => value.length > 0);
}

export async function parseCsvHeaders(file: File, headerRow: number): Promise<ParsedHeaders> {
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

  return { name: file.name, headers };
}
