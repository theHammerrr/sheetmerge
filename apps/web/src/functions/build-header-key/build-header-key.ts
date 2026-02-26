export function buildHeaderKey(fileIndex: number, header: string): string {
  return `${fileIndex}::${header}`;
}
