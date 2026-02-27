import type { JoinGroup, JoinLink } from '../../../../join-mapping-types';
import type { WebMergeSpec } from '../../../../merge-spec-types';
import type { MergeConfig } from '../../../../merge-types';

type ApplyWebMergeSpecResult = {
  config: MergeConfig;
  groups: JoinGroup[];
};

function resolveFileIndex(inputKey: string, inputs: WebMergeSpec['inputs']): number | null {
  const numeric = Number(inputKey);

  if (Number.isInteger(numeric) && numeric >= 0 && numeric < inputs.length) {
    return numeric;
  }

  const matchedIndex = inputs.findIndex((input) => input.id === inputKey);

  if (matchedIndex === -1) {
    return null;
  }

  return matchedIndex;
}

function mapJoinKeyMapsToGroups(spec: WebMergeSpec): JoinGroup[] {
  const maps = spec.merge.joinKeyMaps ?? [];

  return maps
    .map((map, index) => {
      const links = Object.entries(map.byInput).reduce<JoinLink[]>((acc, [inputKey, header]) => {
        const fileIndex = resolveFileIndex(inputKey, spec.inputs);

        if (fileIndex === null || header.length === 0) {
          return acc;
        }

        acc.push({ fileIndex, header });

        return acc;
      }, []);

      return { id: `imported-group-${index + 1}`, links };
    })
    .filter((group) => group.links.length >= 2);
}

function formatKeys(keys: string[] | undefined): string {
  if (!keys || keys.length === 0) {
    return '';
  }

  return keys.join(', ');
}

export function applyWebMergeSpec(spec: WebMergeSpec): ApplyWebMergeSpecResult {
  return {
    config: {
      mode: spec.merge.mode,
      keys: formatKeys(spec.merge.keys),
      joinType: spec.merge.joinType ?? 'inner',
      includeSource: spec.output.includeSource ?? false,
      headerRow: spec.sheet.headerRow ?? 1,
      dataStartRow: spec.sheet.dataStartRow ?? 2,
    },
    groups: mapJoinKeyMapsToGroups(spec),
  };
}
