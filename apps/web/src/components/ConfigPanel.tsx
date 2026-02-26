import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
      <label>
        {t('config.mode')}
        <select value={config.mode} onChange={(event) => setMode(event.currentTarget.value)}>
          <option value="append">{t('config.modeOptions.append')}</option>
          <option value="union">{t('config.modeOptions.union')}</option>
          <option value="join">{t('config.modeOptions.join')}</option>
        </select>
      </label>
      {config.mode !== 'append' ? (
        <label>
          {t('config.keys')}
          <input
            value={config.keys}
            onChange={(event) => update({ keys: event.currentTarget.value })}
            placeholder={t('config.keysPlaceholder')}
          />
        </label>
      ) : null}
      {config.mode === 'join' ? (
        <label>
          {t('config.joinType')}
          <select value={config.joinType} onChange={(event) => setJoinType(event.currentTarget.value)}>
            <option value="inner">{t('config.joinOptions.inner')}</option>
            <option value="left">{t('config.joinOptions.left')}</option>
            <option value="right">{t('config.joinOptions.right')}</option>
            <option value="full">{t('config.joinOptions.full')}</option>
          </select>
        </label>
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
