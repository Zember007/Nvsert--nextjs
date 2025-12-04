'use client';

import type React from 'react';
import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { slides } from '../utils';
import { filterPrepositions } from '@/hook/filter';
import stylesMainSkills from '@/assets/styles/sections/main/main-skills.module.scss';
import stylesMainSlider from '@/assets/styles/sections/main/main-slider.module.scss';
import { useButton } from '@/hook/useButton';
import { useHeaderContext } from '../../contexts/HeaderContext';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import useWindowSize from '@/hook/useWindowSize';
import stylesBtn from '@/assets/styles/base/_button.module.scss';
import stylesSlider from '@/assets/styles/blocks/slider.module.scss';
import textSize from '@/assets/styles/base/text-size.module.scss';

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

  const slidesLang = useMemo(
    () =>
      (t('MainSlider.items', { returnObjects: true }) as SlideItem[]).map(
        (item) => ({
          title: filterPrepositions(item.title),
          text: filterPrepositions(item.text),
        }),
      ),
    [t],
  );
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

      <h2 className={`${textSize.headerH2} section__title`}>Помогаем с&nbsp;документами по&nbsp;отраслям</h2>

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
        />

        <div ref={overlayText} className={stylesMainSlider.overlay}>
          <div className={stylesMainSlider['overlay-slider']}></div>

          <div className={stylesMainSkills['overlay-content-container']}>
            <h3 className={`${textSize.headerH6} ${stylesMainSlider['overlay-title']}`}>
              {slidesLang[activeIndex]?.title || ''}
            </h3>
            <p className={`${stylesMainSkills['slide-text-content']} ${textSize.text3}`}>
              {slidesLang[activeIndex]?.text || ''}
            </p>
          </div>

          <div className={stylesMainSlider.slider__navigations}>
            <div className={stylesMainSkills['slider-navigation-container']}>
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

            <div className={stylesMainSkills['slide-counter-container']}>
              <div className={stylesMainSkills['slide-counter-overflow']}>
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
          onDotClick={handleDotClick}
          containerClassName={`${stylesSlider.slideDotsBoxContainer} xl:!hidden`}
          boxClassName={`${stylesSlider.slideDotsBox} xl:!hidden`}
        />

        <SliderCtaButton
          setWrapperRef={setWrapperRef}
          setButtonRef={setButtonRef}
          onClick={useCallback(
            () => openDefaultModal('orderForm'),
            [openDefaultModal],
          )}
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
        className={`${stylesSlider.slideBlur} ${stylesMainSkills['slide-blur-left']} ${
          whiteBgBlur ? stylesSlider.white : ''
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

const SliderImageList = dynamic(
  () => import('./SliderImageList').then((mod) => mod.default),
  { ssr: false },
);

interface SliderDotsProps {
  count: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
  containerClassName?: string;
  boxClassName?: string;
}

const SliderDots: React.FC<SliderDotsProps> = memo(
  ({
    count,
    activeIndex,
    onDotClick,
    containerClassName = '',
    boxClassName = '',
  }) => {
    return (
      <div className={containerClassName}>
        <div className={boxClassName}>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`${activeIndex === i ? stylesSlider.activeDots : ''} ${stylesSlider.slideDots}`}
              onClick={onDotClick ? () => onDotClick(i) : undefined}
            ></div>
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
      className={`${stylesBtn.tariffWrap} ${stylesMainSkills['navigation-button-wrap']}`}
    >
      <button
        ref={setButtonRef}
        aria-label={isPrev ? 'previous slide' : 'next slide'}
        data-slider={isPrev ? 'button-prev' : 'button-next'}
        className={`${stylesBtn.tariff} item group`}
      >
        <span
          className={
            isPrev
              ? `${stylesMainSkills['navigation-button-icon']} group-hover:-translate-x-[32px]`
              : `${stylesMainSkills['navigation-button-icon-next']} group-hover:translate-x-[32px]`
          }
        >
          <svg {...commonSvgProps}>
            <path
              d={isPrev ? 'M10 21.957L2 13.404L2.00006 9.60268L10 2' : 'M2 21.957L10 13.404L9.99994 9.60268L2 2'}
              stroke="white"
              strokeWidth="2.66667"
            />
          </svg>
        </span>
        <span
          className={
            isPrev
              ? `${stylesMainSkills['navigation-button-icon']} group-hover:-translate-x-[32px]`
              : `${stylesMainSkills['navigation-button-icon-next']} group-hover:translate-x-[32px]`
          }
        >
          <svg {...commonSvgProps}>
            <path
              d={isPrev ? 'M10 21.957L2 13.404L2.00006 9.60268L10 2' : 'M2 21.957L10 13.404L9.99994 9.60268L2 2'}
              stroke="white"
              strokeWidth="2.66667"
            />
          </svg>
        </span>
      </button>
    </div>
  );
});

SliderNavButton.displayName = 'SliderNavButton';

interface SliderCtaButtonProps {
  setWrapperRef: (element: HTMLDivElement | null) => void;
  setButtonRef: (element: HTMLButtonElement | null) => void;
  onClick: () => void;
}

const SliderCtaButton: React.FC<SliderCtaButtonProps> = memo(
  ({ setWrapperRef, setButtonRef, onClick }) => (
    <div
      className={`${stylesMainSkills['main-button-slider-wrap']} ${stylesBtn.tariffWrap}`}
      ref={setWrapperRef}
    >
      <button
        onClick={onClick}
        ref={setButtonRef}
        className={`${stylesBtn.btnIconAn} ${stylesMainSlider.slider__button} group  ${stylesBtn.tariff}`}
      >
        <span className={stylesBtn.sendText}>Оформить заявку</span>
        <span className={stylesBtn.sendIconLeft}>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z"
              fill="white"
            />
          </svg>
        </span>
      </button>
    </div>
  ),
);

SliderCtaButton.displayName = 'SliderCtaButton';


