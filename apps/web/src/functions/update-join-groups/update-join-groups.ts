import type { JoinGroup, JoinLink } from '../../join-mapping-types';
import { addJoinLink } from '../add-join-link';
import { createJoinGroup } from '../create-join-group';
import { findJoinGroup } from '../find-join-group';

function isSameLink(left: JoinLink, right: JoinLink): boolean {
  return left.fileIndex === right.fileIndex && left.header === right.header;
}

function stripLink(group: JoinGroup, link: JoinLink): JoinGroup | null {
  const links = group.links.filter((entry) => !isSameLink(entry, link));

  if (links.length < 2) {
    return null;
  }

  return { ...group, links };
}

export function updateJoinGroups(groups: JoinGroup[], active: JoinLink, link: JoinLink): JoinGroup[] {
  const baseGroup = findJoinGroup(groups, active);
  const existingGroup = findJoinGroup(groups, link);
  const nextBase = baseGroup ? addJoinLink(baseGroup, link) : addJoinLink(createJoinGroup(active), link);
  const withBase = baseGroup
    ? groups.map((group) => (group.id === baseGroup.id ? nextBase : group))
    : [...groups, nextBase];

  if (!existingGroup || existingGroup.id === nextBase.id) {
    return withBase;
  }

  return withBase.flatMap((group) => {
    if (group.id !== existingGroup.id) {
      return [group];
    }

    const stripped = stripLink(group, link);

    return stripped ? [stripped] : [];
  });
}
