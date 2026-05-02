import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from './en/translation.json';
import Hindi from './hi/translation.json';
import { getLanguage } from '@/utils/helper.utils';

const combinedLang = {
  en: { translation: English },
  hi: { translation: Hindi },
};

const initI18n = async () => {
  const language = await getLanguage();

  i18n.use(initReactI18next).init({
    resources: combinedLang,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
