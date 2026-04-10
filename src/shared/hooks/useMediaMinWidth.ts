import { useSyncExternalStore } from 'react';

/**
 * Состояние matchMedia(min-width) без «нулевого» первого кадра от useWindowSize.
 */
export function useMediaMinWidth(minPx: number): boolean {
  const query = `(min-width: ${minPx}px)`;

  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined') return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () =>
      typeof window !== 'undefined' && window.matchMedia(query).matches,
    () => false,
  );
}
