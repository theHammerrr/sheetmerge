import type { FC } from 'react';
import ConfigPanel from '../../../../components/ConfigPanel';
import FileList from '../../../../components/FileList';
import ReportPanel from '../../../../components/ReportPanel';
import UploadDrop from '../../../../components/UploadDrop';
import type { MergeConfig, MergeReport } from '../../../../merge-types';

type Props = {
  files: File[];
  warnings: string[];
  error: string;
  report: MergeReport | null;
  downloadUrl: string;
  config: MergeConfig;
  onFiles: (files: File[]) => void;
  onRemove: (name: string) => void;
  onMerge: () => Promise<void>;
  onConfigChange: (config: MergeConfig) => void;
};

const MergeWorkspace: FC<Props> = ({
  files,
  warnings,
  error,
  report,
  downloadUrl,
  config,
  onFiles,
  onRemove,
  onMerge,
  onConfigChange,
}) => {
  return (
    <div className="layout">
      <div className="panel">
        <UploadDrop onFiles={onFiles} />
        <FileList files={files} onRemove={onRemove} warnings={warnings} />
        {error ? <div className="error">{error}</div> : null}
      </div>
      <div className="panel">
        <ConfigPanel config={config} onChange={onConfigChange} onMerge={onMerge} />
        <ReportPanel report={report} downloadUrl={downloadUrl} />
      </div>
    </div>
  );
};

export default MergeWorkspace;
