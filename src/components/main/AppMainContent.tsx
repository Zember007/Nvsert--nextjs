'use client';
import { FaqItem } from '@/store/faq';
import dynamic from 'next/dynamic';

// Dynamic imports должны быть вне компонента для правильной работы и оптимизации
const AppMainSlider = dynamic(() => import('./AppMainSlider'), {
  ssr: false
});

const AppMainSafeguards = dynamic(() => import('./AppMainSafeguards'), {
  ssr: false
});

const AppMainFeedback = dynamic(() => import('./AppMainFeedback'), {
  ssr: false
});

const AppMainQuestions = dynamic(() => import('./AppMainQuestions'), {
  ssr: false
});

export default function AppMainContent({ faqs }: { faqs: FaqItem[] }) {
  return (
    <>
      <AppMainSlider />
      <AppMainSafeguards />
      <AppMainFeedback />
      <AppMainQuestions faqs={faqs} />
    </>
  );
}

