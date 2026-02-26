import type { JoinKeyMap } from '../../join-mapping-types';
import type { ParsedCsv } from '../merge-csv-types';

function applyMapsToRows(rows: Array<Record<string, string>>, maps: JoinKeyMap[], fileIndex: number) {
  const byFile = maps.map((map) => ({ key: map.key, header: map.byFile[fileIndex] }));

  return rows.map((row) => {
    const next: Record<string, string> = { ...row };

    byFile.forEach(({ key, header }) => {
      next[key] = row[header] ?? '';
    });

    return next;
  });
}

export function applyJoinMapping(parsed: ParsedCsv[], maps: JoinKeyMap[]): ParsedCsv[] {
  return parsed.map((entry, index) => ({
    ...entry,
    rows: applyMapsToRows(entry.rows, maps, index),
  }));
}
