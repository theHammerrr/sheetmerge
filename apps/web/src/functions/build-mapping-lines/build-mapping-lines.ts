import type { JoinGroup } from '../../join-mapping-types';
import { buildHeaderKey } from '../build-header-key';

type HeaderPosition = {
  x: number;
  y: number;
};

type LineSegment = {
  key: string;
  groupId: string;
  from: HeaderPosition;
  to: HeaderPosition;
};

export function buildMappingLines(
  groups: JoinGroup[],
  positions: Record<string, HeaderPosition>
): LineSegment[] {
  return groups.flatMap((group) => {
    const points = group.links
      .map((link) => positions[buildHeaderKey(link.fileIndex, link.header)])
      .filter(Boolean);
    const origin = points[0];

    if (!origin) {
      return [];
    }

    return points.slice(1).map((point, index) => ({
      key: `${group.id}-${index}`,
      groupId: group.id,
      from: origin,
      to: point,
    }));
  });
}
