
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";

import SafeguardBlock from './elements/AppSafeguardBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import '@/assets/styles/sections/main/main-safeguards.scss'
import Img1 from '@/assets/images/safeguard/1.webp'
import Img2 from '@/assets/images/safeguard/2.webp'
import Img3 from '@/assets/images/safeguard/3.webp'
import Img4 from '@/assets/images/safeguard/4.webp'
import useWindowWidth from '@/hook/useWindowWidth';
import { horizontalLoop } from '@/scripts/slider';


const AppMainSafeguards = () => {

  const widthWindow = useWindowWidth()
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

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
          subtitle: 'Соответствие всем стандартам',
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
          timeLine.current?.next({ ease: "power3", duration: 0.725 })
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
    if (widthWindow && widthWindow < 1280 && divRef.current) {

      const slides = gsap.utils.toArray('[data-slider="slide-safeguard"]');
      const gap =  widthWindow < 900 ? (widthWindow - 320) / 2 : 20
      timeLine.current = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        center: true,
        mobile: true,
        gap: gap,
        snap: true,
        onChange: (index: number) => {
          setActive(index)
        }
      });

    }

    return () => {
      if (timeLine.current) {
        timeLine.current.destroy();
      }
    }
  }, [widthWindow])




  return (
    <>
      <section
        ref={divRef}
        id="safeguards"
        className="section wrapper">
        <h2 className="section__title">Гарантии и безупречный сервис</h2>
        <div className="safeguards-container">
          <div className="safeguard__box"          
          style={{...(widthWindow && widthWindow < 900 && {gap: (widthWindow - 320) / 2})}}
          >
            {
              guarantees.map((item, index) => (
                <div
                  key={index}
                  className='safeguard-slide-item'
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

          <div className="slide-dots-box">
            {guarantees.map((_, i) => (
              <div 
              onClick={() => {
                timeLine.current.toIndex(i,{ ease: "power3", duration: 0.725 })
            }}
              key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
            ))}
          </div>
        </div>
      </section >
    </>
  );
};

export default AppMainSafeguards;