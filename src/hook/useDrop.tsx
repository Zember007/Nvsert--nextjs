import { useRef, useCallback, useState } from 'react';

// Кастомный хук для управления эффектом "drop"
export const useDropEffect = () => {
    const buttonRef = useRef<HTMLDivElement | null>(null);


    const handleMouseDown = useCallback(
        (active: boolean, event?: React.MouseEvent<HTMLDivElement>) => {
            const button = buttonRef.current;
            if (!button) return;


            const opacity = parseFloat(window.getComputedStyle(button).opacity);
            const windowWidth = window.innerWidth;

            if (opacity > 0 && windowWidth >= 1008) {
                const rect = button.getBoundingClientRect();
                const maxWidthHeight = Math.max(rect.width, rect.height);

                let drop = button.querySelector('.drop') as HTMLElement | null;
                let drop_reverse = button.querySelector('.drop-reverse') as HTMLElement | null;

                if (!drop_reverse) {
                    drop_reverse = document.createElement('b');
                    drop_reverse.className = 'drop-reverse';
                    drop_reverse.style.width = `${maxWidthHeight}px`;
                    drop_reverse.style.height = `${maxWidthHeight}px`;
                    button.insertBefore(drop_reverse, button.firstChild);
                }

                if (!drop) {
                    drop = document.createElement('b');
                    drop.className = 'drop';
                    drop.style.width = `${maxWidthHeight}px`;
                    drop.style.height = `${maxWidthHeight}px`;
                    button.insertBefore(drop, button.firstChild);
                }



                const x = event ? event.clientX - rect.left - maxWidthHeight / 2 : rect.left - maxWidthHeight / 2
                const y = event ? event.clientY - rect.top - maxWidthHeight / 2 : rect.top - maxWidthHeight / 2;

                drop.style.top = `${y}px`;
                drop.style.left = `${x}px`;
                drop_reverse.style.top = `${y}px`;
                drop_reverse.style.left = `${x}px`;

                if (active) {
                    drop_reverse.classList.add('animate');

                } else {                    
                    drop_reverse.removeEventListener('animationend',() => {})
                    drop_reverse.remove()
                    if(drop.classList.contains('animate')) {
                        drop.classList.remove('animate');
                        setTimeout(() => {
                            drop.classList.add('animate');
                        },50)
                    } else {

                        drop.classList.add('animate');
                    }
                }

                drop_reverse.addEventListener('animationend', () => {
                    drop_reverse.classList.remove('animate');
                    drop.classList.remove('animate');
                }, { once: true });


            }
        },
        []
    );

    return { buttonRef, handleMouseDown };
};