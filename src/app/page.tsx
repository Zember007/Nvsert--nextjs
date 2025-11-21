import dynamic from 'next/dynamic';
import { getFaqs } from '@/assets/lib/faq';
import AppMainIntro from '../components/main/AppMainIntro';
import AppMainDocuments from '../components/main/AppMainDocuments';
import AppMainSkills from '../components/main/AppMainSkills';
import AppMainContent from '../components/main/AppMainContent';



export default async function Home() {

  const [faqs] = await Promise.all([
    getFaqs()
  ]);

  return (
    <div className="main text-[#000] overflow-hidden  relative leading-page">
      <AppMainIntro />
      <AppMainDocuments />
      <AppMainSkills />
      <AppMainContent faqs={faqs} />
    </div>
  );
}

