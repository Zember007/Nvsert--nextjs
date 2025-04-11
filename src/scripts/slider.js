import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "./InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

export function initSlider(onChangeFunction) {
    const wrapper = document.querySelector('[data-slider="list"]');
    if (!wrapper) {
        console.error("Контейнер слайдера не найден");
        return null;
    }

    const slides = gsap.utils.toArray('[data-slider="slide"]');
    const slidesHtml = document.querySelectorAll('[data-slider="slide"]');
    if (!slides.length) {
        console.error("Слайды не найдены");
        return null;
    }

    const nextButton = document.querySelector('[data-slider="button-next"]');
    const prevButton = document.querySelector('[data-slider="button-prev"]');
    const totalElement = document.querySelector('[data-slide-count="total"]');
    const stepElement = document.querySelector('[data-slide-count="step"]');
    const stepsParent = stepElement.parentElement;

    if (!stepsParent || !stepElement) {
        console.error("Элементы шагов не найдены");
        return null;
    }

    let activeElement;
    const totalSlides = slides.length;

    if (totalElement) {
        totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
    }

    // Создаем шаги и сразу дублируем их
    stepsParent.innerHTML = '';
    const stepsArray = [];
    slides.forEach((_, index) => {
        const stepClone = stepElement.cloneNode(true);
        stepClone.textContent = index + 1 < 10 ? `0${index + 1}` : index + 1;
        stepsParent.appendChild(stepClone);
        stepsArray.push(stepClone);
    });

    stepsArray.forEach(step => {
        const clone = step.cloneNode(true);
        stepsParent.appendChild(clone);
        stepsArray.push(clone);
    });


    let currentIndex = 0;
    let isAnimating = false;
    function updateSteps(newIndex) {
        // if (isAnimating) return;
        // isAnimating = true;
    
        const height = stepsArray[0].offsetHeight;
        const maxOffset = totalSlides * height;
    
        // Определяем направление для плавной анимации
        let delta = newIndex - currentIndex;
        if (newIndex === 0 && currentIndex === totalSlides - 1) {
            delta = 1; // Переход с конца на начало
        } else if (newIndex === totalSlides - 1 && currentIndex === 0) {
            delta = -1; // Переход с начала на конец
        }
        const direction = delta >= 0 ? 1 : -1;
    
        // Текущая позиция
        let currentY = gsap.getProperty(stepsParent, "y") || 0;
    
        // Предварительная установка для перехода с начала на конец
        if (newIndex === totalSlides - 1 && currentIndex === 0) {
            gsap.set(stepsParent, { y: -maxOffset });
            currentY = -maxOffset;
        }
    
        // Сохраняем новый индекс
        currentIndex = newIndex;
    
        // Вычисляем целевую позицию на основе индекса
        let targetY = newIndex * height;
    
        // Корректируем targetY для бесшовности
        if (targetY >= maxOffset) {
            targetY -= maxOffset;
        } else if (targetY < 0) {
            targetY += maxOffset;
        }
    
        // Если текущая позиция сильно отклоняется, подстраиваем её для плавной анимации
        if (Math.abs(currentY + targetY) > maxOffset / 2 && direction !== 0) {
            gsap.set(stepsParent, {
                y: currentY + (direction > 0 ? maxOffset : -maxOffset)
            });
            currentY = gsap.getProperty(stepsParent, "y");
        }
    
        gsap.to(stepsParent, {
            y: -targetY,
            duration: 0.18,
            ease: "power3",
            onComplete: () => {
                currentY = gsap.getProperty(stepsParent, "y");
    
                // Финальная корректировка для бесшовности
                if (Math.abs(currentY) >= maxOffset) {
                    gsap.set(stepsParent, { y: currentY % maxOffset });
                } else if (currentY > 0) {
                    gsap.set(stepsParent, { y: currentY - maxOffset });
                }
    
                // isAnimating = false;
            }
        });
    }

    const loop = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        center: false,
        offsetLeft: 75,
        gap: 0,
        onChange: (index) => {
            if (activeElement) {
                activeElement.classList.remove("active");
            }
            const nextSibling = slidesHtml[index];
            nextSibling.classList.add("active");
            activeElement = nextSibling;

            updateSteps(index);

            onChangeFunction && onChangeFunction(index);
        }
    });

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            // if(isAnimating) return;
            loop.next({ ease: "power3", duration: 0.725 })});
    }
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            // if(isAnimating) return;
            loop.previous({ ease: "power3", duration: 0.725 })});
    }


    loop.destroy = () => {
        loop.kill();
        if (nextButton) nextButton.removeEventListener("click", loop.next);
        if (prevButton) prevButton.removeEventListener("click", loop.previous);
        slides.forEach(slide => slide.removeEventListener("click"));
    };



    return loop;
}








export function horizontalLoop(items, config) {
    let timeline;
    items = gsap.utils.toArray(items);
    config = config || {};
    const offsetLeft = config.offsetLeft || 0
    gsap.context(() => {
        let onChange = config.onChange,
            lastIndex = 0,
            tl = gsap.timeline({
                repeat: config.repeat, onUpdate: onChange && function () {
                    let i = tl.closestIndex();
                    if (lastIndex !== i) {
                        lastIndex = i;
                        onChange(i);
                    }
                }, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
            }),
            length = items.length,
            startX = items[0].offsetLeft,
            times = [],
            widths = [],
            spaceBefore = [],
            xPercents = [],
            curIndex = 0,
            indexIsDirty = false,
            center = config.center,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
            timeOffset = 0,
            container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
            totalWidth,
            getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0) + (config.gap || 0),
            populateWidths = () => {
                let b1 = container.getBoundingClientRect(), b2;
                items.forEach((el, i) => {
                    widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
                    b2 = el.getBoundingClientRect();
                    spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                    b1 = b2;
                });
                gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
                    xPercent: i => xPercents[i]
                });
                totalWidth = getTotalWidth();
            },
            timeWrap,
            populateOffsets = () => {
                timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
                center && times.forEach((t, i) => {
                    times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
                });
            },
            getClosest = (values, value, wrap) => {
                let i = values.length,
                    closest = 1e10,
                    index = 0, d;
                while (i--) {
                    d = Math.abs(values[i] - value);
                    if (d > wrap / 2) {
                        d = wrap - d;
                    }
                    if (d < closest) {
                        closest = d;
                        index = i;
                    }
                }
                return index;
            },
            populateTimeline = () => {
                let i, item, curX, distanceToStart, distanceToLoop;
                tl.clear();
                for (i = 0; i < length; i++) {
                    item = items[i];
                    curX = xPercents[i] / 100 * (widths[i]);
                    distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0] - offsetLeft;
                    distanceToLoop = distanceToStart + (offsetLeft ? offsetLeft : 0) + widths[i] * gsap.getProperty(item, "scaleX");
                    tl.to(item, {
                        xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                        duration: distanceToLoop / pixelsPerSecond
                    }, 0)

                        // Вторая анимация: возврат в начало с затуханием перед прыжком
                        .to(item, {
                            opacity: 0, // Плавное затухание перед перемещением
                            duration: 0.3 // Короткая длительность для затухания
                        }, distanceToLoop / pixelsPerSecond - 0.3) // Начинаем затухание чуть раньше конца первой анимации
                        .fromTo(item, {
                            xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100),
                            opacity: 0 // Начинаем с прозрачности 0
                        }, {
                            xPercent: xPercents[i],
                            opacity: 1, // Возвращаем полную видимость
                            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                            immediateRender: false
                        }, distanceToLoop / pixelsPerSecond)
                        .add("label" + i, distanceToStart / pixelsPerSecond);
                    times[i] = distanceToStart / pixelsPerSecond;
                }
                timeWrap = gsap.utils.wrap(0, tl.duration());
            },
            refresh = (deep) => {
                let progress = tl.progress();
                tl.progress(0, true);
                populateWidths();
                deep && populateTimeline();
                populateOffsets();
                deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
            },
            onResize = () => refresh(true),
            proxy;
        gsap.set(items, { x: 0 });
        populateWidths();
        populateTimeline();
        populateOffsets();
        window.addEventListener("resize", onResize);
        function toIndex(index, vars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            if (time < 0 || time > tl.duration()) {
                vars.modifiers = { time: timeWrap };
            }
            curIndex = newIndex;
            vars.overwrite = true;
            gsap.killTweensOf(proxy);
            return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
        }
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.closestIndex = setCurrent => {
            let index = getClosest(times, tl.time(), tl.duration());
            if (setCurrent) {
                curIndex = index;
                indexIsDirty = false;
            }
            return index;
        };
        tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
        tl.next = vars => { toIndex(tl.current() + 1, vars) };
        tl.previous = vars => toIndex(tl.current() - 1, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true); // pre-render for performance
        if (config.reversed) {
            tl.vars.onReverseComplete();
            tl.reverse();
        }
        if (config.draggable && typeof (Draggable) === "function") {
            proxy = document.createElement("div")
            let wrap = gsap.utils.wrap(0, 1),
                ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
                align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
                syncIndex = () => tl.closestIndex(true);
            typeof (InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
            draggable = Draggable.create(proxy, {
                trigger: items[0].parentNode,
                type: "x",
                onPressInit() {
                    let x = this.x;
                    gsap.killTweensOf(tl);
                    wasPlaying = !tl.paused();
                    tl.pause();
                    startProgress = tl.progress();
                    refresh();
                    ratio = 1 / totalWidth;
                    initChangeX = (startProgress / -ratio) - x;
                    gsap.set(proxy, { x: startProgress / -ratio });
                },
                onDrag: align,
                onThrowUpdate: align,
                overshootTolerance: 0,
                inertia: true,
                snap(value) {
                    if (Math.abs(startProgress / -ratio - this.x) < 10) {
                        return lastSnap + initChangeX
                    }
                    let time = -(value * ratio) * tl.duration(),
                        wrappedTime = timeWrap(time),
                        snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                        dif = snapTime - wrappedTime;
                    Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
                    lastSnap = (time + dif) / tl.duration() / -ratio;
                    return lastSnap;
                },
                onRelease() {
                    syncIndex();
                    draggable.isThrowing && (indexIsDirty = true);
                },
                onThrowComplete: () => {
                    syncIndex();
                    wasPlaying && tl.play();
                }
            })[0];
            tl.draggable = draggable;
        }
        tl.closestIndex(true);
        lastIndex = curIndex;
        // onChange && onChange(curIndex);
        timeline = tl;
        return () => window.removeEventListener("resize", onResize);
    });
    return timeline;
}