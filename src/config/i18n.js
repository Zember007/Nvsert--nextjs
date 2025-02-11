import NextI18Next from 'next-i18next';
import path from 'path';

const nextI18Next = new NextI18Next({
  defaultLanguage: 'ru',
  otherLanguages: [],
  localeSubpaths: {
    ru: 'ru',
  },
  localePath: path.resolve('../locales')
});

export default nextI18Next;

export const { appWithTranslation, withTranslation, i18n } = nextI18Next;