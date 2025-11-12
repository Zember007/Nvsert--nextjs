import dynamic from 'next/dynamic';
import AppMainIntro from '../components/main/AppMainIntro'
import InViewLazy from '../components/common/InViewLazy'

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
  ssr: false
})

const AppMainSafeguards = dynamic(() => import('../components/main/AppMainSafeguards'), {
  loading: () => <div className="section min-h-[400px]" />,
  ssr: false
})

const AppMainFeedback = dynamic(() => import('../components/main/AppMainFeedback'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: false
})

const AppMainQuestions = dynamic(() => import('../components/main/AppMainQuestions'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: false
})

// Включаем ISR для главной страницы
export const revalidate = 60;

export default function Home() {


  return (
    <div className="main text-[#000] overflow-hidden  relative leading-page">
       <AppMainIntro />

      <AppMainDocuments />

      <AppMainSkills />

      <InViewLazy placeholder={<div className="section wrapper min-h-[400px]" />}>
        <AppMainSlider />
      </InViewLazy>

      <InViewLazy placeholder={<div className="section min-h-[400px]" />}>
        <AppMainSafeguards />
      </InViewLazy>

      <InViewLazy placeholder={<div className="section wrapper min-h-[400px]" />}>
        <AppMainFeedback />
      </InViewLazy>

      <InViewLazy placeholder={<div className="section wrapper min-h-[400px]" />}>
        <AppMainQuestions />
      </InViewLazy>

    </div>
  );
}

