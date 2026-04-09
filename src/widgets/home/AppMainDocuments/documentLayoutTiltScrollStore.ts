/**
 * Один общий scroll/resize для карточек документов.
 * Scroll сильно троттлится (сотни событий/с → иначе 60 вызовов notify/сек и reflow).
 */

const listeners = new Set<() => void>();

/** Не чаще ~6–7 раз в секунду во время скролла */
const SCROLL_MIN_INTERVAL_MS = 150;
/** Resize реже дергается — можно чаще, но тот же порядок */
const RESIZE_MIN_INTERVAL_MS = 100;

let rafId: number | null = null;
let attached = false;

let lastScrollNotify = 0;
let scrollTrailingTimer: ReturnType<typeof setTimeout> | null = null;

let lastResizeNotify = 0;

function notifyAll() {
  listeners.forEach((fn) => {
    fn();
  });
}

function scheduleNotify() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    notifyAll();
  });
}

function flushScrollTrailing() {
  scrollTrailingTimer = null;
  lastScrollNotify = performance.now();
  scheduleNotify();
}

function onScroll() {
  const now = performance.now();
  const delta = now - lastScrollNotify;

  if (delta >= SCROLL_MIN_INTERVAL_MS) {
    if (scrollTrailingTimer !== null) {
      clearTimeout(scrollTrailingTimer);
      scrollTrailingTimer = null;
    }
    lastScrollNotify = now;
    scheduleNotify();
    return;
  }

  const wait = SCROLL_MIN_INTERVAL_MS - delta;
  if (scrollTrailingTimer === null) {
    scrollTrailingTimer = setTimeout(flushScrollTrailing, wait);
  }
}

function onResize() {
  const now = performance.now();
  if (now - lastResizeNotify < RESIZE_MIN_INTERVAL_MS) {
    return;
  }
  lastResizeNotify = now;
  scheduleNotify();
}

function attachGlobalListeners() {
  if (attached) return;
  attached = true;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
}

function detachGlobalListeners() {
  if (!attached) return;
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  attached = false;
  if (scrollTrailingTimer !== null) {
    clearTimeout(scrollTrailingTimer);
    scrollTrailingTimer = null;
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function subscribeDocumentLayoutTiltScroll(listener: () => void): () => void {
  listeners.add(listener);
  attachGlobalListeners();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      detachGlobalListeners();
    }
  };
}
