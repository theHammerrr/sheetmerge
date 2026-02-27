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
        {/* {t('config.mode')} */}
        <span>{t('config.modeDescription')}</span>
        <select value={mode} onChange={(event) => onModeChange(event.currentTarget.value)}>
          <option value="append">{t('config.modeOptions.append')}</option>
          <option value="union">{t('config.modeOptions.union')}</option>
          <option value="join">{t('config.modeOptions.join')}</option>
        </select>
        {mode === 'append' ? <span className="hint">{t('config.modeHelp.append')}</span> : null}
        {mode === 'union' ? <span className="hint">{t('config.modeHelp.union')}</span> : null}
        {mode === 'join' ? (
          <>
            <span className="hint">{t('config.modeHelp.join')}</span>
            <span className="hint">{t('config.joinHint')}</span>
          </>
        ) : null}
      </label>
    </>
  );
};

export default ModeSection;
