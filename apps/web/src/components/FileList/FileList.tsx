import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './FileList.css';

type Props = {
  files: File[];
  warnings: string[];
  onRemove: (name: string) => void;
};

const FileList: FC<Props> = ({ files, warnings, onRemove }) => {
  const { t } = useTranslation();

  if (files.length === 0) {
    return <div className="hint">{t('fileList.empty')}</div>;
  }

  return (
    <div className="file-list">
      {files.map((file) => (
        <div key={file.name} className="file-item">
          <div>
            <strong>{file.name}</strong>
            <span>{t('fileList.size', { size: Math.round(file.size / 1024) })}</span>
          </div>
          <button type="button" onClick={() => onRemove(file.name)}>
            {t('fileList.remove')}
          </button>
        </div>
      ))}
      {warnings.length > 0 ? (
        <div className="warning">
          {warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FileList;
