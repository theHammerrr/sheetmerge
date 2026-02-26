import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type MergeReport = {
  rowCount: number;
  warnings: string[];
};

type Props = {
  report: MergeReport | null;
  downloadUrl: string;
};

const ReportPanel: FC<Props> = ({ report, downloadUrl }) => {
  const { t } = useTranslation();

  if (!report) {
    return <div className="hint">{t('report.empty')}</div>;
  }

  return (
    <div className="report">
      <h2>{t('report.title')}</h2>
      <p>{t('report.rowsMerged', { count: report.rowCount })}</p>
      {report.warnings.length > 0 ? (
        <div className="warning">
          {report.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}
      {downloadUrl ? (
        <a className="download" href={downloadUrl} download="merged.csv">
          {t('report.download')}
        </a>
      ) : null}
    </div>
  );
};

export default ReportPanel;
