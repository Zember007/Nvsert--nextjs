'use client'
import { useEffect } from 'react';
import AppMainIntro from '../components/main/AppMainIntro';
import AppMainSlider from '@/components/main/AppMainSlider';
import AppMainDocuments from '../components/main/AppMainDocuments';
import AppMainQuestions from '../components/main/AppMainQuestions';
import AppMainSkills from '../components/main/AppMainSkills';

import '@/assets/styles/main.scss'
import AppMainFeedback from '@/components/main/AppMainFeedback';

export default function Home() {

  useEffect(() => {

    document.body.className = 'transparent-header bg-secondary';

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;


    return () => {
      document.body.className = '';
    }

  }, []);
  return (
    <div className="main text-[#000]">
      <AppMainIntro />

      <AppMainDocuments />

      <AppMainSkills />

      <AppMainSlider />

      <AppMainQuestions />

      <AppMainFeedback />
    </div>
  );
}

