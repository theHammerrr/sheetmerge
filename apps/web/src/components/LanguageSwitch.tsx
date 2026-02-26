import type { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch: FC = () => {
  const { i18n, t } = useTranslation();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <label className="language">
      <span>{t('language.label')}</span>
      <select value={i18n.language} onChange={onChange}>
        <option value="en">{t('language.en')}</option>
      </select>
    </label>
  );
};

export default LanguageSwitch;
