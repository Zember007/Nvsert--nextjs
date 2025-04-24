'use client'
import dynamic from 'next/dynamic';

import '@/assets/styles/main.scss'
import LazyLoadSection from '@/hook/LazyLoadSection';

import AppMainIntro from '../components/main/AppMainIntro'
import AppMainDocuments from '../components/main/AppMainDocuments'
import { useEffect } from 'react';
import { useHeaderContext } from '@/components/contexts/HeaderContext';

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
    <div className="main text-[#000] overflow-hidden select-none">
      <AppMainIntro />
      <AppMainDocuments /> 
      {/* <LazyLoadSection component={DynamicAppMainSkills} />
      <LazyLoadSection component={DynamicAppMainSlider} />
      <LazyLoadSection component={DynamicAppMainSafeguards} />
      <LazyLoadSection component={DynamicAppMainFeedback} /> */}
      <DynamicAppMainSkills />
      <DynamicAppMainSlider />
      <DynamicAppMainSafeguards />
      <DynamicAppMainFeedback />
    </div>
  );
}

