import { useRef, useCallback } from 'react';

// Кастомный хук для управления эффектом "drop"
export const useDropEffect = () => {
    const buttonRef = useRef<HTMLDivElement | null>(null);

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const button = buttonRef.current;
            if (!button) return;

            const opacity = parseFloat(window.getComputedStyle(button).opacity);
            const windowWidth = window.innerWidth;

            if (opacity > 0 && windowWidth >= 1008) {
                const rect = button.getBoundingClientRect();
                const maxWidthHeight = Math.max(rect.width, rect.height) ;

                let drop = button.querySelector('.drop') as HTMLElement | null;
                if (!drop || window.getComputedStyle(drop).opacity !== '1') {
                    drop = document.createElement('b');
                    drop.className = 'drop';
                    drop.style.width = `${maxWidthHeight}px`;
                    drop.style.height = `${maxWidthHeight}px`;
                    button.insertBefore(drop, button.firstChild);
                }

                const x = event.clientX - rect.left - maxWidthHeight / 2;
                const y = event.clientY - rect.top - maxWidthHeight / 2;

                drop.style.top = `${y}px`;
                drop.style.left = `${x}px`;

                if (drop.classList.contains('animate')) {
                    drop.classList.remove('animate');
                    drop.classList.add('animate-reverse');

                } else {
                    drop.classList.remove('animate-reverse');

                    drop.classList.add('animate');
                }


            }
        },
        []
    );

    return { buttonRef, handleMouseDown };
};