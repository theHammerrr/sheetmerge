import { useMemo, useState } from 'react';
import UploadDrop from './components/UploadDrop';
import FileList from './components/FileList';
import ConfigPanel from './components/ConfigPanel';
import ReportPanel from './components/ReportPanel';
import LanguageSwitch from './components/LanguageSwitch';
import { runLocalMerge } from './functions/run-local-merge';
import { useTranslation } from 'react-i18next';
import type { MergeConfig, MergeReport } from './merge-types';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
function App() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [report, setReport] = useState<MergeReport | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [config, setConfig] = useState<MergeConfig>({
    mode: 'append',
    keys: '',
    joinType: 'inner',
    includeSource: false,
    headerRow: 1,
    dataStartRow: 2,
  });
  const warnings = useMemo(
    () =>
      files
        .filter((file) => file.size > MAX_FILE_BYTES)
        .map((file) => t('warnings.largeFile', { name: file.name })),
    [files, t]
  );
  const onFiles = (nextFiles: File[]) => {
    setError('');
    setReport(null);
    setDownloadUrl('');
    setFiles(nextFiles);
  };
  const onRemove = (name: string) => {
    setFiles((current) => current.filter((file) => file.name !== name));
  };
  const runMerge = async () => {
    setError('');
    setReport(null);
    setDownloadUrl('');

    if (warnings.length > 0) {
      setError(t('errors.largeFilesDetected'));

      return;
    }

    try {
      const result = await runLocalMerge(files, config);
      const blob = new Blob([result.csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setReport(result.report);
    } catch (err) {
      if (err instanceof Error) {
        const localized = t(err.message);

        setError(localized === err.message ? t('errors.unknown') : localized);
      } else {
        setError(t('errors.unknown'));
      }
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <h1>{t('app.title')}</h1>
          <LanguageSwitch />
        </div>
        <p>{t('app.tagline')}</p>
      </header>
      <div className="layout">
        <div className="panel">
          <UploadDrop onFiles={onFiles} />
          <FileList files={files} onRemove={onRemove} warnings={warnings} />
          {error ? <div className="error">{error}</div> : null}
        </div>
        <div className="panel">
          <ConfigPanel config={config} onChange={setConfig} onMerge={runMerge} />
          <ReportPanel report={report} downloadUrl={downloadUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;
