import type { JoinGroup } from '../../join-mapping-types';
import { applyJoinMapping } from '../apply-join-mapping';
import { buildJoinKeyMaps } from '../build-join-key-maps';
import { mergeCsv } from '../merge-csv';
import { parseCsvFile } from '../parse-csv-file';
import type { MergeConfig, MergeReport } from '../../merge-types';

type MergeResult = {
  csv: string;
  report: MergeReport;
};

export async function runLocalJoinMerge(files: File[], config: MergeConfig, groups: JoinGroup[]): Promise<MergeResult> {
  const keyMaps = buildJoinKeyMaps(groups, files.length);
  const parsed = await Promise.all(
    files.map((file) => parseCsvFile(file, config.headerRow, config.dataStartRow))
  );
  const mapped = applyJoinMapping(parsed, keyMaps);
  const result = mergeCsv(mapped, {
    mode: 'join',
    keys: keyMaps.map((map) => map.key),
    joinType: config.joinType,
    includeSource: config.includeSource,
  });

  return { csv: result.csv, report: { rowCount: result.rowCount, warnings: result.warnings } };
}
