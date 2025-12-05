import { Suspense } from 'react';
import { getFaqs } from '@/assets/lib/faq';
import AppMainIntro from '../components/index/AppMainIntro';
import AppMainSkills from '../components/index/AppMainSkills';
import AppMainContent from '../components/index/AppMainContent';
import HomeDocumentsClient from './_components/HomeDocumentsClient';
import { DocumentsSkeleton } from '@/components/common/SectionSkeleton';


export default async function Home() {
  const [faqs] = await Promise.all([getFaqs()]);

  return (
    <div className="main text-[#000] overflow-hidden relative leading-page">
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
    </div>
  );
}

