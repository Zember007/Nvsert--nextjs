import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "./InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

export function initSlider(onChangeFunction) {
    // Проверяем наличие основных элементов DOM
    const wrapper = document.querySelector('[data-slider="list"]');
    if (!wrapper) {
        console.error("Контейнер слайдера не найден");
        return null;
    }

    const slides = gsap.utils.toArray('[data-slider="slide"]');
    if (!slides.length) {
        console.error("Слайды не найдены");
        return null;
    }

    const nextButton = document.querySelector('[data-slider="button-next"]');
    const prevButton = document.querySelector('[data-slider="button-prev"]');
    const totalElement = document.querySelector('[data-slide-count="total"]');
    const stepElement = document.querySelector('[data-slide-count="step"]');

    if (!stepElement) {
        console.error("Элемент шага не найден");
        return null;
    }

    const stepsParent = stepElement.parentElement;
    if (!stepsParent) {
        console.error("Родительский элемент шагов не найден");
        return null;
    }

    let activeElement;
    const totalSlides = slides.length;

    // Обновляем общее количество слайдов
    if (totalElement) {
        totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
    }

    // Создаем элементы шагов динамически
    stepsParent.innerHTML = '';
    slides.forEach((_, index) => {
        const stepClone = stepElement.cloneNode(true);
        stepClone.textContent = index + 1 < 10 ? `0${index + 1}` : index + 1;
        stepsParent.appendChild(stepClone);
    });

    const allSteps = stepsParent.querySelectorAll('[data-slide-count="step"]');

    // Инициализируем горизонтальный цикл с дополнительным смещением
    const loop = horizontalLoop(slides, {
        paused: true,
        draggable: false,
        center: false,
        offset: 0,       
        onChange: (element, index) => {
            // Удаляем активный класс с предыдущего элемента
            if (activeElement) {
                activeElement.classList.remove("active");
            }

            // Обрабатываем следующий элемент с учетом зацикливания
            const nextSibling = element.nextElementSibling || slides[0];
            nextSibling.classList.add("active");
            activeElement = nextSibling;

            // Анимируем шаги
            try {
                
                gsap.to(allSteps, {
                    y: `${-100 * (slides.length - (index || 21) )}%`,
                    ease: "power3",
                    duration: 0.45
                });
            } catch (error) {
                console.error("Ошибка анимации шагов:", error);
            }

            onChangeFunction && onChangeFunction(index)
        }
    });

    // Убедитесь, что loop существует, перед тем как добавлять destroy
    if (loop) {
        loop.destroy = () => {
            loop.kill();
            if (nextButton) nextButton.removeEventListener("click", loop.next);
            if (prevButton) prevButton.removeEventListener("click", loop.previous);
            slides.forEach(slide => slide.removeEventListener("click"));
        };
    } else {
        console.error("Ошибка: loop не был инициализирован.");
    }

    // Добавляем обработчики событий с проверками
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (loop) {
                loop.next({ ease: "power3", duration: 0.725 });
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            if (loop) {
                loop.previous({ ease: "power3", duration: 0.725 });
            }
        });
    }

    // Исправляем обработчик кликов по слайдам
    slides.forEach((slide, i) => {
        slide.addEventListener("click", () => {
            if (loop) {
                const targetIndex = i === 0 ? 0 : i - 1;
                loop.toIndex(targetIndex, { ease: "power3", duration: 0.725 });
            }
        });
    });

    return loop;  // Возвращаем loop, чтобы убедиться, что он существует
}








export function horizontalLoop(items, config = {}) {
    const tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    });

    const elements = gsap.utils.toArray(items);
    const length = elements.length;
    if (!length) return tl;

    // Основные параметры
    const speed = (config.speed || 1) * 100;
    const snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);
    const center = config.center;
    const container = center === true ? elements[0].parentNode : 
                    gsap.utils.toArray(center)[0] || elements[0].parentNode;

    // Состояние
    let curIndex = 0;
    let lastIndex = 0;
    let indexIsDirty = false;
    let totalWidth;

    // Массивы данных
    const times = [];
    const widths = [];
    const spaceBefore = [];
    const xPercents = [];

    // Инициализация
    const startX = elements[0].offsetLeft;
    gsap.set(elements, { x: 0 });

    // Основные функции
    const populateWidths = () => {
        let b1 = container.getBoundingClientRect();
        elements.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + 
                              gsap.getProperty(el, "xPercent"));
            const b2 = el.getBoundingClientRect();
            spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
            b1 = b2;
        });
        gsap.set(elements, { xPercent: i => xPercents[i] });
        totalWidth = elements[length - 1].offsetLeft + 
                    (xPercents[length - 1] / 100 * widths[length - 1]) - 
                    startX + spaceBefore[0] + 
                    elements[length - 1].offsetWidth * gsap.getProperty(elements[length - 1], "scaleX") + 
                    (parseFloat(config.paddingRight) || 0) + 76;
    };

    const populateTimeline = () => {
        tl.clear();
        elements.forEach((item, i) => {
            const curX = xPercents[i] / 100 * widths[i];
            const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
            const distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
            
            tl.to(item, { 
                xPercent: snap((curX - distanceToLoop) / widths[i] * 100), 
                duration: distanceToLoop / speed 
            }, 0)
            .fromTo(item, { 
                xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) 
            }, { 
                xPercent: xPercents[i], 
                duration: (curX - distanceToLoop + totalWidth - curX) / speed, 
                immediateRender: false 
            }, distanceToLoop / speed)
            .add("label" + i, distanceToStart / speed);
            
            times[i] = distanceToStart / speed;
        });
    };

    const refresh = (deep = false) => {
        const progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        if (deep) {
            populateTimeline();
            if (center) {
                const timeOffset = tl.duration() * (container.offsetWidth / 2) / totalWidth;
                times.forEach((t, i) => {
                    times[i] = gsap.utils.wrap(0, tl.duration())(tl.labels["label" + i] + 
                              tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
                });
            }
        }
        tl.progress(progress, true);
    };

    // Навигация
    const toIndex = (index, vars = {}) => {
        const wrappedIndex = gsap.utils.wrap(0, length, index);
        let time = times[wrappedIndex];
        
        if (Math.abs(index - curIndex) > length / 2) {
            index += index > curIndex ? -length : length;
        }
        
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        
        if (time < 0 || time > tl.duration()) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        }
        
        curIndex = wrappedIndex;
        vars.overwrite = true;
        return vars.duration === 0 ? tl.time(time) : tl.tweenTo(time, vars);
    };

    // API таймлайна
    tl.toIndex = toIndex;
    tl.next = vars => toIndex(tl.current() + 1, vars);
    tl.previous = vars => toIndex(tl.current() - 1, vars);
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.closestIndex = setCurrent => {
        const index = times.reduce((closestIdx, time, i) => {
            const d = Math.abs(time - tl.time());
            return d < Math.abs(times[closestIdx] - tl.time()) ? i : closestIdx;
        }, 0);
        if (setCurrent) {
            curIndex = index;
            indexIsDirty = false;
        }
        return index;
    };
    tl.times = times;

    // Обработчик изменения
    if (config.onChange) {
        tl.eventCallback("onUpdate", () => {
            const i = tl.closestIndex();
            if (lastIndex !== i) {
                lastIndex = i;
                config.onChange(elements[i], i);
            }
        });
    }

    // Инициализация
    refresh(true);
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }

    const cleanup = () => window.removeEventListener("resize", () => refresh(true));
    window.addEventListener("resize", () => refresh(true));
    
    return Object.assign(tl, { cleanup });
}