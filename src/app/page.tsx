import { Suspense } from 'react';
import { getFaqs } from 'entities/faq';
import AppMainIntro from 'widgets/home/AppMainIntro';
import BelowFoldClient from './_components/BelowFoldClient';
import { DEFAULT_LOCALE, type SupportedLocale } from 'shared/config/env';

async function DeferredHomeContent({ locale }: { locale: SupportedLocale }) {
  const faqs = await getFaqs(locale);
  const { default: AppMainContent } = await import('widgets/home/AppMainContent');
  return <AppMainContent faqs={faqs} />;
}


export async function HomePage({ locale }: { locale: SupportedLocale }) {
  return (
    <div className="main text-[#000] overflow-hidden relative leading-page">
      {/* LCP: секция и h1 рендерятся на сервере без ожидания JS */}
      <AppMainIntro locale={locale} />

      <BelowFoldClient />

      {/* Остальной контент + FAQ загружаются после первого экрана */}
      <Suspense fallback={null}>
        <DeferredHomeContent locale={locale} />
      </Suspense>
    </div>
  );
}

export default async function Home() {
  return <HomePage locale={DEFAULT_LOCALE} />;
}
