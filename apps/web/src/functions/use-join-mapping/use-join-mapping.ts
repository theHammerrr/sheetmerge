import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { JoinGroup, JoinLink } from '../../join-mapping-types';
import { buildGroupColors } from '../build-group-colors';
import { buildHeaderKey } from '../build-header-key';
import { buildMappingLines } from '../build-mapping-lines';
import { updateJoinGroups } from '../update-join-groups';

type FileHeaders = {
  name: string;
  headers: string[];
};

type HeaderPosition = {
  x: number;
  y: number;
};

export function useJoinMapping(files: FileHeaders[]) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [groups, setGroups] = useState<JoinGroup[]>([]);
  const [active, setActive] = useState<JoinLink | null>(null);
  const [positions, setPositions] = useState<Record<string, HeaderPosition>>({});
  const groupColors = useMemo(() => buildGroupColors(groups), [groups]);
  const lines = useMemo(() => buildMappingLines(groups, positions), [groups, positions]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const bounds = container.getBoundingClientRect();
    const next: Record<string, HeaderPosition> = {};

    Object.entries(headerRefs.current).forEach(([key, node]) => {
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      next[key] = { x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2 };
    });

    setPositions(next);
  }, [files, groups, active]);

  const registerHeader = (fileIndex: number, header: string, node: HTMLButtonElement | null) => {
    headerRefs.current[buildHeaderKey(fileIndex, header)] = node;
  };

  const onHeaderClick = (fileIndex: number, header: string) => {
    const link = { fileIndex, header };

    if (!active) {
      setActive(link);

      return;
    }

    if (active.fileIndex === link.fileIndex && active.header === link.header) {
      setActive(null);

      return;
    }

    setGroups((current) => updateJoinGroups(current, active, link));
    setActive(null);
  };

  return { active, groups, groupColors, lines, positions, containerRef, onHeaderClick, registerHeader, setGroups };
}
