import type { JoinGroup, JoinLink } from '../../join-mapping-types';

export function addJoinLink(group: JoinGroup, link: JoinLink): JoinGroup {
  const filtered = group.links.filter((existing) => existing.fileIndex !== link.fileIndex);

  return { ...group, links: [...filtered, link] };
}
