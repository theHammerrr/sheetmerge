import UploadDrop from './components/UploadDrop';
import FileList from './components/FileList';
import ConfigPanel from './components/ConfigPanel';
import ReportPanel from './components/ReportPanel';
import LanguageSwitch from './components/LanguageSwitch';
import JoinMappingModal from './components/JoinMappingModal';
import { useTranslation } from 'react-i18next';
import { useMergeState } from './functions/use-merge-state';

function App() {
  const { t } = useTranslation();
  const {
    files,
    warnings,
    error,
    report,
    downloadUrl,
    config,
    joinModalOpen,
    joinHeaders,
    onFiles,
    onRemove,
    onMerge,
    onConfigChange,
    onJoinCancel,
    onJoinConfirm,
  } = useMergeState();

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
          <ConfigPanel config={config} onChange={onConfigChange} onMerge={onMerge} />
          <ReportPanel report={report} downloadUrl={downloadUrl} />
        </div>
      </div>
      {joinModalOpen ? (
        <JoinMappingModal files={joinHeaders} onCancel={onJoinCancel} onConfirm={onJoinConfirm} />
      ) : null}
    </div>
  );
}

export default App;
