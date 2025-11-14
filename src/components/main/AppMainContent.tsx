'use client';

import dynamic from 'next/dynamic';


export default function AppMainContent() {
  const AppMainDocuments = dynamic(() => import('./AppMainDocuments'), {
    ssr: false,
    loading: () => <div className="section wrapper min-h-[400px]" />
  })
  const AppMainSkills = dynamic(() => import('./AppMainSkills'), {
    ssr: false,
    loading: () => <div className="section wrapper min-h-[400px]" />
  })
  const AppMainSlider = dynamic(() => import('./AppMainSlider'), {
    ssr: false,
    loading: () => <div className="section wrapper min-h-[400px]" />
  })
  const AppMainSafeguards = dynamic(() => import('./AppMainSafeguards'), {
    ssr: false,
    loading: () => <div className="section wrapper min-h-[400px]" />
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

