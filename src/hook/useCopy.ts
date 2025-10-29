import { useState } from 'react';

interface CopyPosition {
  x: number;
  y: number;
}

export const useCopy = () => {
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [notificationPosition, setNotificationPosition] = useState<CopyPosition | null>(null);

  const handleCopy = (text: string, event: React.MouseEvent) => {

    event.preventDefault();
    event.stopPropagation();

    navigator.clipboard.writeText(text);
    if (!event.currentTarget) return;

    // Получаем координаты кнопки
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    if (!rect) return;



    let x = rect.right;
    let y = rect.top - 10 - (event.currentTarget as HTMLElement).offsetHeight;



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