'use client';

import { useTranslation } from 'react-i18next';
import QuestionsBlock from './QuestionsBlock';
import { useState } from 'react';
import type { FaqItem } from '@/store/faq';
import '@/assets/styles/sections/main/animation/documents.scss';
import stylesQuestions from '@/assets/styles/main.module.scss';
import textSize from '@/assets/styles/main.module.scss';

type AppMainQuestionsProps = {
  faqs: FaqItem[];
};

const AppMainQuestions = ({ faqs }: AppMainQuestionsProps) => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section wrapper">
      <div id="questions" className="absolute top-[-50px] pointer-events-none" />

      <h2 className={`${textSize.headerH2} section__title`}>
        {t('MainQuestions.title')}
      </h2>

      <div className={stylesQuestions['questions-container']}>
        {faqs.map((item, index) => (
          <QuestionsBlock
            number={index + 1}
            key={item.id}
            title={item.heading}
            text={item.content}
            active={activeIndex === index}
            setActive={(value) => {
              setActiveIndex(value ? index : null);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default AppMainQuestions;


