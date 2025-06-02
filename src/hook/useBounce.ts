interface BounceOptions {
    startPosition?: string;
    endPosition?: string;
    duration?: number;
    easing?: string;
    direction?: 'vertical' | 'horizontal';
    distanceCoficent?: number;
}
import {useId} from 'react'

export function BounceEffect(
    element: HTMLElement,
    {
        startPosition = "0",
        endPosition = "72px",
        duration = 500,
        easing = "ease-out",
        direction = 'horizontal',
        distanceCoficent = 0.5
    }: BounceOptions = {}
): void {
    // Останавливаем текущую анимацию и сбрасываем состояние
    element.style.animation = "none";
    element.style.transform = `translate${direction === "vertical" ? "Y" : "X"}(${startPosition})`;
    const id = useId()
    // Запускаем новую анимацию
    requestAnimationFrame(() => {


        const distance = parseFloat(endPosition);

        // Создаем keyframes
        const keyframes = `
        @keyframes bounce${id} {
            0% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${startPosition});
            }
            30% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${endPosition});
            }
            50% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${distance * distanceCoficent}px);
            }
            70% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${distance * -distanceCoficent}px);
            }
            100% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(0);
            }
        }
    `;

        // Удаляем существующий стиль анимации, если есть
        const existingStyle = document.getElementById(`bounce-keyframes${id}`);
        if (existingStyle) existingStyle.remove();

        // Создаем новый стиль
        const styleSheet = document.createElement("style");
        styleSheet.id = `bounce-keyframes${id}`;
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        element.style.animation = `bounce${id} ${duration}ms ${easing} forwards`;

    });

    // Очищаем анимацию после завершения
    element.addEventListener(
        "animationend",
        () => {
            element.style.animation = "";
            element.style.transform = "";
        },
        { once: true }
    );
}