import dynamic from 'next/dynamic';
import { getFaqs } from '@/assets/lib/faq';
import AppMainBelowFold from '../components/main/AppMainBelowFold';

// Критический контент выше fold - загружаем с SSR для SEO
const AppMainIntro = dynamic(() => import('../components/main/AppMainIntro'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

const AppMainDocuments = dynamic(() => import('../components/main/AppMainDocuments'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

const AppMainSkills = dynamic(() => import('../components/main/AppMainSkills'), {
  loading: () => <div className="section min-h-[400px]" />,
  ssr: true
})

const AppMainSlider = dynamic(() => import('../components/main/AppMainSlider'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

const AppMainSafeguards = dynamic(() => import('../components/main/AppMainSafeguards'), {
  loading: () => <div className="section min-h-[400px]" />,
  ssr: true
})

export default async function Home() {

  const [faqs] = await Promise.all([
    getFaqs()
  ]);

  return (
    <div className="main text-[#000] overflow-hidden  relative leading-page">
      <AppMainIntro />

{/*       <AppMainDocuments />

      <AppMainSkills />

      <AppMainSlider />

      <AppMainSafeguards />

      <AppMainBelowFold faqs={faqs} /> */}

    </div>
  );
}

