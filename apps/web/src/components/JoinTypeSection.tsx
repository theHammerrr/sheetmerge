import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  joinType: 'inner' | 'left' | 'right' | 'full';
  onJoinTypeChange: (value: string) => void;
};

const JoinTypeSection: FC<Props> = ({ joinType, onJoinTypeChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <label>
        {t('config.joinType')}
        <select value={joinType} onChange={(event) => onJoinTypeChange(event.currentTarget.value)}>
          <option value="inner">{t('config.joinOptions.inner')}</option>
          <option value="left">{t('config.joinOptions.left')}</option>
          <option value="right">{t('config.joinOptions.right')}</option>
          <option value="full">{t('config.joinOptions.full')}</option>
        </select>
        <span className="hint">{t('config.joinDescription')}</span>
      </label>
      <p className="hint">{t(`config.joinHelp.${joinType}`)}</p>
    </>
  );
};

export default JoinTypeSection;
