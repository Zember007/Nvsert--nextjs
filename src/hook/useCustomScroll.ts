import { useEffect, useRef } from 'react';

export interface CustomScrollOptions {
  smoothScrollFactor?: number; // Коэффициент плавности скролла (по умолчанию 0.15)
  scrollPadding?: number; // Отступ скроллбара (по умолчанию 2)
  minWidth?: number; // Минимальная ширина экрана для активации (по умолчанию 768)
  enabled?: boolean; // Включен ли скролл (по умолчанию true)
  target?: 'window' | 'container'; // Цель скролла: window или container (по умолчанию 'window')
  containerRef?: React.RefObject<any>; // Ссылка на контейнер для скролла (обязательно если target === 'container')
}

export const useCustomScroll = (options: CustomScrollOptions = {}) => {
  const {
    smoothScrollFactor = 0.15,
    scrollPadding = 2,
    minWidth = 768,
    enabled = true,
    target = 'window',
    containerRef
  } = options;

  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !scrollbarRef.current) return;

    // Для container mode обязательно нужен containerRef
    if (target === 'container' && !containerRef?.current) return;

    let currentScroll = 0;
    let targetScroll = 0;
    let isScrolling = false;

    const isWindowMode = target === 'window';
    const container = containerRef?.current;

    // Инициализируем текущую прокрутку
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
      e.preventDefault();
      targetScroll += wheelEvent.deltaY;

      // Ограничим targetScroll в пределах документа/контейнера
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

    // Добавляем обработчик wheel к нужному элементу
    const wheelTarget = isWindowMode ? window : container;
    if (wheelTarget) {
      wheelTarget.addEventListener('wheel', handleWheel, { passive: false });
    }

    let isTicking = false;
    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    const scrollbar = scrollbarRef.current;

    // Проверяем ширину экрана (только для window mode)
    if (isWindowMode && minWidth && window.innerWidth < minWidth) return;

    // Обновление позиции и высоты ползунка при прокрутке
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
      
      // Высота ползунка
      const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
      // Позиция ползунка
      const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
      const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

      // Обновляем CSS-переменные
      scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
      scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
      if (scrollbarHeight === clientHeight) {
        scrollbar.style.display = 'none';
      } else {
        scrollbar.style.display = '';
      }
    }

    function scrollMove(e: TouchEvent | MouseEvent) {
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

      // Вычисляем смещение
      let clientY = 0;

      if (e instanceof TouchEvent) {
        clientY = e.touches[0].clientY;
      } else {
        clientY = e.clientY;
      }

      const deltaY = clientY - startY;
      const scrollDelta = (deltaY / maxTop) * maxScroll;

      // Прокручиваем страницу или контейнер
      if (isWindowMode) {
        window.scrollTo({
          top: startScrollTop + scrollDelta,
          behavior: 'auto'
        });
      } else if (container) {
        container.scrollTop = startScrollTop + scrollDelta;
      }
    }

    function startScroll(e: TouchEvent | MouseEvent) {
      isDragging = true;
      let clientY = 0;

      if (e instanceof TouchEvent) {
        clientY = e.touches[0].clientY;
      } else {
        clientY = e.clientY;
      }
      
      startY = clientY;
      
      if (isWindowMode) {
        startScrollTop = window.scrollY || window.pageYOffset;
      } else if (container) {
        startScrollTop = container.scrollTop;
      }
      
      e.preventDefault();
    }

    const handleResize = () => updateScrollbar();

    // Обработчик прокрутки
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

    // Добавляем обработчики событий
    if (isWindowMode) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
    } else if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    scrollbar.addEventListener('mousedown', startScroll);
    document.addEventListener('mousemove', scrollMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    scrollbar.addEventListener('touchstart', startScroll);
    document.addEventListener('touchmove', scrollMove);
    document.addEventListener('touchend', handleTouchEnd);

    updateScrollbar();

    // Cleanup функция
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
      
      if (scrollbar) {
        scrollbar.removeEventListener('mousedown', startScroll);
        scrollbar.removeEventListener('touchstart', startScroll);
      }
      
      document.removeEventListener('mousemove', scrollMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', scrollMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [smoothScrollFactor, scrollPadding, minWidth, enabled, target, containerRef]);

  return { scrollbarRef };
}; 