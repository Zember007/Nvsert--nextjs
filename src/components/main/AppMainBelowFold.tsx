'use client';

import dynamic from 'next/dynamic';

// Компоненты ниже fold - отключаем SSR для улучшения FCP и LCP
// Они загружаются после интерактивности страницы
const AppMainFeedback = dynamic(() => import('./AppMainFeedback'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: false
})

const AppMainQuestions = dynamic(() => import('./AppMainQuestions'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: false
})

interface AppMainBelowFoldProps {
  faqs: any;
}

export default function AppMainBelowFold({ faqs }: AppMainBelowFoldProps) {
  return (
    <>
      <AppMainFeedback />
      <AppMainQuestions faqs={faqs} />
    </>
  );
}

