import dynamic from 'next/dynamic';
import AppMainIntro from '../components/main/AppMainIntro'

// Code splitting для оптимизации загрузки JS бандла
// SSR остается включенным для SEO - текстовый контент будет доступен поисковым роботам
const AppMainDocuments = dynamic(() => import('../components/main/AppMainDocuments'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
  // ssr: true по умолчанию - контент рендерится на сервере для SEO
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

const AppMainFeedback = dynamic(() => import('../components/main/AppMainFeedback'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

const AppMainQuestions = dynamic(() => import('../components/main/AppMainQuestions'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: true
})

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

