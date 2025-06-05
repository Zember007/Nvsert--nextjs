'use client'
import dynamic from 'next/dynamic';

import '@/assets/styles/main.scss'

import AppMainIntro from '../components/main/AppMainIntro'
import AppMainDocuments from '../components/main/AppMainDocuments'
import LazyLoadSection from '@/hook/LazyLoadSection';


import ArrowImg from '@/assets/images/svg/arrow-small.svg'
import Image from 'next/image';
import { filterPrepositions } from '@/hook/filter';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Home() {

  const DynamicAppMainSkills = dynamic(() => import('../components/main/AppMainSkills'), {
    ssr: false,
  });

  const DynamicAppMainSlider = dynamic(() => import('../components/main/AppMainSlider'), {
    ssr: false,
  });

  const DynamicAppMainSafeguards = dynamic(() => import('../components/main/AppMainSafeguards'), {
    ssr: false,
  });

  const DynamicAppMainFeedback = dynamic(() => import('../components/main/AppMainFeedback'), {
    ssr: false,
  });


  const DynamicAppMainQuestions = dynamic(() => import('../components/main/AppMainQuestions'), {
    ssr: false,
  });

  const { t } = useTranslation()



  return (
    <div className="main text-[#000] overflow-hidden select-none ">
      <AppMainIntro />
      <AppMainDocuments />
      <section
        className="py-[75px] relative">
        <div className="wrapper flex flex-col gap-[40px]">
          <h2 className="leading-[1] tracking-[-0.04em] text-center  text-[24px] xs:text-[40px] l:text-[56px]">Наши основные преимущества</h2>
          <div className="flex flex-col">
            <LazyLoadSection component={
              DynamicAppMainSkills
            } />
            <h4 className='text-[18px] leading-[1.5] mt-[40px]'>
              {filterPrepositions('Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов и других документов, подтверждающих качество выпускаемой продукции.')}
            </h4>
            <Link
              href={'/about'}
              className='flex items-center gap-[8px] mt-[28px]'
            >
              <span className='text-[20px] font-bold'>Подробнее о компании</span>
              <Image src={ArrowImg} alt='arrow' width={24} height={24} />
            </Link>
          </div>
        </div>
      </section >
      <section className='py-[75px] text-[#000] relative'>
        <div className="wrapper flex flex-col gap-[40px]">

          <h2 className='leading-[1] tracking-[-0.04em] text-center text-[24px] xs:text-[40px] l:text-[56px]'>Помогаем с документами по отраслям</h2>
          <LazyLoadSection component={
            DynamicAppMainSlider
          } />

        </div>
      </section>
      <section
        className="py-[75px] relative">
        <div className="wrapper flex flex-col gap-[50px]">
          <h2 className="leading-[1] tracking-[-0.04em] text-center  text-[24px] xs:text-[40px] l:text-[56px]">Гарантии и безупречный сервис</h2>
          <LazyLoadSection component={
            DynamicAppMainSafeguards
          } />
        </div>
      </section >
      <section className="py-[75px]">

        <div className="wrapper flex flex-col gap-[40px]">
          <h2 className="leading-[1] tracking-[-0.04em] text-center text-[24px] xs:text-[40px] l:text-[56px]">{t('MainFeedback.title')}</h2>

          <LazyLoadSection component={
            DynamicAppMainFeedback
          } />
        </div>
      </section>
      <section className="py-[75px]">
        <div className="wrapper flex flex-col gap-[40px]">
          <h2 className="leading-[1] tracking-[-0.04em] text-center text-[24px] xs:text-[40px] l:text-[56px]">
            {t('MainQuestions.title')}
          </h2>
          <LazyLoadSection component={
            DynamicAppMainQuestions
          } />

        </div>
      </section>

    </div>
  );
}

