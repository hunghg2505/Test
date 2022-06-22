import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from 'assets/locale/en/en';

i18n
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...en,
        },
      },
    },
    react: {
      useSuspense: false,
    },
    backend: {
      allowMultiLoading: false,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
