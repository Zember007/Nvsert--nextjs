'use client'
import { useEffect } from 'react';
import AppMainIntro from '../components/main/AppMainIntro';
import AppMainSlider from '@/components/main/AppMainSlider';
import AppMainSafeguards from '@/components/main/AppMainSafeguards';
import AppMainDocuments from '../components/main/AppMainDocuments';
import AppMainQuestions from '../components/main/AppMainQuestions';
import AppMainSkills from '../components/main/AppMainSkills';

import '@/assets/styles/main.scss'
import AppMainFeedback from '@/components/main/AppMainFeedback';

export default function Home() {

  return (
    <div className="main text-[#000] overflow-hidden select-none">
      <AppMainIntro />

      <AppMainDocuments />

      <AppMainSkills />

      <AppMainSlider />

      <AppMainSafeguards />

      {/* <AppMainQuestions /> */}

      <AppMainFeedback />
    </div>
  );
}

