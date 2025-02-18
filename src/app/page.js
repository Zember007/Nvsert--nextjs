'use client'
import { useEffect } from 'react';
import AppMainIntro from '../components/main/AppMainIntro.js';
// import AppMainAbout from '../components/main/AppMainAbout.vue';
// import AppMainQuestions from '../components/main/AppMainQuestions.vue';
// import AppMainGallery from '../components/main/AppMainGallery.vue';
import '@/assets/styles/main.scss'

export default function Home() {

  useEffect(() => {
    document.body.className = 'transparent-header bg-secondary';
    return () => {
      document.body.className = ''; 
    };
  }, []);
  return (
    <main className="main">
       <AppMainIntro />

      {/*<AppMainAbout />

      <AppMainQuestions />

      <AppMainGallery /> */}
    </main>
  );
}

