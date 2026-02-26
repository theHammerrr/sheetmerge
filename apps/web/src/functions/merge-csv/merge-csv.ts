import Papa from 'papaparse';
import { coreWebAdapter } from '../../features/merge/infra/core-web-adapter';
import type { CoreMergeConfig, CoreRow } from '../../features/merge/infra/core-web-adapter';
import { addSource } from '../add-source';
import { buildHeaders } from '../build-headers';
import { buildUnionHeaders } from '../build-union-headers';
import { MergeOptions, MergeOutput, ParsedCsv } from '../merge-csv-types';

export function mergeCsv(parsed: ParsedCsv[], options: MergeOptions): MergeOutput {
  const warnings: string[] = [];
  const rowsByFile: CoreRow[][] = parsed.map((entry) =>
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

  const mergeConfig: CoreMergeConfig = {
    mode: options.mode,
    keys: options.keys,
    joinType: options.mode === 'join' ? options.joinType : undefined,
  };

  const merged = coreWebAdapter.mergeRows(rowsByFile, mergeConfig);
  const csv = Papa.unparse(merged, { columns: headers });

  return { csv, rowCount: merged.length, warnings };
}
