'use client'

import dynamic from 'next/dynamic';
import InViewLazy from '@/components/common/InViewLazy';

// Компоненты ниже fold - отключаем SSR для улучшения TBT и Speed Index
// Они загружаются после интерактивности страницы
const AppMainDocuments = dynamic(() => import('./AppMainDocuments'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: false
})

const AppMainSkills = dynamic(() => import('./AppMainSkills'), {
  loading: () => <div className="section min-h-[400px]" />,
  ssr: false
})

const AppMainSlider = dynamic(() => import('./AppMainSlider'), {
  loading: () => <div className="section wrapper min-h-[400px]" />,
  ssr: false
})

const AppMainSafeguards = dynamic(() => import('./AppMainSafeguards'), {
  loading: () => <div className="section min-h-[400px]" />,
  ssr: false
})

export default function AppMainContent() {
  return (
    <>
      {/* Компоненты ниже fold загружаются только при приближении к viewport */}
      <InViewLazy placeholder={<div className="section wrapper min-h-[400px]" />}>
        <AppMainDocuments />
      </InViewLazy>

      <InViewLazy placeholder={<div className="section min-h-[400px]" />}>
        <AppMainSkills />
      </InViewLazy>

      <InViewLazy placeholder={<div className="section wrapper min-h-[400px]" />}>
        <AppMainSlider />
      </InViewLazy>

      <InViewLazy placeholder={<div className="section min-h-[400px]" />}>
        <AppMainSafeguards />
      </InViewLazy>
    </>
  );
}

