import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru  from '@/locales/ru.json'

const resources = {
  ru: {
    translation: ru 
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'ru', 
    fallbackLng: 'ru', 
    interpolation: {
      escapeValue: false 
    },
    // Оптимизация для производительности
    react: {
      useSuspense: false, // Отключаем Suspense для уменьшения TBT
    },
    // Снижаем потребление памяти
    compatibilityJSON: 'v4',
    // Кэширование
    load: 'currentOnly',
  });

export default i18n;