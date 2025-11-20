import dynamic from 'next/dynamic';
import { getFaqs } from '@/assets/lib/faq';
import AppMainContent from '../components/main/AppMainContent';

// Критический контент выше fold - загружаем с SSR для SEO
const AppMainIntro = dynamic(() => import('../components/main/AppMainIntro'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

/* const AppMainDocuments = dynamic(() => import('../components/main/AppMainDocuments'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
}) */

const AppMainSkills = dynamic(() => import('../components/main/AppMainSkills'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

export default async function Home() {

  const [faqs] = await Promise.all([
    getFaqs()
  ]);

  return (
    <div className="main text-[#000] overflow-hidden  relative leading-page">
      <AppMainIntro />

     {/*  <AppMainDocuments /> */}
      <AppMainSkills />
      <AppMainContent faqs={faqs} />


    </div>
  );
}

