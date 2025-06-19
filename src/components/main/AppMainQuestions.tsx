import { useTranslation } from 'react-i18next';
import QuestionsBlock from './elements/QuestionsBlock';
import { useState } from 'react';
import '@/assets/styles/sections/main/animation/documents.scss'

interface questionItem {
  title: string;
  text: string;
}

const AppMainQuestions = () => {

  const { t } = useTranslation()

  const questions = t('MainQuestions.items', { returnObjects: true }) as questionItem[];


  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="section wrapper">
        <h2 className="section__title">
          {t('MainQuestions.title')}
        </h2>
        <div className="flex flex-col m:gap-[10px]">

          {questions.map((item, index) => (
            <QuestionsBlock
              number={index + 1}
              key={index}
              {...item}
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