import Papa from 'papaparse';
import { mergeRows } from 'sheetmerge-core/merge/merge-rows';
import type { MergeConfig, Row } from 'sheetmerge-core/merge/merge-types';
import { addSource } from '../add-source';
import { buildHeaders } from '../build-headers';
import { buildUnionHeaders } from '../build-union-headers';
import { MergeOptions, MergeOutput, ParsedCsv } from '../merge-csv-types';

export function mergeCsv(parsed: ParsedCsv[], options: MergeOptions): MergeOutput {
  const warnings: string[] = [];
  const rowsByFile: Row[][] = parsed.map((entry) =>
    options.includeSource ? addSource(entry.rows, entry.name) : entry.rows
  );
  const flattened = rowsByFile.flat();
  const headers =
    options.mode === 'join'
      ? buildUnionHeaders(parsed, options.includeSource)
      : buildHeaders(parsed, options.includeSource);

  if (options.mode === 'append') {
    const csv = Papa.unparse(flattened, { columns: headers });

    return { csv, rowCount: flattened.length, warnings };
  }

  const mergeConfig: MergeConfig = {
    mode: options.mode,
    keys: options.keys,
    joinType: options.mode === 'join' ? options.joinType : undefined,
  };

  const merged = mergeRows(rowsByFile, mergeConfig);
  const csv = Papa.unparse(merged, { columns: headers });

  return { csv, rowCount: merged.length, warnings };
}
