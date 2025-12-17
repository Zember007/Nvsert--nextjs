'use client';

import { useEffect, useRef, useState } from 'react';

import SafeguardBlock from './AppSafeguardBlock';
import stylesSafeguards from '@/assets/styles/main.module.scss';
import Img1 from '@/assets/images/safeguard/1.webp';
import Img2 from '@/assets/images/safeguard/2.webp';
import Img3 from '@/assets/images/safeguard/3.webp';
import Img4 from '@/assets/images/safeguard/4.webp';
import useWindowSize from '@/shared/hooks/useWindowSize';
import stylesSlider from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/main.module.scss';

const guarantees = [
  {
    img: Img1,
    title: 'Гарантии и честность',
    items: [
      {
        subtitle: 'Фиксированная стоимость',
        text: 'После заключения договора цена не изменится.',
      },
      {
        subtitle: 'Бесплатные корректировки',
        text: 'До полного утверждения документов, мы вносим все необходимые изменения без дополнительной платы.',
      },
      {
        subtitle: 'Возврат денежных средств',
        text: 'Если сертификация невозможна или есть ошибка, устраним её или вернём средства.',
      },
    ],
  },
  {
    img: Img2,
    title: 'Надёжность и защита',
    items: [
      {
        subtitle: 'Соответствие всем стандартам',
        text: 'Сертификация проводится в полном соответствии с российскими государственными стандартами.',
      },
      {
        subtitle: 'Официальность документов',
        text: 'Все сертификаты оформляются легитимно, регистрируются в государственных реестрах Российской Федерации.',
      },
      {
        subtitle: 'Защита персональных данных',
        text: 'Мы гарантируем конфиденциальность и надёжную защиту ваших данных.',
      },
    ],
  },
  {
    img: Img3,
    title: 'Оперативность и удобство',
    items: [
      {
        subtitle: 'Строгое соблюдение сроков',
        text: 'Мы гарантируем выполнение всех работ в срок.',
      },
      {
        subtitle: 'Экспресс-сертификация документов ',
        text: 'Срочная обработка документов, чтобы выйти на рынок как можно быстрее.',
      },
      {
        subtitle: 'Персональный менеджер',
        text: 'Специалист, который будет сопровождать вас на всех этапах.',
      },
    ],
  },
  {
    img: Img4,
    title: 'Поддержка после сертификации',
    items: [
      {
        subtitle: 'Переоформление документов',
        text: 'Продлеваем документы, оформленные другими компаниями. Без рисков и несоответствий.',
      },
      {
        subtitle: 'Подготовка к повторной сертификации',
        text: 'Заранее напомним о сроках, проверим документы по наличию, разработаем недостающие.',
      },
      {
        subtitle: 'Бесплатные консультации',
        text: 'Подробно расскажем о всех этапах оформления разрешительного документа.',
      },
    ],
  },
];

const AppMainSafeguards = () => {
  const { width: widthWindow } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const timeLine = useRef<any>(null);
  const [activeIndex, setActive] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (divRef.current && entry.isIntersecting) {
          if (widthWindow && widthWindow < 1407 && divRef.current) {
            const [gsapModule, sliderModule] = await Promise.all([
              import('gsap'),
              import('@/scripts/slider'),
            ]);
            const gsap = gsapModule.default || gsapModule;
            const { horizontalLoop } = sliderModule;

            const slides = gsap.utils.toArray('[data-slider="slide-safeguard"]');
            const gap = widthWindow < 960 ? (widthWindow - 250) / 2 : 20;

            timeLine.current = horizontalLoop(slides, {
              paused: true,
              draggable: true,
              center: widthWindow >= 960 ? false : true,
              mobile: true,
              gap: Math.round(gap),
              snap: true,
              onChange: (index: number) => {
                setActive(index);
              },
            });
          }

          observer.unobserve(divRef.current);
          timeLine.current?.next({ ease: 'power3', duration: 0.725 });
        }
      },
      { threshold: 0.3 },
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }

      if (timeLine.current) {
        timeLine.current.destroy();
      }
    };
  }, [widthWindow]);

  return (
    <section ref={divRef} className="section ">
      <div id="safeguards" className="absolute top-[-50px] pointer-events-none" />

      <h2 className={`${textSize.headerH2} section__title`}>Гарантии и безупречный сервис</h2>

      <div className={stylesSafeguards['safeguards-container']}>
        <div
          className={stylesSafeguards['safeguard__box']}
          style={{
            ...(widthWindow &&
              widthWindow < 960 && { gap: Math.round((widthWindow - 250) / 2) }),
          }}
        >
          {guarantees.map((item, index) => (
            <div
              key={index}
              className={stylesSafeguards['safeguard-slide-item']}
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
          ))}
        </div>

        <div className={`${stylesSlider.slideDotsBoxContainer} !flex my-[20px]`}>
          <div className={`${stylesSlider.slideDotsBox} !flex`}>
            {guarantees.map((_, i) => (
              <div
                
                key={i}
                className={`${activeIndex === i ? stylesSlider.activeDots : ''} ${stylesSlider.slideDots}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppMainSafeguards;


