import { useEffect, useState, useRef, useMemo } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = {},
  disconnect: boolean = false
) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Мемоизируем options, чтобы избежать пересоздания observer
  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Отключаем observer, если нужно срабатывание только один раз
          if (disconnect) {
            observer.disconnect();
          }
        } else {
          // Не сбрасываем isVisible, если уже отключились
          if (!disconnect) {
            setIsVisible(false);
          }
        }
      },
      memoizedOptions
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [memoizedOptions, disconnect]);

  return { ref, isVisible };
}