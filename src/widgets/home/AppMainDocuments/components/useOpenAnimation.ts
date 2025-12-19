import { useEffect, MutableRefObject } from 'react';
import { useAnimation } from 'framer-motion';

// Анимационные настройки
const ANIMATION_SETTINGS = {
  duration: 0.6,
  bounce: 5,
  delay: 0,
  ease: [0.34, 1.56, 0.64, 1],
  times: [0, 0.2, 0.5, 0.8, 1],
  openY: [0, 26, 0, 0, 0],
  closeY: [60, -6, 0, 0, 0],
};

// Утилита для проверки видимости элемента
const isInViewport = (el: HTMLElement | null): boolean => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Утилита для скролла к элементу
const scrollToElement = (
  el: HTMLElement | null,
  totalItems: number,
  index: number,
) => {
  if (!el) return;
  const scrollOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: totalItems / 2 > index ? 'start' : 'end',
  };
  el.scrollIntoView(scrollOptions);
};

// Вспомогательный хук для анимации открытия
export const useOpenAnimation = (
  active: boolean,
  totalItems: number,
  index: number,
  wrapperRef: MutableRefObject<HTMLDivElement | null>,
) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      controls.start({
        y: ANIMATION_SETTINGS.openY,
        transition: {
          duration: ANIMATION_SETTINGS.duration,
          ease: ANIMATION_SETTINGS.ease,
          times: ANIMATION_SETTINGS.times,
        },
      });
    }, 50);

    const el = wrapperRef.current;
    let timerScroll: NodeJS.Timeout | null = null;
    if (el && !isInViewport(el)) {
      timerScroll = setTimeout(
        () => scrollToElement(el, totalItems, index),
        400,
      );
    }

    return () => {
      clearTimeout(timer);
      if (timerScroll) clearTimeout(timerScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, totalItems, index]);

  return controls;
};


