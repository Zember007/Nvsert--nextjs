'use client'
import dynamic from 'next/dynamic';
import '@/assets/styles/main.scss'
import AppMainIntro from '../components/main/AppMainIntro'
import AppMainDocuments from '../components/main/AppMainDocuments'



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


  const DynamicAppMainQuestions = dynamic(() => import('../components/main/AppMainQuestions'), {
    ssr: false,
  });


  return (
    <div className="main text-[#000] overflow-hidden  relative leading-page">
       <AppMainIntro />

      <AppMainDocuments />

      <DynamicAppMainSkills />

      <DynamicAppMainSlider />

      <DynamicAppMainSafeguards />

      <DynamicAppMainFeedback />

      <DynamicAppMainQuestions />

    </div>
  );
}

