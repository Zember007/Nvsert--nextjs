'use client'
import dynamic from 'next/dynamic';
import '@/assets/styles/main.scss'
import AppMainIntro from '../components/main/AppMainIntro'
import AppMainDocuments from '../components/main/AppMainDocuments'
import AppMainSkills from '../components/main/AppMainSkills'
import AppMainSlider from '../components/main/AppMainSlider'
import AppMainSafeguards from '../components/main/AppMainSafeguards'
import AppMainFeedback from '../components/main/AppMainFeedback'
import AppMainQuestions from '../components/main/AppMainQuestions'


export default function Home() {


  return (
    <div className="main text-[#000] overflow-hidden  relative leading-page">
       <AppMainIntro />

      <AppMainDocuments />

      <AppMainSkills />

      <AppMainSlider />

      <AppMainSafeguards />

      <AppMainFeedback />

      <AppMainQuestions />

    </div>
  );
}

