import { useTranslation } from 'react-i18next';
import QuestionsBlock from './elements/QuestionsBlock';
import { useState } from 'react';

interface questionItem {
  title: string;
  text: string;
}

const AppMainQuestions = () => {

  const { t } = useTranslation()

  const questions = t('MainQuestions.items', { returnObjects: true }) as questionItem[];


  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-[75px]">
      <div className="wrapper flex flex-col gap-[40px]">
        <h2 className="leading-[1] tracking-[-0.04em] text-center text-[24px] xs:text-[40px] l:text-[56px]">
          {t('MainQuestions.title')}
        </h2>
        <div className="flex flex-col gap-[10px]">

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

      </div>
    </section>
  );
};

export default AppMainQuestions;