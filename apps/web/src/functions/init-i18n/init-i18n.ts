import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../../locales/en/translation.json';

export function initI18n(): void {
  if (i18n.isInitialized) {
    return;
  }

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en } },
      fallbackLng: 'en',
      supportedLngs: ['en'],
      interpolation: { escapeValue: false },
      returnEmptyString: false,
      returnNull: false,
    });
}
