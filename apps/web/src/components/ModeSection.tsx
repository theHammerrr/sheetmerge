import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  mode: 'append' | 'union' | 'join';
  onModeChange: (value: string) => void;
};

const ModeSection: FC<Props> = ({ mode, onModeChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <label>
        {t('config.mode')}
        <span className="hint">{t('config.modeDescription')}</span>
        <select value={mode} onChange={(event) => onModeChange(event.currentTarget.value)}>
          <option value="append">{t('config.modeOptions.append')}</option>
          <option value="union">{t('config.modeOptions.union')}</option>
          <option value="join">{t('config.modeOptions.join')}</option>
        </select>
      </label>
      {mode === 'append' ? <p className="hint">{t('config.modeHelp.append')}</p> : null}
      {mode === 'union' ? <p className="hint">{t('config.modeHelp.union')}</p> : null}
      {mode === 'join' ? <p className="hint">{t('config.modeHelp.join')}</p> : null}
    </>
  );
};

export default ModeSection;
