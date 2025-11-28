import '@/assets/styles/main.scss'
import { getFaqs } from '@/assets/lib/faq';
import AppMainIntro from '../components/index/AppMainIntro';
import AppMainSkills from '../components/index/AppMainSkills';
import AppMainContent from '../components/index/AppMainContent';
import HomeDocumentsClient from './_components/HomeDocumentsClient';

export default async function Home() {
  const [faqs] = await Promise.all([getFaqs()]);

  return (
    <div className="main text-[#000] overflow-hidden relative leading-page">
      <AppMainIntro />
      <HomeDocumentsClient />
      <AppMainSkills />
      <AppMainContent faqs={faqs} />
    </div>
  );
}

