import type { JoinGroup } from '../../join-mapping-types';

const COLORS = ['#915f3b', '#3b7c91', '#915f7f', '#517c3b', '#8b3b4a'];

export function buildGroupColors(groups: JoinGroup[]): Map<string, string> {
  return new Map(groups.map((group, index) => [group.id, COLORS[index % COLORS.length]]));
}
