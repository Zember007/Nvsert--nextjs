import { useState, useEffect } from 'react';

function useWindowSize(): { width: number, height: number } {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Очищаем предыдущий таймер
      clearTimeout(timeoutId);

      // Устанавливаем новый таймер с debounce
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);

      }, 150); // 150ms debounce
    };

    // Устанавливаем начальное значение без debounce
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { width, height };
}

export default useWindowSize;
