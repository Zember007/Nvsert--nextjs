

import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options: IntersectionObserverInit = {}, disconnect: boolean = false) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (disconnect) {
            observer.disconnect();
          }
        } else {
          setIsVisible(false);
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