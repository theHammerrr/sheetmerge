import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { JoinGroup } from '../join-mapping-types';
import { buildHeaderKey } from '../functions/build-header-key';
import { useJoinMapping } from '../functions/use-join-mapping';
import JoinMappingGrid from './JoinMappingGrid';

type FileHeaders = {
  name: string;
  headers: string[];
};

type Props = {
  files: FileHeaders[];
  onConfirm: (groups: JoinGroup[]) => void;
  onCancel: () => void;
};

export default function JoinMappingModal({ files, onConfirm, onCancel }: Props) {
  const { t } = useTranslation();
  const { active, groups, groupColors, lines, positions, containerRef, onHeaderClick, registerHeader } =
    useJoinMapping(files);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const activePosition = active ? positions[buildHeaderKey(active.fileIndex, active.header)] : undefined;

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
        <div className="modal-header">
          <h2>{t('joinModal.title')}</h2>
          <p>{t('joinModal.subtitle')}</p>
        </div>
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
        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onCancel}>
            {t('joinModal.cancel')}
          </button>
          <button type="button" className="cta" onClick={() => onConfirm(groups)}>
            {t('joinModal.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
