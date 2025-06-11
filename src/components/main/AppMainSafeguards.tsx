
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";

import SafeguardBlock from './elements/AppSafeguardBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import Img1 from '@/assets/images/safeguard/1.webp'
import Img2 from '@/assets/images/safeguard/2.webp'
import Img3 from '@/assets/images/safeguard/3.webp'
import Img4 from '@/assets/images/safeguard/4.webp'
import useWindowWidth from '@/hook/useWindowWidth';
import { horizontalLoop } from '@/scripts/slider';


const AppMainSafeguards = () => {

  const widthWindow = useWindowWidth()
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef(null);

  const guarantees = [

    {
      img: Img1,
      title: 'Гарантии и честность',
      items: [
        {
          subtitle: 'Фиксированная стоимость',
          text: 'После заключения договора цена не изменится.'
        },
        {
          subtitle: 'Бесплатные корректировки',
          text: 'До полного утверждения документов, мы вносим все необходимые изменения без дополнительной платы.'
        },
        {
          subtitle: 'Возврат денежных средств',
          text: 'Если сертификация невозможна или есть ошибка, устраним её или вернём средства.'
        }
      ]
    },

    {
      img: Img2,
      title: 'Надёжность и защита',
      items: [
        {
          subtitle: 'Строгое соблюдение сроков',
          text: 'Сертификация проводится в полном соответствии с российскими государственными стандартами.'
        },
        {
          subtitle: 'Официальность документов',
          text: 'Все сертификаты оформляются легитимно, регистрируются в государственных реестрах Российской Федерации.'
        },
        {
          subtitle: 'Защита персональных данных',
          text: 'Мы гарантируем конфиденциальность и надёжную защиту ваших данных.'
        }
      ]
    },

    {
      img: Img3,
      title: 'Оперативность и удобство',
      items: [
        {
          subtitle: 'Строгое соблюдение сроков',
          text: 'Мы гарантируем выполнение всех работ в срок.'
        },
        {
          subtitle: 'Экспресс-сертификация документов ',
          text: 'Срочная обработка документов, чтобы выйти на рынок как можно быстрее.'
        },
        {
          subtitle: 'Персональный менеджер',
          text: 'Специалист, который будет сопровождать вас на всех этапах.'
        }
      ]
    },
    {
      img: Img4,
      title: 'Поддержка после сертификации',
      items: [
        {
          subtitle: 'Переоформление документов',
          text: 'Продлеваем документы, оформленные другими компаниями. Без рисков и несоответствий.'
        },
        {
          subtitle: 'Подготовка к повторной сертификации',
          text: 'Заранее напомним о сроках, проверим документы по наличию, разработаем недостающие.'
        },
        {
          subtitle: 'Бесплатные консультации',
          text: 'Подробно расскажем о всех этапах оформления разрешительного документа.'
        }
      ]
    },
  ];




  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (divRef.current && entry.isIntersecting) {
          observer.unobserve(divRef.current);
        }

      },
      { threshold: 0.3 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }


    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }

    };
  }, []);

  const timeLine = useRef<any>(null)
  const [activeIndex, setActive] = useState<number>(0)

  useEffect(() => {
    if (widthWindow < 1280) {
      const slides = gsap.utils.toArray('[data-slider="slide-safeguard"]');
      timeLine.current = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        gap: 20,
        snap: true,
        onChange: (index: number) => {
          setActive(index)
        }
      });
    }
  }, [widthWindow])




  return (
    <>
      <section
        ref={divRef}
        className="py-[75px] relative">
        <div className="wrapper flex flex-col gap-[50px]">
          <h2 className="leading-[1] tracking-[-0.04em] text-center  text-[24px] xs:text-[40px] l:text-[56px]">Гарантии и безупречный сервис</h2>
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[20px]">
              {
                guarantees.map((item, index) => (
                  <div
                    key={index}
                    data-slider="slide-safeguard"
                  >
                    <SafeguardBlock
                      img={item.img}
                      index={index}
                      title={item.title}
                      items={item.items}
                      isVisible={isVisible}

                    />
                  </div>
                ))
              }
            </div>

            <div className="flex gap-[10px] xl:hidden mx-auto">
              {guarantees.map((_, i) => (
                <div key={i} className={`${activeIndex === i ? 'bg-[#34446D]' : ""} w-[10px] h-[10px] border border-solid border-[#34446D] rounded-full`}></div>
              ))}
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default AppMainSafeguards;