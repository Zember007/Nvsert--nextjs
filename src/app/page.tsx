'use client'
import dynamic from 'next/dynamic';

import '@/assets/styles/main.scss'

import AppMainIntro from '../components/main/AppMainFeedback'
import AppMainDocuments from '../components/main/AppMainDocuments'
import AppMainQuestions from '../components/main/AppMainQuestions'

export default function Home() {

  const DynamicAppMainSkills = dynamic(() => import('../components/main/AppMainSkills'), {
    ssr: false,
  });

  const DynamicAppMainSlider = dynamic(() => import('../components/main/AppMainSlider'), {
    ssr: false,
  });

  const DynamicAppMainSafeguards = dynamic(() => import('../components/main/AppMainSafeguards'), {
    ssr: false,
  });

  const DynamicAppMainFeedback = dynamic(() => import('../components/main/AppMainFeedback'), {
    ssr: false,
  });



  return (
    <div className="main text-[#000] overflow-hidden select-none ">
      <AppMainIntro />
      {/* <AppMainDocuments />
      <DynamicAppMainSkills />
      <DynamicAppMainSlider />
      <DynamicAppMainSafeguards />
      <DynamicAppMainFeedback />
      <AppMainQuestions /> */}
    </div>
  );
}

