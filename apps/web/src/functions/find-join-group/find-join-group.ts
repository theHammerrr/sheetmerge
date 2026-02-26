import type { JoinGroup, JoinLink } from '../../join-mapping-types';

export function findJoinGroup(groups: JoinGroup[], link: JoinLink): JoinGroup | undefined {
  return groups.find((group) => group.links.some((item) => item.fileIndex === link.fileIndex && item.header === link.header));
}
