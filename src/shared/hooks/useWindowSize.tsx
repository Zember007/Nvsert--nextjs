import { useState, useEffect } from 'react';

// Глобальный менеджер для размеров окна
class WindowSizeManager {
  private listeners = new Set<(size: { width: number; height: number }) => void>();
  private size = { width: 0, height: 0 };
  private timeoutId: NodeJS.Timeout | null = null;
  private isListening = false;

  private handleResize = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      this.notifyListeners();
    }, 150);
  };

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.size));
  }

  subscribe(listener: (size: { width: number; height: number }) => void) {
    this.listeners.add(listener);

    // Запускаем слушатель только при первой подписке
    if (!this.isListening) {
      this.size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      window.addEventListener('resize', this.handleResize);
      this.isListening = true;
    }

    // Сразу отправляем текущее значение
    listener(this.size);

    // Возвращаем функцию отписки
    return () => {
      this.listeners.delete(listener);

      // Останавливаем слушатель, если нет подписчиков
      if (this.listeners.size === 0) {
        window.removeEventListener('resize', this.handleResize);
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        this.isListening = false;
      }
    };
  }
}

const windowSizeManager = new WindowSizeManager();

// Оптимизированный хук
function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    return windowSizeManager.subscribe(setSize);
  }, []);

  return size;
}

export default useWindowSize;