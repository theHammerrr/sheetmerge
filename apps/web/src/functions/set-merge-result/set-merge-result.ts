import type { MergeReport } from '../../merge-types';

export function setMergeResult(
  csv: string,
  report: MergeReport,
  currentDownloadUrl: string,
  setDownloadUrl: (value: string) => void,
  setReport: (value: MergeReport | null) => void
): void {
  if (currentDownloadUrl.length > 0) {
    URL.revokeObjectURL(currentDownloadUrl);
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  setDownloadUrl(url);
  setReport(report);
}
