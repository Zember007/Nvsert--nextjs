'use client';

import type React from 'react';
import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import { slides } from '../utils';
import { filterPrepositions } from 'shared/lib';
import stylesMainSlider from '@/assets/styles/sections/main/main-slider.module.scss';
import { useButton } from 'shared/hooks';
import { useHeaderContext } from 'shared/contexts';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver, useWindowSize } from 'shared/hooks';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import stylesSlider from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';
import LinkButtonTitle from '../utils/ButtonTitle';
import SliderImageList from './SliderImageList';

interface SlideItem {
  title: string;
  text: string;
}

const AppMainSlider = () => {
  const { ref, isVisible } = useIntersectionObserver({}, true);
  const { width: widthWindow } = useWindowSize();
  const [activeIndex, setActive] = useState<number>(0);
  const timeLine = useRef<any>(null);
  const [whiteBgBlur, setWhiteBgBlur] = useState(true);

  const { setButtonRef, setWrapperRef } = useButton();
  const { openDefaultModal } = useHeaderContext();
  const { t } = useTranslation();

  const slidesLang = useMemo(() => {
    const raw = t('MainSlider.items', { returnObjects: true }) as unknown;

    const list: SlideItem[] = Array.isArray(raw)
      ? (raw as SlideItem[])
      : raw && typeof raw === 'object'
        ? (Object.values(raw as Record<string, SlideItem>) as SlideItem[])
        : [];

    return list.map((item) => ({
      title: filterPrepositions(item?.title ?? ''),
      text: filterPrepositions(item?.text ?? ''),
    }));
  }, [t]);
  const overlayText = useRef<HTMLDivElement>(null);

  // Инициализация слайдера только при появлении секции в зоне видимости
  useEffect(() => {
    if (!isVisible || !ref.current) return;

    if (timeLine.current) {
      timeLine.current.destroy();
      timeLine.current = null;
    }

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;

        const { initSlider } = await import('@/scripts/slider');

        if (widthWindow && widthWindow >= 1280) {
          let timeoutIdBg: NodeJS.Timeout | null = null;

          timeLine.current = initSlider({
            onChangeFunction: (index: number) => {
              setActive(index);
            },
            onDragFunction: () => {
              setWhiteBgBlur(false);
              if (timeoutIdBg) {
                clearTimeout(timeoutIdBg);
              }

              timeoutIdBg = setTimeout(() => {
                setWhiteBgBlur(true);
              }, 300);
            },
            mobile: false,
          });
        } else {
          setWhiteBgBlur(false);

          timeLine.current = initSlider({
            onChangeFunction: (index: number) => {
              setActive(index);
            },
            onDragFunction: null,
            mobile: true,
          });
        }

        if (timeLine.current) {
          timeLine.current.next({ ease: 'power3', duration: 0.725 });
        }

        if (ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );

    const target = ref.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      if (timeLine.current) {
        timeLine.current.destroy();
        timeLine.current = null;
      }
    };
  }, [ref, isVisible, widthWindow]);

  // Обработка свайпов по текстовому оверлею
  useEffect(() => {
    const overlayEl = overlayText.current;
    if (!overlayEl) return;

    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > 50 && timeLine.current) {
        const options = { ease: 'power3', duration: 0.725 };
        if (diffX > 0) {
          timeLine.current.previous(options);
        } else {
          timeLine.current.next(options);
        }
      }
    };

    overlayEl.addEventListener('touchstart', handleTouchStart);
    overlayEl.addEventListener('touchend', handleTouchEnd);

    return () => {
      overlayEl.removeEventListener('touchstart', handleTouchStart);
      overlayEl.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleDotClick = useCallback((index: number) => {
    if (!timeLine.current) return;
    timeLine.current.toIndex(index, { ease: 'power3', duration: 0.725 });
  }, []);

  return (
    <section ref={ref} className="section wrapper">
      <div id="slider" className="absolute top-[-50px] pointer-events-none"></div>

      <div className="flex justify-between items-center wrapper">
        <h2 className={`${textSize.headerH2} section__title`}>{t('MainSlider.title')}</h2>


        <LinkButtonTitle title="Посмотреть все документы" link="/services" />
      </div>

      <div className={stylesMainSlider.cloneable}>
        <div className={stylesMainSlider['slide-main']}>
          <div className={stylesMainSlider['slider-wrap']}>
            <SliderBlur whiteBgBlur={whiteBgBlur} />
            <SliderImageList widthWindow={widthWindow} />
          </div>
        </div>

        {/* Мобильные точки под слайдером */}
        <SliderDots
          count={slides.length}
          activeIndex={activeIndex}
          containerClassName={`${stylesSlider.slideDotsBoxContainer} xl:!hidden`}
          boxClassName={`${stylesSlider.slideDotsBox} xl:!hidden`}
          handleDotClick={handleDotClick}
        />

        <div ref={overlayText} className={stylesMainSlider.overlay}>
          <div className={stylesMainSlider['overlay-slider']}></div>

          <div className={stylesMainSlider['overlay-content-container']}>
            <h3 className={`${textSize.headerH6} ${stylesMainSlider['overlay-title']}`}>
              {slidesLang[activeIndex]?.title || ''}
            </h3>
            <p className={`${stylesMainSlider['slide-text-content']} ${textSize.text3}`}>
              {slidesLang[activeIndex]?.text || ''}
            </p>
          </div>

          <div className={stylesMainSlider.slider__navigations}>
            <div className={stylesMainSlider['slider-navigation-container']}>
              <SliderNavButton
                direction="prev"
                setWrapperRef={setWrapperRef}
                setButtonRef={setButtonRef}
              />
              <SliderNavButton
                direction="next"
                setWrapperRef={setWrapperRef}
                setButtonRef={setButtonRef}
              />
            </div>

            <div className={stylesMainSlider['slide-counter-container']}>
              <div className={stylesMainSlider['slide-counter-overflow']}>
                <div className={stylesMainSlider['count-column']}>
                  <p
                    data-slide-count="step"
                    className={`${textSize.headerH3} ${stylesMainSlider['count-heading']}`}
                  >
                    01
                  </p>
                </div>
              </div>
              <span className="font-light">/</span>
              <div className={stylesMainSlider['count-column']}>
                <p
                  data-slide-count="total"
                  className={`${textSize.headerH3} ${stylesMainSlider['count-heading']}`}
                >
                  {slides.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Кликабельные точки под текстовым блоком */}
        <SliderDots
          count={slides.length}
          activeIndex={activeIndex}
          containerClassName={`${stylesSlider.slideDotsBoxContainer} xl:!hidden`}
          boxClassName={`${stylesSlider.slideDotsBox} xl:!hidden`}
          handleDotClick={handleDotClick}
        />


      </div>
    </section>
  );
};

export default AppMainSlider;

interface SliderBlurProps {
  whiteBgBlur: boolean;
}

const SliderBlur: React.FC<SliderBlurProps> = memo(({ whiteBgBlur }) => {
  return (
    <>
      <div
        className={`${stylesSlider.slideBlur} ${stylesMainSlider['slide-blur-left']} ${whiteBgBlur ? stylesSlider.white : ''
          }`}
      >
        <span
          className={`${stylesSlider.line} hidden xl:block white`}
          style={{ '--blur': '4px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
        <span
          className={stylesSlider.line}
          style={{ '--blur': '9px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
        <span
          className={stylesSlider.line}
          style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
        <span
          className={stylesSlider.line}
          style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
      </div>

      <div className={`${stylesSlider.slideBlur} right-0`}>
        <span
          className={stylesSlider.line}
          style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
        <span
          className={stylesSlider.line}
          style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
        <span
          className={stylesSlider.line}
          style={{ '--blur': '9px', '--lightness': '100%' } as React.CSSProperties}
        ></span>
      </div>
    </>
  );
});

SliderBlur.displayName = 'SliderBlur';

interface SliderDotsProps {
  count: number;
  activeIndex: number;
  containerClassName?: string;
  boxClassName?: string;
  handleDotClick: (index: number) => void;
}

const SliderDots: React.FC<SliderDotsProps> = memo(
  ({
    count,
    activeIndex,
    containerClassName = '',
    boxClassName = '',
    handleDotClick,
  }) => {
    return (
      <div className={containerClassName}>
        <div className={boxClassName}>
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Слайд ${i + 1}`}
              aria-current={activeIndex === i ? 'true' : undefined}
              className={`${activeIndex === i ? stylesSlider.activeDots : ''} ${stylesSlider.slideDots}`}
            />
          ))}
        </div>
      </div>
    );
  },
);

SliderDots.displayName = 'SliderDots';

interface SliderNavButtonProps {
  direction: 'prev' | 'next';
  setWrapperRef: (element: HTMLDivElement | null) => void;
  setButtonRef: (element: HTMLButtonElement | null) => void;
}

const SliderNavButton: React.FC<SliderNavButtonProps> = memo(({ direction, setWrapperRef, setButtonRef }) => {
  const isPrev = direction === 'prev';

  const commonSvgProps = {
    width: 12,
    height: 24,
    viewBox: '0 0 12 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  } as const;

  return (
    <div
      ref={setWrapperRef}
      className={`${stylesBtn.tariffWrap} ${stylesMainSlider['navigation-button-wrap']}`}
    >
      <button
        ref={setButtonRef}
        aria-label={isPrev ? 'previous slide' : 'next slide'}
        data-slider={isPrev ? 'button-prev' : 'button-next'}
        className={`${stylesBtn.tariff} ${stylesMainSlider.slider__navigations_item} group`}
      >
        <span
          className={
            isPrev
              ? `${stylesMainSlider['navigation-button-icon']} group-hover:-translate-x-[32px]`
              : `${stylesMainSlider['navigation-button-icon-next']} group-hover:translate-x-[32px]`
          }
        >

          <svg {...commonSvgProps}>
            <path
              d={isPrev ? 'M0 15H1V16H2V17H3V18H4V19H5V20H6V21H7V22H8V23H9V24H10V25H11V24H12V23H11V22H10V21H9V20H8V19H7V18H6V17H5V16H4V15H3V14H2V11H3V10H4V9H5V8H6V7H7V6H8V5H9V4H10V3H11V2H12V1H11V0H10V1H9V2H8V3H7V4H6V5H5V6H4V7H3V8H2V9H1V10H0V15Z' : 'M12 11V14V15H11V16H10V17H9V18H8V19H7V20H6V21H5V22H4V23H3V24H2V25H1V24H0V23H1V22H2V21H3V20H4V19H5V18H6V17H7V16H8V15H9V14H10V11H9V10H8V9H7V8H6V7H5V6H4V5H3V4H2V3H1V2H0V1H1V0H2V1H3V2H4V3H5V4H6V5H7V6H8V7H9V8H10V9H11V10H12V11Z'}

              fill="white" />
          </svg>


        </span>
        <span
          className={
            isPrev
              ? `${stylesMainSlider['navigation-button-icon']} group-hover:-translate-x-[32px]`
              : `${stylesMainSlider['navigation-button-icon-next']} group-hover:translate-x-[32px]`
          }
        >
          <svg {...commonSvgProps}>
            <path
              d={isPrev ? 'M0 15H1V16H2V17H3V18H4V19H5V20H6V21H7V22H8V23H9V24H10V25H11V24H12V23H11V22H10V21H9V20H8V19H7V18H6V17H5V16H4V15H3V14H2V11H3V10H4V9H5V8H6V7H7V6H8V5H9V4H10V3H11V2H12V1H11V0H10V1H9V2H8V3H7V4H6V5H5V6H4V7H3V8H2V9H1V10H0V15Z' : 'M12 11V14V15H11V16H10V17H9V18H8V19H7V20H6V21H5V22H4V23H3V24H2V25H1V24H0V23H1V22H2V21H3V20H4V19H5V18H6V17H7V16H8V15H9V14H10V11H9V10H8V9H7V8H6V7H5V6H4V5H3V4H2V3H1V2H0V1H1V0H2V1H3V2H4V3H5V4H6V5H7V6H8V7H9V8H10V9H11V10H12V11Z'}

              fill="white" />
          </svg>
        </span>
      </button>
    </div>
  );
});

SliderNavButton.displayName = 'SliderNavButton';







