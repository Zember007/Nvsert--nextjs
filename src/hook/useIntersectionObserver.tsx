

import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Проверяем начальную позицию элемента (для автопрокрутки)
    const checkInitialPosition = () => {
      const rect = ref.current!.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Элемент считается видимым, если он в пределах экрана или ближе 1000px
      if (rect.top <= windowHeight + 1000) {
        setIsVisible(true);
      }
    };

    // Запускаем проверку сразу после монтирования
    checkInitialPosition();

    // Настраиваем Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Отключаем после срабатывания
        }
      },
      {
        rootMargin: '500px',
        ...options,
      },
    );

    observer.observe(ref.current);

    // Проверяем позицию при скролле (для случаев динамической прокрутки)
    const handleScroll = () => {
      checkInitialPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [options]);

  return { ref, isVisible };
}