import LanguageSwitch from './components/LanguageSwitch';
import { joinMappingFeature } from './features/join-mapping';
import { mergeFeature } from './features/merge';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();
  const { MergeWorkspace, useMergeState } = mergeFeature;
  const { JoinMappingModalFeature } = joinMappingFeature;
  const {
    files,
    warnings,
    error,
    report,
    downloadUrl,
    config,
    joinModalOpen,
    joinHeaders,
    previousGroups,
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
          {/* <LanguageSwitch /> */}
        </div>
        {/* <p>{t('app.tagline')}</p> */}
      </header>
      <MergeWorkspace
        files={files}
        warnings={warnings}
        error={error}
        report={report}
        downloadUrl={downloadUrl}
        config={config}
        onFiles={onFiles}
        onRemove={onRemove}
        onMerge={onMerge}
        onConfigChange={onConfigChange}
      />
      {joinModalOpen ? (
        <JoinMappingModalFeature
          files={joinHeaders}
          previousGroups={previousGroups}
          onCancel={onJoinCancel}
          onConfirm={onJoinConfirm}
        />
      ) : null}
    </div>
  );
}

export default App;
