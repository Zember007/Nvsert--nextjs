'use client';

import { Suspense } from 'react';
import { FaqItem } from '@/types/faq';
import dynamic from 'next/dynamic';
import AppMainQuestions from '../AppMainQuestions';
import { 
  SliderSkeleton, 
  SafeguardsSkeleton, 
  FeedbackSkeleton 
} from '@/shared/common/SectionSkeleton';

// Ленивая загрузка тяжелых компонентов с приоритетами
const AppMainSlider = dynamic(() => import('../AppMainSlider'), {
  ssr: false,
  loading: () => <SliderSkeleton />,
});

const AppMainSafeguards = dynamic(() => import('../AppMainSafeguards'), {
  ssr: false,
  loading: () => <SafeguardsSkeleton />,
});

const AppMainFeedback = dynamic(() => import('../AppMainFeedback'), {
  ssr: false,
  loading: () => <FeedbackSkeleton />,
});

type AppMainContentProps = {
  faqs: FaqItem[];
};

const AppMainContent = ({ faqs }: AppMainContentProps) => {
  return (
    <>
      {/* Слайдер - отложенная загрузка */}
      <Suspense fallback={<SliderSkeleton />}>
        <AppMainSlider />
      </Suspense>
      
      {/* Гарантии - отложенная загрузка */}
      <Suspense fallback={<SafeguardsSkeleton />}>
        <AppMainSafeguards />
      </Suspense>
      
      {/* Отзывы - тяжелый контент, отложенная загрузка */}
      <Suspense fallback={<FeedbackSkeleton />}>
        <AppMainFeedback />
      </Suspense>
      
      {/* FAQ - легкий контент, загружается сразу */}
      <AppMainQuestions faqs={faqs} />
    </>
  );
};

export default AppMainContent;


