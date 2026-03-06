import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getFaqs } from 'entities/faq';
import { AppMainContent, AppMainIntro } from 'widgets/home';
import { DocumentsSkeleton, FeedbackSkeleton, SliderSkeleton } from 'shared/common/SectionSkeleton';
import type { SupportedLocale } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';

const HomeDocumentsClient = dynamic(() => import('./_components/HomeDocumentsClient'), {
  loading: () => <DocumentsSkeleton />,
});

const AppMainSkills = dynamic(() => import('widgets/home/AppMainSkills'), {
  loading: () => (
    <section className="section wrapper">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
      <div className="h-[420px] bg-gray-100 rounded" />
    </section>
  ),
});

async function DeferredHomeContent({ locale }: { locale: SupportedLocale }) {
  const faqs = await getFaqs(locale);
  return <AppMainContent faqs={faqs} />;
}

export default async function Home() {
  const locale = await getRequestLocale();

  return (
    <div className="main text-[#000] overflow-hidden relative leading-page">
      {/* LCP: секция и h1 рендерятся на сервере без ожидания JS */}
      <AppMainIntro locale={locale} />

      {/* Документы - ленивая загрузка */}
      <Suspense fallback={<DocumentsSkeleton />}>
        <HomeDocumentsClient />
      </Suspense>

      {/* Навыки - важный контент */}
      <Suspense
        fallback={
          <section className="section wrapper">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
            <div className="h-[420px] bg-gray-100 rounded" />
          </section>
        }
      >
        <AppMainSkills />
      </Suspense>

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
