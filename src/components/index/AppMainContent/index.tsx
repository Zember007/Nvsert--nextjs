'use client';

import { FaqItem } from '@/store/faq';
import dynamic from 'next/dynamic';
import AppMainQuestions from '../AppMainQuestions';

const AppMainSlider = dynamic(() => import('../AppMainSlider'), {
  ssr: false,
});

const AppMainSafeguards = dynamic(() => import('../AppMainSafeguards'), {
  ssr: false,
});

const AppMainFeedback = dynamic(() => import('../AppMainFeedback'), {
  ssr: false,
});

type AppMainContentProps = {
  faqs: FaqItem[];
};

const AppMainContent = ({ faqs }: AppMainContentProps) => {
  return (
    <>
      <AppMainSlider />
      <AppMainSafeguards />
      <AppMainFeedback />
      <AppMainQuestions faqs={faqs} />
    </>
  );
};

export default AppMainContent;


