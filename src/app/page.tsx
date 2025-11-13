import dynamic from 'next/dynamic';
import { getFaqs } from '@/assets/lib/faq';
import AppMainBelowFold from '../components/main/AppMainBelowFold';
import AppMainContent from '../components/main/AppMainContent';

// Критический контент выше fold - загружаем с SSR для SEO
const AppMainIntro = dynamic(() => import('../components/main/AppMainIntro'), {
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

      <AppMainContent />

      <AppMainBelowFold faqs={faqs} />

    </div>
  );
}

