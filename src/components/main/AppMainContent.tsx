'use client';
import { FaqItem } from '@/store/faq';
import dynamic from 'next/dynamic';


export default function AppMainContent({ faqs }: { faqs: FaqItem[] }) {


  const AppMainSlider = dynamic(() => import('./AppMainSlider'), {
    ssr: false
  })
  const AppMainSafeguards = dynamic(() => import('./AppMainSafeguards'), {
    ssr: false
  })
  const AppMainFeedback = dynamic(() => import('./AppMainFeedback'), {
    ssr: false
  })
  const AppMainQuestions = dynamic(() => import('./AppMainQuestions'), {
    ssr: false
  })

  return (
    <>
      <AppMainSlider />
      <AppMainSafeguards />
      <AppMainFeedback />
      <AppMainQuestions faqs={faqs} />
    </>
  );
}

