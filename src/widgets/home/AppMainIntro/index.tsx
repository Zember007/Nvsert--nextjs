import type { SupportedLocale } from 'shared/config/env';
import stylesMainBanner from '@/assets/styles/main.module.scss';
import { HeroTitle } from './HeroTitle';
import AppMainIntroClient from './AppMainIntroClient';

/**
 * Серверный компонент: секция и LCP-заголовок (h1) рендерятся в HTML сразу,
 * без ожидания JS — улучшает FCP/LCP. Интерактивная часть — в AppMainIntroClient.
 */
export default function AppMainIntro({ locale }: { locale: SupportedLocale }) {
  return (
    <section id="intro" className={stylesMainBanner.mainBanner}>
      <div className="wrapper">
        <div className={stylesMainBanner.mainBannerContent}>
          <HeroTitle locale={locale} />
          <AppMainIntroClient />
        </div>
      </div>
    </section>
  );
}
