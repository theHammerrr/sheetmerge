import type { JoinGroup, JoinKeyMap } from '../../join-mapping-types';

function mapGroupToFiles(group: JoinGroup): Record<number, string> {
  return group.links.reduce<Record<number, string>>((acc, link) => {
    acc[link.fileIndex] = link.header;

    return acc;
  }, {});
}

function validateGroup(group: JoinGroup, fileCount: number): void {
  const files = new Set(group.links.map((link) => link.fileIndex));

  if (files.size !== fileCount) {
    throw new Error('errors.joinMappingIncomplete');
  }
}

export function buildJoinKeyMaps(groups: JoinGroup[], fileCount: number): JoinKeyMap[] {
  if (groups.length === 0) {
    throw new Error('errors.joinMappingIncomplete');
  }

  groups.forEach((group) => validateGroup(group, fileCount));

  return groups.map((group, index) => ({
    key: `__join_key_${index + 1}`,
    byFile: mapGroupToFiles(group),
  }));
}
