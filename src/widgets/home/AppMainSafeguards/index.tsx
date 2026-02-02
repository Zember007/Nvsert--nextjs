'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SafeguardBlock from './AppSafeguardBlock';
import stylesSafeguards from '@/assets/styles/main.module.scss';
import Img1 from '@/assets/images/safeguard/1.webp';
import Img2 from '@/assets/images/safeguard/2.webp';
import Img3 from '@/assets/images/safeguard/3.webp';
import Img4 from '@/assets/images/safeguard/4.webp';
import { useWindowSize } from 'shared/hooks';
import stylesSlider from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/main.module.scss';
import { Button } from 'shared/ui';
import { useHeaderContext } from 'shared/contexts/contexts/HeaderContext';


type SafeguardItem = { subtitle: string; text: string };
type SafeguardGroup = { title: string; items: SafeguardItem[] };

const AppMainSafeguards = () => {
  const { t } = useTranslation();
  const { width: widthWindow } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { openDefaultModal } = useHeaderContext();


  const timeLine = useRef<any>(null);
  const [activeIndex, setActive] = useState<number>(0);

  const images = [Img1, Img2, Img3, Img4] as const;
  const groups = t('safeguards.items', { returnObjects: true }) as SafeguardGroup[];
  const guarantees = groups.map((g, i) => ({ ...g, img: images[i] }));

  useEffect(() => {
    const currentRef = divRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          if (widthWindow && widthWindow < 1407) {
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

          observer.unobserve(currentRef);
          timeLine.current?.next({ ease: 'power3', duration: 0.725 });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);

      if (timeLine.current) {
        timeLine.current.destroy();
      }
    };
  }, [widthWindow]);

  return (
    <section ref={divRef} className="section ">
      <div id="safeguards" className="absolute top-[-50px] pointer-events-none" />

      <div className="flex justify-between items-center wrapper">
        <h2 className={`${textSize.headerH2} section__title`}>{t('safeguards.title')}</h2>
        <Button
          onClick={() => {
            openDefaultModal('orderForm');
          }}
          label={t('form.buttons.submitApplication')}
        />
      </div>

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

        <div className={`${stylesSlider.slideDotsBoxContainer}  my-[20px]`}>
          <div className={`${stylesSlider.slideDotsBox}`}>
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


