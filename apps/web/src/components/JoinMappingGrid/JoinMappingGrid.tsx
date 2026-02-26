import type { FC } from 'react';
import type { JoinLink } from '../../join-mapping-types';
import { buildHeaderKey } from '../../functions/build-header-key';
import './JoinMappingGrid.css';

type FileHeaders = {
  name: string;
  headers: string[];
};

type Props = {
  files: FileHeaders[];
  active: JoinLink | null;
  onHeaderClick: (fileIndex: number, header: string) => void;
  registerHeader: (fileIndex: number, header: string, node: HTMLButtonElement | null) => void;
};

const JoinMappingGrid: FC<Props> = ({ files, active, onHeaderClick, registerHeader }) => {
  return (
    <div className="mapping-grid">
      {files.map((file, fileIndex) => (
        <div key={file.name} className="mapping-column">
          <h3>{file.name}</h3>
          <div className="mapping-list">
            {file.headers.map((header) => {
              const key = buildHeaderKey(fileIndex, header);
              const isActive = active?.fileIndex === fileIndex && active.header === header;

              return (
                <button
                  key={key}
                  className={`mapping-item${isActive ? ' mapping-item--active' : ''}`}
                  ref={(node) => registerHeader(fileIndex, header, node)}
                  type="button"
                  onClick={() => onHeaderClick(fileIndex, header)}
                >
                  {header}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinMappingGrid;
