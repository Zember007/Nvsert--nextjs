'use client';

import { AsyncPhotoProvider, AsyncPhotoView } from '@/components/common/AsyncPhotoView';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useWindowSize from '@/hook/useWindowSize';
import '@/assets/styles/sections/main/main-feedback.scss';
import stylesSlider from '@/assets/styles/blocks/slider.module.scss';
import textSize from '@/assets/styles/base/text-size.module.scss';

type FeedbackSliderProps = {
  dataSlider: 'slide-feedback' | 'slide-feedback1';
  startIndex: number;
};

const FeedbackSliderSection = ({
  dataSlider,
  startIndex,
}: FeedbackSliderProps) => (
  <div className="feedback-slider-section">
    <div className="feedback-slider-container">
      {[...Array(14)].map((_, index) => (
        <div
          data-slider={dataSlider}
          key={index}
          className="feedback-item"
        >
          <AsyncPhotoView
            src={`/feedbacks/big/${startIndex + index}.png`}
          >
            <Image
              className="feedback-image"
              src={`/feedbacks/small/${startIndex + index}.png`}
              alt="feedback"
              width={190}
              height={267}
              loading="lazy"
            />
          </AsyncPhotoView>
        </div>
      ))}
    </div>
  </div>
);

type FeedbackDotsProps = {
  activeIndex: number;
};

const FeedbackDots = ({ activeIndex }: FeedbackDotsProps) => (
  <div className={`${stylesSlider.slideDotsBoxContainer} !flex xl:!hidden`}>
    <div className={`${stylesSlider.slideDotsBox} !flex xl:!hidden`}>
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className={`${activeIndex === i ? stylesSlider.activeDots : ''} ${stylesSlider.slideDots}`}
        />
      ))}
    </div>
  </div>
);

const FeedbackBlur = ({ position }: { position: 'left' | 'right' }) => (
  <div
    className={`${stylesSlider.slideBlur} ${stylesSlider.feedbackBlur} ${
      position === 'left' ? 'left-0' : 'right-0'
    }`}
  >
    <span
      className={stylesSlider.line}
      style={{ '--blur': position === 'left' ? '10px' : '2px', '--lightness': '100%' } as React.CSSProperties}
    />
    <span
      className={stylesSlider.line}
      style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}
    />
    <span
      className={stylesSlider.line}
      style={{ '--blur': position === 'left' ? '2px' : '10px', '--lightness': '100%' } as React.CSSProperties}
    />
  </div>
);

const AppMainFeedback = () => {
  const { width: widthWindow } = useWindowSize();

  const ref = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActive] = useState<number>(0);
  const [activeIndex1, setActive1] = useState<number>(0);

  const loop = useRef<any>(null);
  const loop1 = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          const [gsapModule, sliderModule] = await Promise.all([
            import('gsap'),
            import('@/scripts/slider'),
          ]);
          const gsap = gsapModule.default || gsapModule;
          const { horizontalLoop } = sliderModule;

          const slides = gsap.utils.toArray('[data-slider="slide-feedback"]');
          const slides1 = gsap.utils.toArray('[data-slider="slide-feedback1"]');

          const mobile = Boolean(widthWindow && widthWindow < 1280);
          const snap = mobile;

          loop.current = horizontalLoop(slides, {
            paused: true,
            draggable: true,
            mobile,
            center: true,
            snap,
            gap: 20,
            onChange: (index: number) => {
              setActive(index);
            },
          });

          loop1.current = horizontalLoop(slides1, {
            paused: true,
            center: true,
            draggable: true,
            offsetLeft: 0,
            mobile,
            snap,
            gap: 20,
            onChange: (index: number) => {
              setActive1(index);
            },
          });

          loop.current?.next({ ease: 'power3', duration: 0.725 });
          loop1.current?.next({ ease: 'power3', duration: 0.725 });

          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      loop.current?.destroy();
      loop1.current?.destroy();
      loop.current = null;
      loop1.current = null;
    };
  }, [widthWindow]);

  const { t } = useTranslation();

  return (
    <section className="section wrapper">
      <div id="feedback" className="absolute top-[-50px] pointer-events-none" />

      <h2 className={`${textSize.headerH2} section__title`}>
        {t('MainFeedback.title')}
      </h2>

      <AsyncPhotoProvider
        maskOpacity={0.4}
        maskClassName="blurred-mask"
        speed={() => 0}
        maskClosable={false}
      >
        <div ref={ref} className="feedback-slider-box">
          <FeedbackBlur position="left" />

          <div className="feedback-slider-section">
            <FeedbackSliderSection
              dataSlider="slide-feedback"
              startIndex={1}
            />
            <FeedbackDots activeIndex={activeIndex} />
          </div>

          <div className="feedback-slider-section">
            <FeedbackSliderSection
              dataSlider="slide-feedback1"
              startIndex={15}
            />
            <FeedbackDots activeIndex={activeIndex1} />
          </div>

          <FeedbackBlur position="right" />
        </div>
      </AsyncPhotoProvider>
    </section>
  );
};

export default AppMainFeedback;


