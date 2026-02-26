import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import type { JoinGroup } from '../join-mapping-types';
import { buildHeaderKey } from '../functions/build-header-key';
import { describeJoinMapping } from '../functions/describe-join-mapping';
import { isJoinMappingCompatible } from '../functions/is-join-mapping-compatible';
import { useJoinMapping } from '../functions/use-join-mapping';
import JoinMappingActions from './JoinMappingActions';
import JoinMappingHeader from './JoinMappingHeader';
import JoinMappingGrid from './JoinMappingGrid';
type FileHeaders = {
  name: string;
  headers: string[];
};
type Props = {
  files: FileHeaders[];
  previousGroups: JoinGroup[] | null;
  onConfirm: (groups: JoinGroup[]) => void;
  onCancel: () => void;
};
export default function JoinMappingModal({ files, previousGroups, onConfirm, onCancel }: Props) {
  const { active, groups, groupColors, lines, positions, containerRef, onHeaderClick, registerHeader, setGroups } =
    useJoinMapping(files);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const canReuse = Boolean(previousGroups) && isJoinMappingCompatible(previousGroups ?? [], files);
  const [reusePrevious, setReusePrevious] = useState(canReuse);
  const activePosition = active ? positions[buildHeaderKey(active.fileIndex, active.header)] : undefined;
  const mappingSummary = useMemo(
    () => (previousGroups ? describeJoinMapping(previousGroups, files) : ''),
    [previousGroups, files]
  );
  useEffect(() => {
    setReusePrevious(canReuse);
  }, [canReuse]);

  useEffect(() => {
    if (reusePrevious && canReuse && previousGroups) {
      setGroups(previousGroups);

      return;
    }

    setGroups([]);
  }, [reusePrevious, canReuse, previousGroups, setGroups]);
  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container || !activePosition) {
      return;
    }

    const bounds = container.getBoundingClientRect();
    setCursor({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal" ref={containerRef} onMouseMove={onMouseMove} onMouseLeave={() => setCursor(null)}>
        <JoinMappingHeader
          canReuse={canReuse}
          reusePrevious={reusePrevious}
          mappingSummary={mappingSummary}
          onToggle={setReusePrevious}
        />
        <JoinMappingGrid
          files={files}
          active={active}
          onHeaderClick={onHeaderClick}
          registerHeader={registerHeader}
        />
        <svg className="mapping-lines">
          {lines.map((line) => (
            <line
              key={line.key}
              x1={line.from.x}
              y1={line.from.y}
              x2={line.to.x}
              y2={line.to.y}
              stroke={groupColors.get(line.groupId) ?? '#915f3b'}
              strokeWidth="2"
            />
          ))}
          {activePosition && cursor ? (
            <line
              x1={activePosition.x}
              y1={activePosition.y}
              x2={cursor.x}
              y2={cursor.y}
              stroke="#1f1a17"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ) : null}
        </svg>
        <JoinMappingActions groups={groups} onCancel={onCancel} onConfirm={onConfirm} />
      </div>
    </div>
  );
}
