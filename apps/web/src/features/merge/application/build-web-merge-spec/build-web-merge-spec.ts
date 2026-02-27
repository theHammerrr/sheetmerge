import type { JoinGroup } from '../../../../join-mapping-types';
import type { WebMergeSpec } from '../../../../merge-spec-types';
import type { MergeConfig } from '../../../../merge-types';
import { buildJoinKeyMaps } from '../../../../functions/build-join-key-maps';

function parseKeys(keys: string): string[] | undefined {
  const parsedKeys = keys
    .split(',')
    .map((key) => key.trim())
    .filter((key) => key.length > 0);

  if (parsedKeys.length === 0) {
    return undefined;
  }

  return parsedKeys;
}

function buildJoinKeyMapsForSpec(groups: JoinGroup[], fileCount: number) {
  if (groups.length === 0) {
    return undefined;
  }

  return buildJoinKeyMaps(groups, fileCount).map((map) => ({
    key: map.key,
    byInput: Object.fromEntries(
      Object.entries(map.byFile).map(([fileIndex, header]) => [String(fileIndex), header]),
    ),
  }));
}

export function buildWebMergeSpec(files: File[], config: MergeConfig, groups: JoinGroup[]): WebMergeSpec {
  const joinKeyMaps = config.mode === 'join' ? buildJoinKeyMapsForSpec(groups, files.length) : undefined;

  return {
    version: '1.0',
    inputs: files.map((file, index) => ({ path: file.name, id: String(index), label: file.name })),
    sheet: { selector: { index: 0 }, headerRow: config.headerRow, dataStartRow: config.dataStartRow },
    merge: {
      mode: config.mode,
      keys: config.mode === 'append' ? undefined : parseKeys(config.keys),
      joinKeyMaps,
      joinType: config.mode === 'join' ? config.joinType : undefined,
    },
    output: { format: 'csv', fileName: 'merged.csv', includeSource: config.includeSource },
  };
}
