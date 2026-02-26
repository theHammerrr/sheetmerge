import type { FC } from 'react';
import type { MergeConfig, MergeReport } from '../../../../merge-types';
import MergeInputPanel from '../merge-input-panel';
import MergeOutputPanel from '../merge-output-panel';
import './merge-workspace.css';

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
      <MergeInputPanel
        files={files}
        warnings={warnings}
        error={error}
        onFiles={onFiles}
        onRemove={onRemove}
      />
      <MergeOutputPanel
        fileCount={files.length}
        report={report}
        downloadUrl={downloadUrl}
        config={config}
        onMerge={onMerge}
        onConfigChange={onConfigChange}
      />
    </div>
  );
};

export default MergeWorkspace;
