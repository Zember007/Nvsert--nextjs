/**
 * Хук для lazy-reveal: элемент становится visible при попадании в viewport.
 *
 * disconnect=true (по умолчанию в LazyLoadSection): одноразовый триггер.
 * После первого intersect observer отключается — анимация входа не сбрасывается
 * при повторном выходе элемента из viewport.
 *
 * disconnect=false: реактивное слежение (isVisible меняется при каждом пересечении).
 * Используется для элементов, которые должны анимироваться при каждом показе.
 *
 * useMemo для options: IntersectionObserver пересоздаётся при изменении options-объекта.
 * Без memo каждый ре-рендер родителя (с inline объектом) разрывал бы observer.
 */
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