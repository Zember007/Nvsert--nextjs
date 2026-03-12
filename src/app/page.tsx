import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getFaqs } from 'entities/faq';
import AppMainIntro from 'widgets/home/AppMainIntro';
import BelowFoldClient from './_components/BelowFoldClient';
import { FeedbackSkeleton, SliderSkeleton } from 'shared/common/SectionSkeleton';
import type { SupportedLocale } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';

async function DeferredHomeContent({ locale }: { locale: SupportedLocale }) {
  const faqs = await getFaqs(locale);
  const { default: AppMainContent } = await import('widgets/home/AppMainContent');
  return <AppMainContent faqs={faqs} />;
}

export default async function Home() {
  const locale = await getRequestLocale();

  return (
    <div className="main text-[#000] overflow-hidden relative leading-page">
      {/* LCP: секция и h1 рендерятся на сервере без ожидания JS */}
      <AppMainIntro locale={locale} />

      <BelowFoldClient />

      {/* Остальной контент + FAQ загружаются после первого экрана */}
      <Suspense
        fallback={
          <>
            <SliderSkeleton />
            <FeedbackSkeleton />
          </>
        }
      >
        <DeferredHomeContent locale={locale} />
      </Suspense>
    </div>
  );
}
