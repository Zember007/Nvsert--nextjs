

import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Отключаем после срабатывания
        }
      },
      {
        ...options,
      },
    );

    observer.observe(ref.current);



    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}