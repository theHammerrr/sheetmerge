import type { JoinGroup, JoinLink } from '../../join-mapping-types';

export function createJoinGroup(link: JoinLink): JoinGroup {
  return { id: crypto.randomUUID(), links: [link] };
}
