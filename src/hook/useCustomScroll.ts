import { useEffect, useLayoutEffect, useRef } from 'react';

export interface CustomScrollOptions {
  smoothScrollFactor?: number; // Коэффициент плавности скролла (по умолчанию 0.15)
  scrollPadding?: number; // Отступ скроллбара (по умолчанию 2)
  minWidth?: number; // Минимальная ширина экрана для активации (по умолчанию 900)
  enabled?: boolean; // Включен ли скролл (по умолчанию true)
  target?: 'window' | 'container'; // Цель скролла: window или container (по умолчанию 'window')
  containerRef?: React.RefObject<any>; // Ссылка на контейнер для скролла (обязательно если target === 'container')
  priorityScroll?: boolean; // Приоритетный скролл для textarea (по умолчанию false)
}

export const useCustomScroll = (options: CustomScrollOptions = {}) => {
  const {
    smoothScrollFactor = 0.15,
    scrollPadding = 2,
    minWidth = 900,
    enabled = true,
    target = 'window',
    containerRef,
    priorityScroll = false
  } = options;

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    if (!enabled || !scrollbarRef.current) return;

    // Для container mode обязательно нужен containerRef
    if (target === 'container' && !containerRef?.current) return;

    console.log('useCustomScroll: Initializing with options:', {
      target,
      priorityScroll,
      containerRef: containerRef?.current,
      enabled
    });

    let currentScroll = 0;
    let targetScroll = 0;
    let isScrolling = false;

    const isWindowMode = target === 'window';
    const container = containerRef?.current;

    console.log('useCustomScroll: Container resolved:', container);

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

      // Если это приоритетный скролл (textarea), проверяем возможность скролла в контейнере
      if (priorityScroll && container) {
        // Проверяем, находится ли курсор мыши над textarea
        const mouseX = wheelEvent.clientX;
        const mouseY = wheelEvent.clientY;
        const containerRect = container.getBoundingClientRect();
        const isMouseOverTextarea = mouseX >= containerRect.left &&
          mouseX <= containerRect.right &&
          mouseY >= containerRect.top &&
          mouseY <= containerRect.bottom;



        // Если курсор не над textarea, позволяем скроллить страницу
        if (!isMouseOverTextarea) {
          return;
        }

        const containerScrollTop = container.scrollTop;
        const containerScrollHeight = container.scrollHeight;
        const containerClientHeight = container.clientHeight;
        const containerMaxScroll = containerScrollHeight - containerClientHeight;

        // Проверяем, можно ли скроллить в контейнере
        const canScrollUp = containerScrollTop > 0;
        const canScrollDown = containerScrollTop < containerMaxScroll;

        // Если скроллим вверх и есть место для скролла вверх в контейнере
        if ((wheelEvent.deltaY < 0 && canScrollUp) || (wheelEvent.deltaY > 0 && canScrollDown)) {
          e.preventDefault();
          e.stopPropagation(); // <-- ключевой момент: не даём событию "утечь" наверх
          targetScroll += wheelEvent.deltaY;
          targetScroll = Math.max(0, Math.min(targetScroll, containerMaxScroll));

          if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(smoothScroll);
          }
          return;
        }



        // Если контейнер доскроллен до конца и скроллим вниз, или до начала и скроллим вверх
        // Позволяем скроллить страницу с небольшой задержкой
        if ((wheelEvent.deltaY > 0 && !canScrollDown) || (wheelEvent.deltaY < 0 && !canScrollUp)) {
          const now = Date.now();
          // Добавляем небольшую задержку для плавного переключения
          if (now - lastScrollTimeRef.current > 50) {
            lastScrollTimeRef.current = now;
            // Не предотвращаем событие, позволяем скроллить страницу
            return;
          }
        }
      }

      // Обычная логика для window mode или container без приоритета
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

    function scrollMove(e: MouseEvent) {
      console.log('scrollMove');

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


      clientY = e.clientY;


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

    function scrollTouchMove(e: TouchEvent) {
      console.log('scrollMove');

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


      clientY = e.touches[0].clientY;


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

    function startScroll(clientY: number) {



      startY = clientY;

      if (isWindowMode) {
        startScrollTop = window.scrollY || window.pageYOffset;
      } else if (container) {
        startScrollTop = container.scrollTop;
      }

     
    }

    const handleResize = () => updateScrollbar();

    // Дебаунсированная функция обновления скроллбара
    const debouncedUpdateScrollbar = () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = setTimeout(() => {
        updateScrollbar();
      }, 16); // ~60fps
    };

    // ResizeObserver для отслеживания изменений размеров контейнера и его содержимого
    const resizeObserver = new ResizeObserver(() => {
      debouncedUpdateScrollbar();
    });

    // MutationObserver для отслеживания изменений DOM, которые могут повлиять на scrollHeight
    const mutationObserver = new MutationObserver(() => {
      debouncedUpdateScrollbar();
    });

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
      // Наблюдаем за изменениями размеров body для window mode
      resizeObserver.observe(document.body);
      // Наблюдаем за изменениями содержимого документа
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    } else if (container) {
      container.addEventListener('scroll', handleScroll);
      // Наблюдаем за изменениями размеров контейнера
      resizeObserver.observe(container);
      // Наблюдаем за изменениями содержимого контейнера
      mutationObserver.observe(container, { childList: true, subtree: true });
    }

    scrollbar.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      e.preventDefault();
      startScroll(e.clientY)
    });
    document.addEventListener('mousemove', scrollMove);
    document.addEventListener('mouseup', handleMouseUp);

    scrollbar.addEventListener('touchstart', (e: TouchEvent) => {
      isDragging = true;
      e.preventDefault();
      startScroll(e.touches[0].clientY);
    });
    document.addEventListener('touchmove', scrollTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    setTimeout(() => {
      updateScrollbar();
    }, 100);

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

      // Отключаем ResizeObserver и MutationObserver
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      // Очищаем timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      if (scrollbar) {
        scrollbar.removeEventListener('mousedown', (e: MouseEvent) => {
          isDragging = true;
          e.preventDefault();
          startScroll(e.clientY);
        });
        scrollbar.removeEventListener('touchstart', (e: TouchEvent) => {
          isDragging = true;
          e.preventDefault();
          startScroll(e.touches[0].clientY);
        });
      }

      document.removeEventListener('mousemove', scrollMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', scrollTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [smoothScrollFactor, scrollPadding, minWidth, enabled, target, containerRef, priorityScroll]);

  return { scrollbarRef };
}; 