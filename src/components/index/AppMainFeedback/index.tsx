'use client';

import { AsyncPhotoProvider, AsyncPhotoView } from '@/components/common/AsyncPhotoView';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useWindowSize from '@/hook/useWindowSize';
import stylesMainFeedback from '@/assets/styles/main.module.scss';
import stylesSlider from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/main.module.scss';
import { VirtualizedList } from '../utils/VirtualizedList';

type FeedbackSliderProps = {
  dataSlider: 'slide-feedback' | 'slide-feedback1';
  startIndex: number;
};

const FEEDBACK_ITEMS_TOTAL = 28;
const ESTIMATED_FEEDBACK_ITEM_SIZE = 320;

const FeedbackSliderSection = ({
  dataSlider,
  startIndex,
}: FeedbackSliderProps) => (
  <div className={stylesMainFeedback['feedback-slider-section']}>
    <div className={stylesMainFeedback['feedback-slider-container']}>
      {[...Array(14)].map((_, index) => (
        <div
          data-slider={dataSlider}
          key={index}
          className={stylesMainFeedback['feedback-item']}
        >
          <AsyncPhotoView
            src={`/feedbacks/big/${startIndex + index}.png`}
          >
            <Image
              decoding="async"
              className={stylesMainFeedback['feedback-image']}
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

  const isMobileListMode = Boolean(widthWindow && widthWindow < 768);

  const ref = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActive] = useState<number>(0);
  const [activeIndex1, setActive1] = useState<number>(0);

  const loop = useRef<any>(null);
  const loop1 = useRef<any>(null);

  useEffect(() => {
    if (isMobileListMode) {
      return undefined;
    }

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
  }, [widthWindow, isMobileListMode]);

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
        <div ref={ref} className={stylesMainFeedback['feedback-slider-box']}>
          {isMobileListMode ? (
            <VirtualizedList<number>
              items={Array.from(
                { length: FEEDBACK_ITEMS_TOTAL },
                (_, i) => i + 1,
              )}
              estimatedItemSize={ESTIMATED_FEEDBACK_ITEM_SIZE}
              renderItem={(itemIndex) => (
                <div className={stylesMainFeedback['feedback-slider-section']}>
                  <div
                    className={stylesMainFeedback['feedback-slider-container']}
                  >
                    <div className={stylesMainFeedback['feedback-item']}>
                      <AsyncPhotoView
                        src={`/feedbacks/big/${itemIndex}.png`}
                      >
                        <Image
                          decoding="async"
                          className={stylesMainFeedback['feedback-image']}
                          src={`/feedbacks/small/${itemIndex}.png`}
                          alt="feedback"
                          width={190}
                          height={267}
                          loading="lazy"
                        />
                      </AsyncPhotoView>
                    </div>
                  </div>
                </div>
              )}
            />
          ) : (
            <>
              <FeedbackBlur position="left" />

              <div className={stylesMainFeedback['feedback-slider-section']}>
                <FeedbackSliderSection
                  dataSlider="slide-feedback"
                  startIndex={1}
                />
                <FeedbackDots activeIndex={activeIndex} />
              </div>

              <div className={stylesMainFeedback['feedback-slider-section']}>
                <FeedbackSliderSection
                  dataSlider="slide-feedback1"
                  startIndex={15}
                />
                <FeedbackDots activeIndex={activeIndex1} />
              </div>

              <FeedbackBlur position="right" />
            </>
          )}
        </div>
      </AsyncPhotoProvider>
    </section>
  );
};

export default AppMainFeedback;


