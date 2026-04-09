import { type RefObject, useEffect } from 'react';
import { subscribeDocumentLayoutTiltScroll } from './documentLayoutTiltScrollStore';

export type DocumentLayoutTiltOptions = {
  maxDeg: number;
};

/** Выключить наклон полностью (например на слабых машинах) — правка в одном месте */
export const ENABLE_DOCUMENT_LAYOUT_TILT = true;

function computeRotateXDeg(el: HTMLElement, maxDeg: number): number {
  const rect = el.getBoundingClientRect();
  const viewportMidY = window.innerHeight / 2;
  const cardMidY = rect.top + rect.height / 2;
  const delta = cardMidY - viewportMidY;

  const halfViewport = viewportMidY;
  const distFromMid = Math.abs(delta);
  const t = halfViewport > 0 ? Math.min(1, distFromMid / halfViewport) : 0;
  const angleMag = t * maxDeg;

  if (delta < 0) return -angleMag;
  if (delta > 0) return angleMag;
  return 0;
}

function applyTiltTransform(el: HTMLElement, deg: number): void {
  if (deg === 0) {
    el.style.removeProperty('transform');
    return;
  }
  el.style.transform = `translateZ(0) rotateX(${deg}deg)`;
}

/**
 * Наклон относительно середины вьюпорта.
 * Без GSAP на горячем пути — только style.transform + троттлинг scroll в store.
 * Подписка на scroll только пока карточка в viewport (узкий rootMargin).
 */
export function useDocumentLayoutTilt(
  wrapperRef: RefObject<HTMLElement | null>,
  isEnabled: boolean,
  options: DocumentLayoutTiltOptions,
): void {
  const { maxDeg } = options;

  useEffect(() => {
    if (!ENABLE_DOCUMENT_LAYOUT_TILT || !isEnabled) {
      const el = wrapperRef.current;
      if (el) el.style.removeProperty('transform');
      return;
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const el = wrapperRef.current;
      if (el) el.style.removeProperty('transform');
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;
    let waitRafId: number | null = null;

    const cancelWait = () => {
      if (waitRafId !== null) {
        cancelAnimationFrame(waitRafId);
        waitRafId = null;
      }
    };

    const runSetup = (el: HTMLElement) => {
      if (disposed) return;

      let unsubscribeScroll: (() => void) | undefined;

      const apply = () => {
        if (disposed) return;
        const node = wrapperRef.current;
        if (!node) return;
        const deg = computeRotateXDeg(node, maxDeg);
        applyTiltTransform(node, deg);
      };

      const subscribeToScroll = () => {
        if (unsubscribeScroll) return;
        unsubscribeScroll = subscribeDocumentLayoutTiltScroll(apply);
      };

      const unsubscribeFromScroll = () => {
        if (unsubscribeScroll) {
          unsubscribeScroll();
          unsubscribeScroll = undefined;
        }
      };

      if (typeof IntersectionObserver !== 'undefined') {
        const io = new IntersectionObserver(
          ([entry]) => {
            const vis = Boolean(entry?.isIntersecting);
            if (vis) {
              subscribeToScroll();
              apply();
            } else {
              unsubscribeFromScroll();
              applyTiltTransform(el, 0);
            }
          },
          { threshold: 0, rootMargin: '0px' },
        );
        io.observe(el);

        teardown = () => {
          cancelWait();
          unsubscribeFromScroll();
          io.disconnect();
          el.style.removeProperty('transform');
        };
      } else {
        subscribeToScroll();
        apply();
        teardown = () => {
          cancelWait();
          unsubscribeFromScroll();
          el.style.removeProperty('transform');
        };
      }

      if (disposed) {
        teardown();
        teardown = undefined;
      }
    };

    const elNow = wrapperRef.current;
    if (elNow) {
      runSetup(elNow);
    } else {
      const waitForRef = () => {
        if (disposed) return;
        const el = wrapperRef.current;
        if (el) {
          waitRafId = null;
          runSetup(el);
          return;
        }
        waitRafId = requestAnimationFrame(waitForRef);
      };
      waitRafId = requestAnimationFrame(waitForRef);
    }

    return () => {
      disposed = true;
      cancelWait();
      teardown?.();
    };
  }, [isEnabled, wrapperRef, maxDeg]);
}
