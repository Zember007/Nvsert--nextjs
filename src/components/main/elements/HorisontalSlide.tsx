import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';

type HorizontalLoopProps = {
    children: React.ReactNode[];
    speed?: number;
    gap?: number;
    opacity?: boolean;
    paused?: boolean;
    repeat?: number;
    reversed?: boolean;
    draggable?: boolean;
    onChange?: (index: number) => void;
};

export type HorizontalLoopRef = {
    goToSlide: (index: number, timeD: number) => void;
};

const HorizontalLoop = forwardRef<HorizontalLoopRef, HorizontalLoopProps>(
    (
        {
            children,
            speed = 1,
            gap = 0,
            opacity = true,
            paused = false,
            repeat = -1,
            reversed = false,
            draggable = true,
            onChange,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const timelineRef = useRef<gsap.core.Timeline | null>(null);
        const timesRef = useRef<number[]>([]);
        const lastIndexRef = useRef<number>(-1);
        const timeWrap = useRef<(v: number) => number>((v: number) => v);

        const getClosest = (values: number[], value: number, wrap: number) => {
            let i = values.length,
                closest = 1e10,
                index = 0,
                d;
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
        };

        useImperativeHandle(ref, () => ({
            goToSlide(index: number, timeD: number) {
                const tl = timelineRef.current;
                const times = timesRef.current;
                const length = times.length;
        
                if (!tl || !length) return;
        
                // Текущий индекс и время
                const curIndex = tl.current();
                const currentTime = tl.time();
                const duration = tl.duration();
        
                // Обеспечиваем цикл: превращаем index в диапазон [0, length)
                const newIndex = gsap.utils.wrap(0, length, index);
                lastIndexRef.current = newIndex;
        
                // Получаем базовое время для целевого слайда
                const baseTime = times[newIndex];
        
                // Вычисляем разницу с учетом цикла
                let diff = baseTime - currentTime;
                const absDiff = Math.abs(diff);
        
                // Кратчайший путь: корректируем diff
                if (absDiff > duration / 2) {
                    diff = diff > 0 ? diff - duration : diff + duration;
                }
        
                // Целевое время
                const targetTime = currentTime + diff;
        
                // Оборачиваем время
                const wrappedTime = gsap.utils.wrap(0, duration, targetTime);
        
                // Отладочные логи
                console.log({
                    curIndex,
                    newIndex,
                    currentTime,
                    baseTime,
                    diff,
                    absDiff,
                    targetTime,
                    wrappedTime,
                    duration,
                    direction: diff > 0 ? 'forward' : 'backward',
                });
        
                const vars: gsap.TweenVars = {
                    ease: "power3",
                    duration: Math.max(timeD, 0.1), // Минимальная длительность для плавности
                    overwrite: true,
                    modifiers: {
                        time: gsap.utils.wrap(0, duration),
                    },
                    // Добавляем onUpdate для отладки направления анимации
                    onUpdate: () => {
                        console.log('Animation time:', tl.time(), 'Index:', tl.current());
                    },
                };
        
                // Выполняем анимацию
                return tl.tweenTo(wrappedTime, vars);
            },
        }));

        useEffect(() => {
            if (!containerRef.current) return;

            const items = Array.from(containerRef.current.children) as HTMLElement[];
            const totalItems = items.length;
            const pixelsPerSecond = speed * 100;
            const widths: number[] = [];
            const xPercents: number[] = [];
            const times: number[] = [];
            const spaceBefore: number[] = [];

            // Вычисление ширин и отступов
            let b1 = containerRef.current.getBoundingClientRect();
            items.forEach((el, i) => {
                widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string);
                xPercents[i] = gsap.getProperty(el, 'xPercent') as number || 0;
                const b2 = el.getBoundingClientRect();
                spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                b1 = b2;
            });

            gsap.set(items, { xPercent: (i) => xPercents[i] });

            const totalWidth = items[totalItems - 1].offsetLeft +
                (xPercents[totalItems - 1] / 100) * widths[totalItems - 1] +
                spaceBefore[0] +
                widths[totalItems - 1] * Number(gsap.getProperty(items[totalItems - 1], 'scaleX')) +
                gap;

            let tl = gsap.timeline({
                repeat,
                paused: true,
                defaults: { ease: 'none' },
                onUpdate: () => {
                    const time = tl.time();
                    const index = getClosest(times, time, tl.duration());
                    if (index !== lastIndexRef.current) {
                        lastIndexRef.current = index;
                        onChange?.(index);
                    }
                },
            });

            timeWrap.current = gsap.utils.wrap(0, tl.duration());

            let startX = items[0].offsetLeft;
            for (let i = 0; i < totalItems; i++) {
                const item = items[i];
                const curX = (xPercents[i] / 100) * widths[i];
                const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
                const distanceToLoop = distanceToStart + widths[i] * Number(gsap.getProperty(item, 'scaleX')) + gap;

                tl.to(item, {
                    xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
                    duration: distanceToLoop / pixelsPerSecond,
                }, 0)
                    .to(item, {
                        opacity: opacity ? 0 : 1,
                        duration: 0.3,
                    }, distanceToLoop / pixelsPerSecond)
                    .fromTo(item, {
                        xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
                        opacity: opacity ? 0 : 1,
                    }, {
                        xPercent: xPercents[i],
                        opacity: 1,
                        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                        immediateRender: false,
                    }, distanceToLoop / pixelsPerSecond)
                    .add(`label${i}`, distanceToStart / pixelsPerSecond);

                times[i] = distanceToStart / pixelsPerSecond;
            }

            // Методы для управления
            tl.current = () => getClosest(times, tl.time(), tl.duration());
            tl.toIndex = (index: number, vars: any = {}) => {
                const length = times.length;
                const newIndex = gsap.utils.wrap(0, length, index);
                const currentTime = tl.time();
                const time = times[newIndex];
                let diff = time - currentTime;
                const absDiff = Math.abs(diff);
                if (absDiff > tl.duration() / 2) {
                    diff = diff > 0 ? diff - tl.duration() : diff + tl.duration();
                }
                const targetTime = currentTime + diff;
                vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                vars.overwrite = true;
                return tl.tweenTo(targetTime, vars);
            };
            tl.next = (vars: any = {}) => tl.toIndex(tl.current() + 1, vars);
            tl.previous = (vars: any = {}) => tl.toIndex(tl.current() - 1, vars);

            timelineRef.current = tl;
            timesRef.current = times;

            if (!paused) {
                if (reversed) tl.reverse();
                else tl.play();
            }

            return () => {
                tl.kill();
                if (tl.draggable) tl.draggable.kill();
            };
        }, [speed, gap, opacity, paused, repeat, reversed, draggable, onChange]);

        useEffect(() => {
            const onResize = () => {
                if (timelineRef.current) {
                    const progress = timelineRef.current.progress();
                    timelineRef.current.progress(0, true);
                    timelineRef.current.progress(progress, true);
                }
            };

            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }, []);

        return (
            <div ref={containerRef} className="slider w-[500%] flex">
                {children.map((child, i) => (
                    <div key={i} className='min-w-[535px]'>
                        {child}
                    </div>
                ))}
            </div>
        );
    }
);

HorizontalLoop.displayName = 'HorizontalLoop';

export default HorizontalLoop;