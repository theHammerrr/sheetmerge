export function addSource(
  rows: Array<Record<string, string>>,
  source: string
): Array<Record<string, string>> {
  return rows.map((row) => ({ ...row, source }));
}
