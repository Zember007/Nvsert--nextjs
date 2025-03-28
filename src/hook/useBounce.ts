interface BounceOptions {
    startPosition?: string;
    endPosition?: string;
    duration?: number;
    easing?: string;
    direction?: 'vertical' | 'horizontal';
}

export function BounceEffect(
    element: HTMLElement,
    {
        startPosition = "0",
        endPosition = "72px",
        duration = 500,
        easing = "ease-out",
        direction = 'horizontal'
    }: BounceOptions = {}
): void {
    // Останавливаем текущую анимацию и сбрасываем состояние
    element.style.animation = "none";
    element.style.transform = `translate${direction === "vertical" ? "Y" : "X"}(${startPosition})`;

    // Запускаем новую анимацию
    requestAnimationFrame(() => {


        const distance = parseFloat(endPosition);

        // Создаем keyframes
        const keyframes = `
        @keyframes bounce {
            0% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${startPosition});
            }
            30% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${endPosition});
            }
            50% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${distance * 0.5}px);
            }
            70% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${distance * -0.5}px);
            }
            100% { 
                transform: translate${direction === "vertical" ? "Y" : "X"}(${startPosition});
            }
        }
    `;

        // Удаляем существующий стиль анимации, если есть
        const existingStyle = document.getElementById("bounce-keyframes");
        if (existingStyle) existingStyle.remove();

        // Создаем новый стиль
        const styleSheet = document.createElement("style");
        styleSheet.id = "bounce-keyframes";
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        element.style.animation = `bounce ${duration}ms ${easing} forwards`;

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