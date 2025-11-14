'use client';

import dynamic from 'next/dynamic';


export default function AppMainContent() {
  const AppMainDocuments = dynamic(() => import('./AppMainDocuments'), {
    ssr: false
  })
  const AppMainSkills = dynamic(() => import('./AppMainSkills'), {
    ssr: false
  })
  const AppMainSlider = dynamic(() => import('./AppMainSlider'), {
    ssr: false
  })
  const AppMainSafeguards = dynamic(() => import('./AppMainSafeguards'), {
    ssr: false
  })
  return (
    <>
    
      <AppMainDocuments />
      <AppMainSkills />
      <AppMainSlider />
      <AppMainSafeguards />
    </>
  );
}

