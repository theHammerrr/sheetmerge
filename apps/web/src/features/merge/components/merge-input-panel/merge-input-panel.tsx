import type { FC } from 'react';
import FileList from '../../../../components/FileList';
import UploadDrop from '../../../../components/UploadDrop';

type Props = {
  files: File[];
  warnings: string[];
  error: string;
  onFiles: (files: File[]) => void;
  onRemove: (name: string) => void;
};

const MergeInputPanel: FC<Props> = ({ files, warnings, error, onFiles, onRemove }) => {
  return (
    <div className="panel merge-input-panel">
      <UploadDrop onFiles={onFiles} />
      <FileList files={files} onRemove={onRemove} warnings={warnings} />
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
};

export default MergeInputPanel;
