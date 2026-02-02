'use client'

import { useTranslation } from 'react-i18next';
import AppMainForm from '../../forms/AppMainForm';
import { filterPrepositions } from 'shared/lib';
import { useAnimation, motion } from 'framer-motion';
import stylesMainBanner from '@/assets/styles/main.module.scss';
import { Button } from 'shared/ui';
import { useHeaderContext } from 'shared/contexts/contexts/HeaderContext';

const AppMainIntro = () => {
  const { t } = useTranslation();
  const { openDefaultModal } = useHeaderContext();


  return (
    <section id="intro" className={stylesMainBanner.mainBanner}>
      <div className="wrapper">
        <div className={stylesMainBanner.mainBannerContent}>
          <h1 className={`${stylesMainBanner.mainBannerTitle}`}>
            {filterPrepositions(t('mainIntro.title'))}
          </h1>
          <div className="flex justify-between gap-[20px] items-center">
            <div className="flex flex-col gap-[80px]">
              <AppMainIntroBadge title="15+" description="Лет на рынке сертификации" side="left" />
              <AppMainIntroBadge title="75+" description="Опытных экспертов в команде" side="left" />
            </div>
            <div className="h-[400px]"></div>
            <div className="flex flex-col gap-[80px]">
              <AppMainIntroBadge title="99%" description="Заказов выполняем раньше срока" side="right" />
              <AppMainIntroBadge title="10 000+" description="Компаний доверяют нам работу" side="right" />
            </div>
          </div>

          <Button
            wrapperClassName="mx-auto"
            onClick={() => {
              openDefaultModal('orderForm');
            }}
            label={t('form.buttons.submitApplication')}
          />
        </div>
      </div>
    </section>
  );
};

const AppMainIntroBadge = ({ title, description, side }: { title: string, description: string, side: 'left' | 'right' }) => {
  return (
    <div className={`flex flex-col gap-[20px] ${side === 'left' ? 'pl-[10px] border-l border-l-[#34446D]' : 'pr-[10px] border-r border-r-[#34446D] text-right'} text-[#34446D] font-light`}>
      <span className="text-[40px] -my-[2%]">{title}</span>
      <span className="text-[16px] max-w-[170px] -my-[2%]">{description}</span>
    </div>
  )
}

export default AppMainIntro;


