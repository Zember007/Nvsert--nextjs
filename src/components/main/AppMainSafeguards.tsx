
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";

import SafeguardBlock from './elements/AppSafeguardBlock';
import '@/assets/styles/sections/main/animation/skills.scss'




const AppMainSafeguards = () => {

  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef(null);

  const guarantees = [

    {
      title: 'Финансовые гарантии и честность',
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
          subtitle: 'Возврат денег',
          text: 'Если сертификация невозможна или есть ошибка, устраним её или вернём средства.'
        }
      ]
    },

    {
      title: 'Надёжность и защита',
      items: [
        {
          subtitle: 'Соответствие стандартам',
          text: 'Сертификация проводится в полном соответствии с российскими государственными стандартами.'
        },
        {
          subtitle: 'Официальность документов',
          text: 'Все сертификаты оформляются легитимно, регистрируются в государственных реестрах Российской Федерации.'
        },
        {
          subtitle: 'Защита данных',
          text: 'Мы гарантируем конфиденциальность и надёжную защиту ваших данных.'
        }
      ]
    },

    {
      title: 'Оперативность и удобство',
      items: [
        {
          subtitle: 'Строгое соблюдение сроков',
          text: 'Мы гарантируем выполнение всех работ в срок.'
        },
        {
          subtitle: 'Экспресс-сертификация',
          text: 'Срочная обработка документов, чтобы выйти на рынок как можно быстрее.'
        },
        {
          subtitle: 'Персональный менеджер',
          text: 'Специалист, который будет сопровождать вас на всех этапах.'
        }
      ]
    },
  ];



  useEffect(() => {
    if (typeof window === "undefined") return

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






  return (
    <section
      className="py-[75px] relative">
      <div className="wrapper flex flex-col gap-[50px]">
        <h2 className="leading-[1] tracking-[-0.04em] text-center  text-[24px] xs:text-[40px] l:text-[56px]">Гарантии и безупречный сервис</h2>
        <div className="grid grid-cols-3 gap-[15px]">
          {
            guarantees.map((item, index) => (
              <SafeguardBlock
                key={index}
                index={index}
                title={item.title}
                items={item.items}
                isVisible={isVisible}

              />
            ))
          }
        </div>
      </div>
      <div ref={divRef} className='top-0 bottom-0 left-0 right-0 absolute pointer-events-none'></div>
    </section >
  );
};

export default AppMainSafeguards;