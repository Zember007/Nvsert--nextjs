'use client'

import { useTranslation } from 'react-i18next';
import QuestionsBlock from './elements/QuestionsBlock';
import { useState } from 'react';
import type { FaqItem } from '@/store/faq';
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/main-questions.scss'

const AppMainQuestions = ({ faqs }: { faqs: FaqItem[] }) => {

  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
            <section className="section wrapper">
        <div id="questions" className="absolute top-[-50px] pointer-events-none" ></div>

        <h2 className="section__title">
          {t('MainQuestions.title')}
        </h2>
        <div className="questions-container">

          {faqs.map((item, index) => (
            <QuestionsBlock
              number={index + 1}
              key={item.id}
              title={item.heading}
              text={item.content}
              active={activeIndex === index}
              setActive={(value) => {
                if (value) {
                  setActiveIndex(index)
                } else {
                  setActiveIndex(null)
                }
              }}
            />
          ))}
        </div>
    </section>
  );
};

export default AppMainQuestions;