import { useLayoutEffect, useRef } from 'react';

export interface CustomScrollOptions {
  smoothScrollFactor?: number;
  scrollPadding?: number;
  minWidth?: number;
  enabled?: boolean;
  target?: 'window' | 'container';
  containerRef?: React.RefObject<unknown>;
  priorityScroll?: boolean;
}

export const useCustomScroll = (options: CustomScrollOptions = {}) => {
  const {
    smoothScrollFactor = 0.15,
    scrollPadding = 2,
    minWidth = 960,
    enabled = true,
    target = 'window',
    containerRef,
    priorityScroll = false,
  } = options;

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    if (!enabled || !scrollbarRef.current) return;
    if (target === 'container' && !containerRef?.current) return;

    let currentScroll = 0;
    let targetScroll = 0;
    let isScrolling = false;

    const isWindowMode = target === 'window';
    const container = containerRef?.current as HTMLElement | null | undefined;

    const initScroll = () => {
      if (isWindowMode) {
        currentScroll = window.scrollY;
      } else if (container) {
        currentScroll = container.scrollTop;
      }
      targetScroll = currentScroll;
    };

    const smoothScroll = () => {
      if (document.body.style.overflow === 'hidden') return;
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) < 0.1) {
        isScrolling = false;
        return;
      }
      currentScroll += diff * smoothScrollFactor;

      if (isWindowMode) {
        window.scrollTo(0, currentScroll);
      } else if (container) {
        container.scrollTop = currentScroll;
      }

      requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;

      if (priorityScroll && container) {
        const mouseX = wheelEvent.clientX;
        const mouseY = wheelEvent.clientY;
        const containerRect = container.getBoundingClientRect();
        const isMouseOverTextarea =
          mouseX >= containerRect.left &&
          mouseX <= containerRect.right &&
          mouseY >= containerRect.top &&
          mouseY <= containerRect.bottom;

        if (!isMouseOverTextarea) return;

        const containerScrollTop = container.scrollTop;
        const containerScrollHeight = container.scrollHeight;
        const containerClientHeight = container.clientHeight;
        const containerMaxScroll = containerScrollHeight - containerClientHeight;

        const canScrollUp = containerScrollTop > 0;
        const canScrollDown = containerScrollTop < containerMaxScroll;

        if (
          (wheelEvent.deltaY < 0 && canScrollUp) ||
          (wheelEvent.deltaY > 0 && canScrollDown)
        ) {
          e.preventDefault();
          e.stopPropagation();
          targetScroll += wheelEvent.deltaY;
          targetScroll = Math.max(0, Math.min(targetScroll, containerMaxScroll));

          if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(smoothScroll);
          }
          return;
        }

        if (
          (wheelEvent.deltaY > 0 && !canScrollDown) ||
          (wheelEvent.deltaY < 0 && !canScrollUp)
        ) {
          const now = Date.now();
          if (now - lastScrollTimeRef.current > 50) {
            lastScrollTimeRef.current = now;
            return;
          }
        }
      }

      e.preventDefault();
      targetScroll += wheelEvent.deltaY;

      let maxScroll: number;
      let clientHeight: number;

      if (isWindowMode) {
        maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        clientHeight = window.innerHeight;
      } else if (container) {
        maxScroll = container.scrollHeight - container.clientHeight;
        clientHeight = container.clientHeight;
      } else {
        return;
      }

      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    initScroll();

    const wheelTarget: Window | HTMLElement | null = isWindowMode ? window : container ?? null;
    if (wheelTarget) {
      wheelTarget.addEventListener('wheel', handleWheel, { passive: false });
    }

    let isTicking = false;
    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    const scrollbar = scrollbarRef.current;

    if (isWindowMode && minWidth && window.innerWidth < minWidth) return;

    function updateScrollbar() {
      if (!scrollbar) return;

      let scrollTop: number;
      let scrollHeight: number;
      let clientHeight: number;

      if (isWindowMode) {
        scrollTop = window.scrollY || window.pageYOffset;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight || document.documentElement.clientHeight;
      } else if (container) {
        scrollTop = container.scrollTop;
        scrollHeight = container.scrollHeight;
        clientHeight = container.clientHeight;
      } else {
        return;
      }

      const maxScroll = scrollHeight - clientHeight;
      const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
      const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
      const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

      scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
      scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
      scrollbar.style.display = scrollbarHeight === clientHeight ? 'none' : '';
    }

    function scrollMove(e: MouseEvent) {
      if (!isDragging || document.body.style.overflow === 'hidden') return;

      let scrollHeight: number;
      let clientHeight: number;

      if (isWindowMode) {
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight || document.documentElement.clientHeight;
      } else if (container) {
        scrollHeight = container.scrollHeight;
        clientHeight = container.clientHeight;
      } else {
        return;
      }

      const maxScroll = scrollHeight - clientHeight;
      const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
      const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;

      const deltaY = e.clientY - startY;
      const scrollDelta = (deltaY / maxTop) * maxScroll;

      if (isWindowMode) {
        window.scrollTo({ top: startScrollTop + scrollDelta, behavior: 'auto' });
      } else if (container) {
        container.scrollTop = startScrollTop + scrollDelta;
      }
    }

    function scrollTouchMove(e: TouchEvent) {
      if (!isDragging || document.body.style.overflow === 'hidden') return;

      let scrollHeight: number;
      let clientHeight: number;

      if (isWindowMode) {
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight || document.documentElement.clientHeight;
      } else if (container) {
        scrollHeight = container.scrollHeight;
        clientHeight = container.clientHeight;
      } else {
        return;
      }

      const maxScroll = scrollHeight - clientHeight;
      const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
      const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;

      const deltaY = e.touches[0].clientY - startY;
      const scrollDelta = (deltaY / maxTop) * maxScroll;

      if (isWindowMode) {
        window.scrollTo({ top: startScrollTop + scrollDelta, behavior: 'auto' });
      } else if (container) {
        container.scrollTop = startScrollTop + scrollDelta;
      }
    }

    function startScroll(clientY: number) {
      startY = clientY;
      if (isWindowMode) {
        startScrollTop = window.scrollY || window.pageYOffset;
      } else if (container) {
        startScrollTop = container.scrollTop;
      }
    }

    const debouncedUpdateScrollbar = () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = setTimeout(() => {
        updateScrollbar();
      }, 16);
    };

    const resizeObserver = new ResizeObserver(() => {
      debouncedUpdateScrollbar();
    });

    const mutationObserver = new MutationObserver(() => {
      debouncedUpdateScrollbar();
    });

    const handleScroll = () => {
      if (!isScrolling) {
        if (isWindowMode) {
          currentScroll = window.scrollY;
        } else if (container) {
          currentScroll = container.scrollTop;
        }
        targetScroll = currentScroll;
      }

      if (!isTicking) {
        requestAnimationFrame(() => {
          updateScrollbar();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const handleResize = () => updateScrollbar();

    if (isWindowMode) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      resizeObserver.observe(document.body);
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    } else if (container) {
      container.addEventListener('scroll', handleScroll);
      resizeObserver.observe(container);
      mutationObserver.observe(container, { childList: true, subtree: true });
    }

    const handleScrollbarMouseDown = (e: MouseEvent) => {
      isDragging = true;
      e.preventDefault();
      startScroll(e.clientY);
    };

    const handleScrollbarTouchStart = (e: TouchEvent) => {
      isDragging = true;
      e.preventDefault();
      startScroll(e.touches[0].clientY);
    };

    scrollbar.addEventListener('mousedown', handleScrollbarMouseDown);
    scrollbar.addEventListener('touchstart', handleScrollbarTouchStart);
    document.addEventListener('mousemove', scrollMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', scrollTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    setTimeout(() => {
      updateScrollbar();
    }, 100);

    return () => {
      if (wheelTarget) {
        wheelTarget.removeEventListener('wheel', handleWheel);
      }

      if (isWindowMode) {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      } else if (container) {
        container.removeEventListener('scroll', handleScroll);
      }

      resizeObserver.disconnect();
      mutationObserver.disconnect();

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      scrollbar.removeEventListener('mousedown', handleScrollbarMouseDown);
      scrollbar.removeEventListener('touchstart', handleScrollbarTouchStart);
      document.removeEventListener('mousemove', scrollMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', scrollTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    smoothScrollFactor,
    scrollPadding,
    minWidth,
    enabled,
    target,
    containerRef,
    priorityScroll,
  ]);

  return { scrollbarRef };
};


