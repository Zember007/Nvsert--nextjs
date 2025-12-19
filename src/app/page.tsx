import { Suspense } from 'react';
import { getFaqs } from 'entities/faq';
import { AppMainContent, AppMainIntro, AppMainSkills } from 'widgets/home';
import HomeDocumentsClient from './_components/HomeDocumentsClient';
import { DocumentsSkeleton } from 'shared/common/SectionSkeleton';

export default async function Home() {
  const [faqs] = await Promise.all([getFaqs()]);

  return (
    <main className="main text-[#000] overflow-hidden relative leading-page">
      {/* Критический контент - рендерится сразу */}
      <AppMainIntro />

      {/* Документы - ленивая загрузка */}
      <Suspense fallback={<DocumentsSkeleton />}>
        <HomeDocumentsClient />
      </Suspense>

      {/* Навыки - важный контент */}
      <AppMainSkills />

      {/* Остальной контент - ленивая загрузка */}
      <AppMainContent faqs={faqs} />
    </main>
  );
}
