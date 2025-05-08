import { usePathname } from 'next/navigation';
import { useEffect, RefObject } from 'react';

interface UseBackgroundBrightnessProps {
  headerRef: RefObject<HTMLElement | null>;
  simpleBar: any;
}

const useBackgroundBrightness = ({ headerRef, simpleBar }: UseBackgroundBrightnessProps) => {

  const pathname = usePathname()

  const updateTextColor = () => {
    const element = headerRef.current;
    if (!element || !simpleBar) return;

    const rect = element.getBoundingClientRect();

    const points = [
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, // центр
      { x: rect.left + 10, y: rect.top + 10 }, // верхний левый угол
      { x: rect.right - 10, y: rect.bottom - 10 }, // нижний правый угол
      { x: rect.left + 20, y: rect.top + 20 }, // дополнительные точки
      { x: rect.right - 20, y: rect.top + 20 },
    ];

    let brightness: number = 0;
    let validColorFound: boolean = false;
    let bgColor: string | null = null;
    let foundElement: HTMLElement | null = null;
    let checkedElements: string[] = []; // Для логирования всех проверенных элементов

    for (const { x, y } of points) {
      // Корректировка координат относительно simpleBar
      const scrollContainer = simpleBar.getScrollElement();
      const scrollRect = scrollContainer.getBoundingClientRect();
      const adjustedX = x - scrollRect.left;
      const adjustedY = y - scrollRect.top;



      const elements = document.elementsFromPoint(x, y) 
      console.log(elements);
      

      const underlyingElements = elements.filter(
        (el) =>
          el.tagName === 'SECTION' ||
          (el.tagName === 'DIV' &&
            (el.classList.contains('content') ||
              el.classList.contains('block') ||
              el.classList.contains('section')))
      );


      // Логируем все найденные элементы
      checkedElements = underlyingElements.map((el) => `${el.tagName}.${el.className}`);

      for (const underlyingElement of underlyingElements) {
        
        const computedStyle = window.getComputedStyle(underlyingElement);
        bgColor = computedStyle.backgroundColor;

        // Пропускаем прозрачные или слабо непрозрачные фоны
        if (
          !bgColor ||
          bgColor === 'transparent' ||
          bgColor === 'rgba(0, 0, 0, 0)' ||
          (bgColor.includes('rgba') && parseFloat(bgColor.split(',')[3]) <= 0.5)
        ) {
          // Проверяем фоновое изображение
          const bgImage = computedStyle.backgroundImage;
          if (bgImage && bgImage !== 'none') {
            getColorFromBackgroundImage(underlyingElement, adjustedX, adjustedY).then((color) => {
              if (color) {
                bgColor = color;
                const rgb = bgColor.match(/\d+/g);
                if (rgb) {
                  const r = parseInt(rgb[0], 10);
                  const g = parseInt(rgb[1], 10);
                  const b = parseInt(rgb[2], 10);
                  brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                  validColorFound = true;

                  if (validColorFound && element) {
                    element.classList.toggle('black', brightness > 128);

                  }
                }
              }
            });
            if (validColorFound) break;
          }

          // Поднимаемся по DOM-дереву
          let parent: HTMLElement | null = underlyingElement.parentElement;
          while (parent && !validColorFound) {
            const parentStyle = window.getComputedStyle(parent);
            bgColor = parentStyle.backgroundColor;
            if (
              bgColor &&
              bgColor !== 'transparent' &&
              bgColor !== 'rgba(0, 0, 0, 0)' &&
              (!bgColor.includes('rgba') || parseFloat(bgColor.split(',')[3]) > 0.5)
            ) {
              foundElement = parent;
              break;
            }
            parent = parent.parentElement;
          }

          if (!parent) {
            // Проверяем фон body
            const bodyStyle = window.getComputedStyle(document.body);
            bgColor = bodyStyle.backgroundColor;
            foundElement = document.body;
            if (
              !bgColor ||
              bgColor === 'transparent' ||
              bgColor === 'rgba(0, 0, 0, 0)' ||
              (bgColor.includes('rgba') && parseFloat(bgColor.split(',')[3]) <= 0.5)
            ) {
              bgColor = 'rgb(255, 255, 255)'; // Запасной цвет (белый)
              foundElement = null;
            }
          }
        } else {
          foundElement = underlyingElement as HTMLElement;
        }

        if (!bgColor) continue;

        const rgb = bgColor.match(/\d+/g);
        if (!rgb) continue;

        const r = parseInt(rgb[0], 10);
        const g = parseInt(rgb[1], 10);
        const b = parseInt(rgb[2], 10);
        brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        validColorFound = true;
        break; // Нашли подходящий фон
      }

      if (validColorFound) break; // Выходим, если нашли цвет
    }

    // Обновляем класс

    if (validColorFound && element) {
      element.classList.toggle('black', brightness > 128);
      document.querySelector('.services-menu')?.classList.toggle('black', brightness > 128)
    } else {
      element.classList.toggle('black', true); // Запасной: светлый фон
      document.querySelector('.services-menu')?.classList.toggle('black', true)
    }

    // Логирование для отладки   
  };

  // Функция для получения цвета из фонового изображения
  const getColorFromBackgroundImage = async (element: Element, x: number, y: number): Promise<string | null> => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const img = new Image();
      const bgImage = window.getComputedStyle(element).backgroundImage;

      const urlMatch = bgImage.match(/url\(["']?([^"']*)["']?\)/);
      if (!urlMatch) return null;

      img.crossOrigin = 'Anonymous';
      img.src = urlMatch[1];

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
      });

      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    } catch (e) {
      console.error('Error processing background image:', e);
      return null;
    }
  };

  useEffect(() => {
    const element = headerRef.current;
    if (!element || !simpleBar) return;



    const scrollContainer = simpleBar.getScrollElement();
    let timeoutId: NodeJS.Timeout | null = null;
    let time = Date.now()
    scrollContainer.addEventListener('scroll', () => {


      if (timeoutId) clearTimeout(timeoutId);
      if (time + 200 <= Date.now()) {
        updateTextColor();
        time = Date.now()
      }

      timeoutId = setTimeout(() => {
        updateTextColor();
      }, 500);
    });


    // Начальная проверка
    updateTextColor();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateTextColor);
      }
    };
  }, [headerRef, simpleBar]);

  useEffect(() => {
    updateTextColor()
  }, [pathname])
};

export default useBackgroundBrightness;