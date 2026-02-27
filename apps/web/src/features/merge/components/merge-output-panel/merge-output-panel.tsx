import type { FC } from 'react';
import ConfigPanel from '../../../../components/ConfigPanel';
import ReportPanel from '../../../../components/ReportPanel';
import type { MergeConfig, MergeReport } from '../../../../merge-types';

type Props = {
  fileCount: number;
  report: MergeReport | null;
  downloadUrl: string;
  config: MergeConfig;
  onMerge: () => Promise<void>;
  onConfigChange: (config: MergeConfig) => void;
};

const MergeOutputPanel: FC<Props> = ({
  fileCount,
  report,
  downloadUrl,
  config,
  onMerge,
  onConfigChange,
}) => {
  return (
    <div className="panel merge-output-panel">
      <ConfigPanel
        config={config}
        fileCount={fileCount}
        onChange={onConfigChange}
        onMerge={onMerge}
      />
      <ReportPanel report={report} downloadUrl={downloadUrl} />
    </div>
  );
};

export default MergeOutputPanel;
