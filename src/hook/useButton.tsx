import { useRef, useCallback, useEffect } from 'react';

export const useButton = () => {
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const wrapperRefs = useRef<HTMLDivElement[]>([]);

  // Функции для добавления элементов в массивы рефов
  const setWrapperRef = useCallback((el: HTMLDivElement | null) => {
    if (!el || wrapperRefs.current.includes(el)) return;
    wrapperRefs.current.push(el);
  }, []);

  const setButtonRef = useCallback((el: HTMLButtonElement | null) => {
    if (!el || buttonRefs.current.includes(el)) return;
    buttonRefs.current.push(el);
  }, []);

  useEffect(() => {
    const buttons = buttonRefs.current;
    const wrappers = wrapperRefs.current;

    if (!buttons.length || !wrappers.length) return;

    const resetTransform = (element: HTMLElement) => {
      element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    buttons.forEach((button, index) => {
      const wrapper = wrappers[index];
      if (!button || !wrapper) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;



        button.style.setProperty("--mouse-x", `${mouseX}px`);
        button.style.setProperty("--mouse-y", `${mouseY}px`);

        // Вычисляем центр элемента
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Вектор от центра к мыши
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        // Вычисляем угол в градусах
        const angleRad = Math.atan2(dy, dx);
        const angleDeg = angleRad * (180 / Math.PI);

        // Устанавливаем угол градиента
        button.style.setProperty('--gradient-angle', `${angleDeg}deg`);

        // const rotateX = (mouseY / rect.height) * 15 - 7;
        const rotateY = (mouseX / rect.width) * -15 + 7;
        // button.style.setProperty('--x', `${-rotateX}deg`);
        button.style.setProperty('--y', `${-rotateY}deg`);
      };

      const handleMouseLeave = () => resetTransform(button);
      const handleBlur = () => resetTransform(button);

      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('blur', handleBlur);

      // Очистка слушателей при размонтировании
      return () => {
        wrapper.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('blur', handleBlur);
      };
    });
  }, []);

  return { setButtonRef, setWrapperRef };
};