'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import QuestionsBlock from './QuestionsBlock';
import { useState } from 'react';
import type { FaqItem } from '@/types/faq';
import stylesQuestions from '@/assets/styles/main.module.scss';
import textSize from '@/assets/styles/main.module.scss';
import { VirtualizedList } from '../utils/VirtualizedList';
import LinkButtonTitle from '../utils/ButtonTitle';

type AppMainQuestionsProps = {
  faqs: FaqItem[];
};

const SSR_FAQ_ITEMS_COUNT = 5;
const ESTIMATED_FAQ_ITEM_SIZE = 220;

const AppMainQuestions = ({ faqs }: AppMainQuestionsProps) => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ssrFaqs = faqs.slice(0, SSR_FAQ_ITEMS_COUNT);
  const virtualizedFaqs = faqs.slice(SSR_FAQ_ITEMS_COUNT);

  return (
    <section className="section wrapper">
      <div id="questions" className="absolute top-[-50px] pointer-events-none" />


      <div className="flex justify-between items-center">
        <h2 className={`${textSize.headerH2} section__title`}>
          {t('MainQuestions.title')}
        </h2>
        <LinkButtonTitle title="Читать подробнее" link="#" />
      </div>

      <div className={stylesQuestions['questions-container']}>
        {ssrFaqs.map((item, index) => {
          const globalIndex = index;

          return (
            <React.Fragment key={item.id}>
              {index === 0 && (
                <hr className="w-full h-[1px] bg-[#93969D] m-0" />
              )}
              <QuestionsBlock
                number={globalIndex + 1}
                title={item.heading}
                text={item.content}
                active={activeIndex === globalIndex}
                setActive={(value) => {
                  setActiveIndex(value ? globalIndex : null);
                }}
              />
              <hr className="w-full h-[1px] bg-[#93969D] m-0" />
            </React.Fragment>
          );
        })}

        {virtualizedFaqs.length > 0 && (
          <VirtualizedList<FaqItem>
            items={virtualizedFaqs}
            estimatedItemSize={ESTIMATED_FAQ_ITEM_SIZE}
            getItemKey={(item) => item.id}
            renderItem={(item, index) => {
              const globalIndex = SSR_FAQ_ITEMS_COUNT + index;

              return (
                <React.Fragment key={item.id}>
                  <QuestionsBlock
                    number={globalIndex + 1}
                    title={item.heading}
                    text={item.content}
                    active={activeIndex === globalIndex}
                    setActive={(value) => {
                      setActiveIndex(value ? globalIndex : null);
                    }}
                  />
                  <hr className="w-full h-[1px] bg-[#93969D] m-0" />
                </React.Fragment>
              );
            }}
          />
        )}
      </div>
    </section>
  );
};

export default AppMainQuestions;


