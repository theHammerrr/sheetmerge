import { parseCsvFile } from '../parse-csv-file';
import { mergeCsv } from '../merge-csv';
import { validateCompatibility } from 'sheetmerge-core/inspect/validate-compatibility';

type MergeConfig = {
  mode: 'append' | 'union' | 'join';
  keys: string;
  joinType: 'inner' | 'left' | 'right' | 'full';
  includeSource: boolean;
  headerRow: number;
  dataStartRow: number;
};

type MergeReport = {
  rowCount: number;
  warnings: string[];
};

type MergeResult = {
  csv: string;
  report: MergeReport;
};

export async function runLocalMerge(files: File[], config: MergeConfig): Promise<MergeResult> {
  if (files.length < 2) {
    throw new Error('errors.noFiles');
  }

  const nonCsv = files.find((file) => !file.name.toLowerCase().endsWith('.csv'));

  if (nonCsv) {
    throw new Error('errors.csvOnly');
  }

  if (config.mode !== 'append' && config.keys.trim().length === 0) {
    throw new Error('errors.missingKeys');
  }

  const parsed = await Promise.all(
    files.map((file) => parseCsvFile(file, config.headerRow, config.dataStartRow))
  );
  const headerCheck = validateCompatibility(parsed.map((entry) => entry.headers));

  if (!headerCheck.compatible) {
    throw new Error('errors.headerMismatch');
  }

  const mergeResult = mergeCsv(parsed, {
    mode: config.mode,
    keys: config.keys
      .split(',')
      .map((key) => key.trim())
      .filter((key) => key.length > 0),
    joinType: config.joinType,
    includeSource: config.includeSource,
  });

  return {
    csv: mergeResult.csv,
    report: { rowCount: mergeResult.rowCount, warnings: mergeResult.warnings },
  };
}
