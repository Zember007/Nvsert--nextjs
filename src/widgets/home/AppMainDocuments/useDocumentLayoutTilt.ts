import { type RefObject, useCallback, useEffect, useRef } from 'react';

export type DocumentLayoutTiltOptions = {
  maxDeg: number;
};

export const ENABLE_DOCUMENT_LAYOUT_TILT = true;

/** Совпадает с SCSS у .document-wrapper-border — в inline transform для гарантированно видимого 3D */
const TILT_PERSPECTIVE_PX = 1000;

/**
 * Угол от положения центра карточки относительно центра экрана по вертикали.
 * Слабая нелинейность: на «нулевой» линии всё равно есть небольшой наклон (иначе 0° и «не двигается»).
 */
function computeHoverRotateXDeg(el: HTMLElement, maxDeg: number): number {
  const rect = el.getBoundingClientRect();
  const viewportMidY = window.innerHeight / 2;
  const cardMidY = rect.top + rect.height / 2;
  const delta = cardMidY - viewportMidY;

  const halfViewport = viewportMidY;
  const distFromMid = Math.abs(delta);
  const rawT =
    halfViewport > 0 ? Math.min(1, distFromMid / halfViewport) : 0;
  const tViewport = rawT * 0.82 + 0.18;

  const angleMag = tViewport * maxDeg;

  if (delta < 0) return -angleMag;
  return angleMag;
}

function applyTiltTransform(el: HTMLElement, deg: number): void {
  if (deg === 0) {
    el.style.removeProperty('transform');
    return;
  }
  /* perspective() на самом элементе — не зависит от схлопывания цепочки preserve-3d у предков */
  el.style.transform = `perspective(${TILT_PERSPECTIVE_PX}px) translate3d(0, 0, 0.1px) rotateX(${deg}deg)`;
}

export type DocumentTiltPointerHandlers = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

/**
 * hoverRef — внешний .document__box без transform (стабильный hit-test, без мерцания).
 * tiltRef — внутренний слой, куда пишется transform.
 */
export function useDocumentLayoutTilt(
  hoverRef: RefObject<HTMLElement | null>,
  tiltRef: RefObject<HTMLElement | null>,
  isEnabled: boolean,
  options: DocumentLayoutTiltOptions,
): DocumentTiltPointerHandlers | Record<string, never> {
  const { maxDeg } = options;
  const lastScrollMsRef = useRef(0);
  const scrollCleanupRef = useRef<(() => void) | null>(null);

  const computeAndApply = useCallback(() => {
    const measureEl = hoverRef.current;
    const tiltEl = tiltRef.current;
    if (!measureEl || !tiltEl) return;
    const deg = computeHoverRotateXDeg(measureEl, maxDeg);
    applyTiltTransform(tiltEl, deg);
  }, [hoverRef, tiltRef, maxDeg]);

  const detachScroll = useCallback(() => {
    scrollCleanupRef.current?.();
    scrollCleanupRef.current = null;
  }, []);

  const attachScroll = useCallback(() => {
    detachScroll();

    const onScrollOrResize = () => {
      const now = performance.now();
      if (now - lastScrollMsRef.current < 100) return;
      lastScrollMsRef.current = now;
      computeAndApply();
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    scrollCleanupRef.current = () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [detachScroll, computeAndApply]);

  const onMouseEnter = useCallback(() => {
    attachScroll();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        computeAndApply();
      });
    });
  }, [attachScroll, computeAndApply]);

  const onMouseLeave = useCallback(() => {
    detachScroll();
    const tiltEl = tiltRef.current;
    if (tiltEl) tiltEl.style.removeProperty('transform');
  }, [detachScroll, tiltRef]);

  useEffect(() => {
    return () => {
      detachScroll();
    };
  }, [detachScroll]);

  useEffect(() => {
    if (!ENABLE_DOCUMENT_LAYOUT_TILT || !isEnabled) {
      const tiltEl = tiltRef.current;
      if (tiltEl) tiltEl.style.removeProperty('transform');
    }
  }, [isEnabled, tiltRef]);

  if (
    !ENABLE_DOCUMENT_LAYOUT_TILT ||
    !isEnabled ||
    (typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ) {
    return {};
  }

  return { onMouseEnter, onMouseLeave };
}
