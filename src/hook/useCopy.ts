import { useState } from 'react';

interface CopyPosition {
  x: number;
  y: number;
}

export const useCopy = () => {
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [notificationPosition, setNotificationPosition] = useState<CopyPosition | null>(null);

  const handleCopy = async (text: string, event: React.MouseEvent) => {
    await navigator.clipboard.writeText(text);

    setTimeout(() => {
      try {
        
        if (!event.target) return;
        
                // Получаем координаты кнопки
          const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect();

          if(!rect) return;
          
          // Проверяем, чтобы уведомление не выходило за пределы экрана
          const notificationWidth = 200; // примерная ширина уведомления
          
          let x = rect.right;
          let y = rect.top - 20 - (event.target as HTMLElement).offsetHeight;
          
       
          
          // Если уведомление выходит за верхний край экрана
          if (y < 0) {
            y = rect.bottom + 10;
          }
  console.log({
    x,
    y
  });
  
          setNotificationPosition({
            x,
            y
          });
        
        setShowCopyNotification(true);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }, 500);
  };

  const hideNotification = () => {
    setShowCopyNotification(false);
    setNotificationPosition(null);
  };

  return {
    showCopyNotification,
    notificationPosition,
    handleCopy,
    hideNotification
  };
}; 