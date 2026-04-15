/**
 * Реактивная проверка медиа-брейкпоинта без «нулевого кадра».
 *
 * ЗАЧЕМ useSyncExternalStore вместо useEffect+useState: паттерн с useEffect даёт
 * false → true при mount, вызывая мерцание на SSR+hydration (hydration mismatch).
 * useSyncExternalStore принимает serverSnapshot (() => false) — сервер и первый
 * клиентский кадр возвращают одинаковое значение, hydration проходит без ошибок.
 * Реальное значение matchMedia применяется только после гидрации.
 */
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
