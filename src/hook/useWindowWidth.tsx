import { useState, useEffect } from 'react';

function useWindowWidth(): number | null {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      // Очищаем предыдущий таймер
      clearTimeout(timeoutId);
      
      // Устанавливаем новый таймер с debounce
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 150); // 150ms debounce
    };
    
    // Устанавливаем начальное значение без debounce
    setWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return width;
}

export default useWindowWidth;
