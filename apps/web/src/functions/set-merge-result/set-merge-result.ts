import type { MergeReport } from '../../merge-types';

export function setMergeResult(
  csv: string,
  report: MergeReport,
  setDownloadUrl: (value: string) => void,
  setReport: (value: MergeReport | null) => void
): void {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  setDownloadUrl(url);
  setReport(report);
}
