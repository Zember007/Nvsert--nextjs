import AppMainIntro from '../components/main/AppMainIntro.js';
// import AppMainAbout from '../components/main/AppMainAbout.vue';
// import AppMainQuestions from '../components/main/AppMainQuestions.vue';
// import AppMainGallery from '../components/main/AppMainGallery.vue';
import '@/assets/styles/main.scss'

export default function Home() {
  return (
    <main className="main">
       <AppMainIntro />

      {/*<AppMainAbout />

      <AppMainQuestions />

      <AppMainGallery /> */}
    </main>
  );
}

