import { filterPrepositions } from 'shared/lib';
import { tStatic } from 'shared/i18n/static';
import type { SupportedLocale } from 'shared/config/env';
import stylesMainBanner from '@/assets/styles/main.module.scss';

export function HeroTitle({ locale }: { locale: SupportedLocale }) {
  const title = filterPrepositions(tStatic(locale, 'mainIntro.title'));
  return <h1 className={stylesMainBanner.mainBannerTitle}>{title}</h1>;
}
