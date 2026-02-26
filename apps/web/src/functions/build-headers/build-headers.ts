import { ParsedCsv } from '../merge-csv-types';

export function buildHeaders(parsed: ParsedCsv[], includeSource: boolean): string[] {
  const headers = parsed[0].headers.slice();

  if (includeSource) {
    headers.push('source');
  }

  return headers;
}
