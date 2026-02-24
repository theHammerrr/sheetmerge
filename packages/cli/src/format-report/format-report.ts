'use strict';

import type { MergeReport } from '../cli-types';

export function formatReport(report: MergeReport): string {
  const lines: string[] = [];

  lines.push(`Mode: ${report.mode}`);
  lines.push(`Inputs: ${report.inputs.length}`);
  lines.push(`Output rows: ${report.output.rowCount}`);
  lines.push(`Output format: ${report.output.format}`);

  if (report.output.sheetName) {
    lines.push(`Sheet: ${report.output.sheetName}`);
  }

  if (report.output.fileName) {
    lines.push(`File: ${report.output.fileName}`);
  }

  if (report.warnings.length > 0) {
    lines.push(`Warnings: ${report.warnings.length}`);
  }

  return lines.join('\n');
}
