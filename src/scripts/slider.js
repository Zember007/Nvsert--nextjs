import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "./InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

export function initSlider({ onChangeFunction, onDragFunction, mobile }) {
    const wrapper = document.querySelector('[data-slider="list"]');
    if (!wrapper) {
        console.error("Slider container not found");
        return null;
    }

    const slides = gsap.utils.toArray('[data-slider="slide"]');
    const slidesHtml = document.querySelectorAll('[data-slider="slide"]');
    if (!slides.length) {
        console.error("Slides not found");
        return null;
    }

    const nextButton = document.querySelector('[data-slider="button-next"]');
    const prevButton = document.querySelector('[data-slider="button-prev"]');
    const totalElement = document.querySelector('[data-slide-count="total"]');
    const stepElement = document.querySelector('[data-slide-count="step"]');
    const stepsParent = stepElement.parentElement;

    if (!stepsParent || !stepElement) {
        console.error("Step elements not found");
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
    function updateSteps(newIndex) {
        gsap.killTweensOf(stepsParent)
        const height = stepsArray[0].offsetHeight;
        const maxOffset = totalSlides * height;

        let delta = newIndex - currentIndex;
        if (newIndex === 0 && currentIndex === totalSlides - 1) {
            delta = 1;
        } else if (newIndex === totalSlides - 1 && currentIndex === 0) {
            delta = -1;
        }
        const direction = delta >= 0 ? 1 : -1;

        let currentY = gsap.getProperty(stepsParent, "y") || 0;

        if (newIndex === totalSlides - 1 && currentIndex === 0) {
            gsap.set(stepsParent, { y: -maxOffset });
            currentY = -maxOffset;
        }

        currentIndex = newIndex;

        let targetY = newIndex * height;

        if (targetY >= maxOffset) {
            targetY -= maxOffset;
        } else if (targetY < 0) {
            targetY += maxOffset;
        }

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
            }
        });
    }

    const loop = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        snap: true,
        center: mobile,
        offsetLeft: mobile ? null : 75,
        opacity: !mobile,
        gap: mobile && window.innerWidth < 960 ? (window.innerWidth - (250)) / 2 : 43,
        mobile: mobile, // Передаем флаг mobile
        onChange: (index) => {
            if (activeElement) {
                activeElement.classList.remove("active");
            }
            const nextSibling = slidesHtml[index];
            nextSibling.classList.add("active");
            activeElement = nextSibling;

            updateSteps(index);

            onChangeFunction && onChangeFunction(index);
        },
        onDragFunction: () => {
            onDragFunction && onDragFunction();
        }
    });

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            loop.next({ ease: "power3", duration: 0.725 })
        });
    }
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            loop.previous({ ease: "power3", duration: 0.725 })
        });
    }

    return loop;
}

export function horizontalLoop(items, config) {
    let timeline;
    items = gsap.utils.toArray(items);
    config = config || {};
    const offsetLeft = config.offsetLeft || 0;
    const isMobile = config.mobile || false;
    if (!items || !items.length) return null;
    
    gsap.context(() => {
        let onChange = config.onChange,
            onDragFunction = config.onDragFunction,
            lastIndex = 0,
            tl = gsap.timeline({
                repeat: config.repeat, 
                onUpdate: function () {
                    onDragFunction && onDragFunction();
                    forcePixelAlignment(); // Принудительное выравнивание на каждом обновлении

                    let i = tl.closestIndex();
                    if (lastIndex !== i) {
                        lastIndex = i;
                        onChange && onChange(i);
                    }
                }, 
                paused: config.paused, 
                defaults: { ease: "none" }, 
                onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
            }),
            length = items.length,
            startX = Math.round(items[0].offsetLeft),
            times = [],
            widths = [],
            spaceBefore = [],
            xPercents = [],
            curIndex = 0,
            indexIsDirty = false,
            center = config.center,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
            timeOffset = 0,
            container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
            totalWidth,
            
            // Принудительное выравнивание к пиксельной сетке
            forcePixelAlignment = () => {
                items && items.forEach((item, i) => {
                    const rect = item.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    
                    // Получаем текущую позицию относительно контейнера
                    const currentLeft = rect.left - containerRect.left;
                    const roundedLeft = Math.round(currentLeft);
                    
                    // Если есть субпиксельное смещение - корректируем
                    if (Math.abs(currentLeft - roundedLeft) > 0.1) {
                        const correction = roundedLeft - currentLeft;
                        const currentTransform = gsap.getProperty(item, "x");
                        gsap.set(item, { 
                            x: Math.round(currentTransform + correction),
                            force3D: true 
                        });
                    }
                });
            },
            
            getTotalWidth = () => {
                return Math.round(items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (config.gap || 0));
            },
            
            populateWidths = () => {
                let b1 = container.getBoundingClientRect(), b2;
                
                // Сначала сбрасываем все трансформации
                gsap.set(items, { x: 0, xPercent: 0 });
                
                items.forEach((el, i) => {
                    widths[i] = Math.round(el.offsetWidth);
                    xPercents[i] = 0; // Изначально все элементы без смещения
                    
                    b2 = el.getBoundingClientRect();
                    spaceBefore[i] = Math.round(b2.left - (i ? b1.right : b1.left));
                    b1 = b2;
                });
                
                totalWidth = getTotalWidth();
            },
            
            timeWrap,
            populateOffsets = () => {
                timeOffset = center ? tl.duration() * (Math.round(container.offsetWidth) / 2) / totalWidth : 0;
                center && times.forEach((t, i) => {
                    times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
                });
            },
            
            getClosest = (values, value, wrap) => {
                if (!values) return 0
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
                    curX = Math.round(xPercents[i] / 100 * widths[i]);
                    distanceToStart = Math.round(item.offsetLeft + curX - startX + spaceBefore[0] - offsetLeft);
                    distanceToLoop = Math.round(distanceToStart + (offsetLeft ? offsetLeft : 0) + widths[i] * gsap.getProperty(item, "scaleX"));
                    
                    // Используем только x трансформации для более точного контроля
                    const targetX = Math.round(curX - distanceToLoop);
                    const fromX = Math.round(curX - distanceToLoop + totalWidth);
                    
                    tl.to(item, {
                        x: snap(targetX),
                        duration: distanceToLoop / pixelsPerSecond,
                        force3D: true
                    }, 0)
                    .to(item, {
                        opacity: config.opacity ? 0 : 1,
                        duration: 0.3
                    }, distanceToLoop / pixelsPerSecond)
                    .fromTo(item, {
                        x: snap(fromX),
                        opacity: config.opacity ? 0 : 1
                    }, {
                        x: Math.round(curX),
                        opacity: 1,
                        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                        immediateRender: false,
                        delay: config.opacity ? 0.3 : 0,
                        force3D: true
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
                
                // Принудительное выравнивание после обновления
                setTimeout(() => forcePixelAlignment(), 0);
            },
            
            onResize = () => refresh(true),
            proxy;

        // Устанавливаем начальные позиции без трансформаций
        gsap.set(items, { x: 0, xPercent: 0, force3D: true });

        populateWidths();
        populateTimeline();
        populateOffsets();
        
        window.addEventListener("resize", onResize);

        function toIndex(index, vars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex && index !== curIndex) {
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            if (time < 0 || time > tl.duration()) {
                vars.modifiers = { time: timeWrap };
            }
            curIndex = newIndex;
            vars.overwrite = true;
            gsap.killTweensOf(proxy);
            
            // Добавляем коллбек для выравнивания позиций
            const originalOnComplete = vars.onComplete;
            vars.onComplete = function() {
                originalOnComplete && originalOnComplete.call(this);
                forcePixelAlignment();
            };
            
            if (vars.duration === 0) {
                const result = tl.time(timeWrap(time));
                requestAnimationFrame(() => forcePixelAlignment());
                return result;
            } else {
                return tl.tweenTo(time, vars);
            }
        }

        tl.toIndex = (index, vars) => toIndex(index, vars);
        let timeoutId = null
        
        tl.closestIndex = setCurrent => {
            if (!items || !items.length) return 0;

            if (timeoutId) clearTimeout(timeoutId)
            let index = getClosest(times, tl.time(), tl.duration());
            if (setCurrent) {
                curIndex = index;
                indexIsDirty = false;
            }

            items.forEach((el) => {
                el.classList.remove('closestSlide')
            })

            items[index === 0 ? items.length - 1 : index - 1].classList.add('closestSlide')

            return index;
        };
        
        tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
        tl.next = vars => { toIndex(tl.current() + 1, vars) };
        tl.previous = vars => toIndex(tl.current() - 1, vars);
        tl.times = times;
        
        // Публичная функция для принудительного выравнивания позиций
        tl.alignPositions = forcePixelAlignment;

        tl.destroy = () => {
            tl.pause();
            tl.kill();
            window.removeEventListener("resize", onResize);

            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }

            if (tl.draggable) {
                tl.draggable.kill();
                if (proxy && proxy.parentNode) {
                    proxy.parentNode.removeChild(proxy);
                }
                if (typeof InertiaPlugin !== "undefined") {
                    InertiaPlugin.untrack(proxy, "x");
                }
            }

            if (items && items.length) {
                items.forEach((el) => {
                    el.classList.remove('closestSlide');
                });
            }

            gsap.set(items, {
                clearProps: "all"
            });

            items = null;
            times = null;
            widths = null;
            spaceBefore = null;
            xPercents = null;
            container = null;
            proxy = null;

        };

        tl.progress(1, true).progress(0, true);
        if (!config.paused) {
            if (config.reversed) {
                tl.progress(1).reverse();
            } else {
                tl.play();
            }
        }

        if (config.draggable && typeof (Draggable) === "function") {
            proxy = document.createElement("div");
            let wrap = gsap.utils.wrap(0, 1),
                ratio, startProgress, draggable, lastSnap, initChangeX, wasPlaying,
                align = () => {
                    const progress = wrap(startProgress + (draggable.startX - draggable.x) * ratio);
                    tl.progress(progress);
                },
                syncIndex = () => tl.closestIndex(true);

            if (typeof InertiaPlugin === "undefined") {
                console.warn("InertiaPlugin required for velocity tracking. https://greensock.com/club");
            }

            let dragDirection = 0;

            draggable = Draggable.create(proxy, {
                trigger: items[0].parentNode,
                type: "x",
                onPressInit() {
                    let x = this.x;
                    gsap.killTweensOf(tl);
                    wasPlaying = !tl.paused();
                    startProgress = tl.progress();
                    refresh();
                    ratio = 1 / totalWidth;
                    initChangeX = (startProgress / -ratio) - x;
                    gsap.set(proxy, { x: startProgress / -ratio });
                },
                onDrag() {
                    align();
                    dragDirection = this.getDirection("start") === "left" ? -1 : 1;
                },
                onThrowUpdate() {
                    align();
                    if (wasPlaying) {
                        const currentVelocity = Math.abs(InertiaPlugin.getVelocity(proxy, "x"));
                        const velocityThreshold = pixelsPerSecond + 60;

                        if (currentVelocity <= velocityThreshold) {
                            gsap.killTweensOf(proxy);
                        }
                    }
                },
                overshootTolerance: 0,
                inertia: !isMobile,

                snap(value) {
                    if (!config.snap) return Math.round(value);

                    if (Math.abs(startProgress / -ratio - this.x) < 10) {
                        return Math.round(lastSnap + initChangeX);
                    }

                    let time = -(value * ratio) * tl.duration(),
                        wrappedTime = timeWrap(time),
                        snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                        dif = snapTime - wrappedTime;

                    Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());

                    lastSnap = (time + dif) / tl.duration() / -ratio;
                    
                    return Math.round(lastSnap);
                },
                onDragEnd() {
                    if (wasPlaying) {
                        if (dragDirection < 0) {
                            tl.play();
                        } else if (dragDirection > 0) {
                            tl.reverse();
                        }
                    } else if (isMobile) {
                        const direction = dragDirection;
                        const newIndex = tl.current() + (direction > 0 ? -1 : 1);
                        tl.toIndex(newIndex, { duration: 0.45, ease: "power2.out" });
                    }
                    syncIndex();
                    setTimeout(() => forcePixelAlignment(), 0);
                },
                onRelease() {
                    syncIndex();
                    indexIsDirty = true;
                    setTimeout(() => forcePixelAlignment(), 0);
                },
                onThrowComplete: () => {
                    syncIndex();
                    setTimeout(() => forcePixelAlignment(), 0);
                }
            })[0];

            InertiaPlugin.track(proxy, "x");
            tl.draggable = draggable;
        }

        tl.closestIndex(true);
        lastIndex = curIndex;
        timeline = tl;
        
        // Финальное выравнивание после инициализации
        setTimeout(() => forcePixelAlignment(), 0);
        
        return () => window.removeEventListener("resize", onResize);
    });

    timeline.next({ ease: "power3", duration: 0.725 })
    return timeline;
}