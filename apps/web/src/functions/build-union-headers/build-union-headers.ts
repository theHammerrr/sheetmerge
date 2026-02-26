import type { ParsedCsv } from '../merge-csv-types';

export function buildUnionHeaders(parsed: ParsedCsv[], includeSource: boolean): string[] {
  const unique = new Set<string>();
  const headers: string[] = [];

  parsed.forEach((entry) => {
    entry.headers.forEach((header) => {
      if (!unique.has(header)) {
        unique.add(header);
        headers.push(header);
      }
    });
  });

  if (includeSource && !unique.has('source')) {
    headers.push('source');
  }

  return headers;
}
