import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import JoinTypeSection from '../JoinTypeSection';
import ModeSection from '../ModeSection';
import './ConfigPanel.css';
type MergeConfig = {
  mode: 'append' | 'union' | 'join';
  keys: string;
  joinType: 'inner' | 'left' | 'right' | 'full';
  includeSource: boolean;
  headerRow: number;
  dataStartRow: number;
};
type Props = {
  config: MergeConfig;
  onChange: (config: MergeConfig) => void;
  onMerge: () => void;
};
const ConfigPanel: FC<Props> = ({ config, onChange, onMerge }) => {
  const { t } = useTranslation();
  const update = (partial: Partial<MergeConfig>) => {
    onChange({ ...config, ...partial });
  };
  const setMode = (value: string) => {
    if (value === 'append' || value === 'union' || value === 'join') {
      update({ mode: value });
    }
  };

  const setJoinType = (value: string) => {
    if (value === 'inner' || value === 'left' || value === 'right' || value === 'full') {
      update({ joinType: value });
    }
  };

  return (
    <div className="config">
      <h2>{t('config.title')}</h2>
      <ModeSection mode={config.mode} onModeChange={setMode} />
      {config.mode === 'union' ? (
        <label>
          {t('config.keys')}
          <input
            value={config.keys}
            onChange={(event) => update({ keys: event.currentTarget.value })}
            placeholder={t('config.keysPlaceholder')}
          />
        </label>
      ) : null}
      {config.mode === 'join' ? <p className="hint">{t('config.joinHint')}</p> : null}
      {config.mode === 'join' ? (
        <JoinTypeSection joinType={config.joinType} onJoinTypeChange={setJoinType} />
      ) : null}
      <label>
        {t('config.headerRow')}
        <input
          type="number"
          min={1}
          value={config.headerRow}
          onChange={(event) => update({ headerRow: Number(event.currentTarget.value) })}
        />
      </label>
      <label>
        {t('config.dataStartRow')}
        <input
          type="number"
          min={2}
          value={config.dataStartRow}
          onChange={(event) => update({ dataStartRow: Number(event.currentTarget.value) })}
        />
      </label>
      <label className="inline">
        <input
          type="checkbox"
          checked={config.includeSource}
          onChange={(event) => update({ includeSource: event.currentTarget.checked })}
        />
        {t('config.includeSource')}
      </label>
      <button type="button" onClick={onMerge} className="cta">
        {t('config.mergeNow')}
      </button>
    </div>
  );
};

export default ConfigPanel;
