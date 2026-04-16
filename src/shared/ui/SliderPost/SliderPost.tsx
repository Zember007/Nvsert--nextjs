'use client';

import { useWindowSize } from 'shared/hooks';
import React, { useEffect, useId, useRef, useState } from 'react';
import styles from '@/assets/styles/base/base.module.scss';

type SliderPostProps<ItemType> = {
    items?: ItemType[];
    renderItem?: (item: ItemType, index: number) => React.ReactNode;
    className?: string;
    containerClassName?: string;
    wrapperClassName?: string;
    itemClassName?: string;
    showDots?: boolean;
    dotsClassName?: string;
    /** Called when the active slide index changes (GSAP loop). */
    onSlideChange?: (index: number) => void;
};

function SliderPost<ItemType = unknown>({
    items,
    renderItem,
    className,
    containerClassName,
    wrapperClassName,
    itemClassName,
    showDots = true,
    dotsClassName,
    onSlideChange,
}: SliderPostProps<ItemType>) {
    const { width: widthWindow } = useWindowSize();
    const sliderRef = useRef<HTMLDivElement>(null);
    const timeLine = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const DataSlider = useId();
    const gap = widthWindow && widthWindow < 640 ? (widthWindow - 300) / 2 : 20;

    // Инициализация слайдера
    useEffect(() => {
        if (!items || items.length === 0 || timeLine.current) return;

        const currentRef = sliderRef.current;
        if (!currentRef) return;

        let observer: IntersectionObserver | null = null;
        let timeoutIdBg: NodeJS.Timeout | null = null;

        void (async () => {
            const [{ default: gsap }, { horizontalLoop }] = await Promise.all([
                import('gsap'),
                import('@/scripts/slider'),
            ]);

            const slides = gsap.utils.toArray(`[data-slider="${DataSlider}"]`);
            if (slides.length === 0) return;

            function updateOpacity() {
                const rectContainer = sliderRef.current?.getBoundingClientRect();
                if (!rectContainer) return;

                slides.forEach((item) => {
                    if (!(item instanceof HTMLElement)) return;
                    const rect = item.getBoundingClientRect();

                    // Насколько блок находится ВНЕ слева и справа
                    const outLeft = Math.max(0, rectContainer.left - rect.left);
                    const outRight = Math.max(0, rect.right - rectContainer.right);

                    // Сколько всего блока вне контейнера по горизонтали
                    const totalOutside = outLeft + outRight;

                    // Если больше половины элемента находится за пределами контейнера
                    if (totalOutside >= rect.width / 2) {
                        item.style.opacity = '0';
                    } else {
                        item.style.opacity = '1';
                    }
                });
            }

            timeLine.current = horizontalLoop(slides, {
                paused: true,
                draggable: true,
                mobile: widthWindow && widthWindow < 1280,
                snap: true,
                gap: widthWindow && widthWindow < 640 ? (widthWindow - 300) / 2 : 20,
                center: widthWindow && (widthWindow < 640 || widthWindow >= 1280) ? true : false,
                onChange: (index: number) => {
                    setActiveIndex(index);
                    onSlideChange?.(index);
                },
                onDragFunction: () => {
                    slides.forEach((item) => {
                        if (!(item instanceof HTMLElement)) return;
                        item.style.opacity = '1';
                    });

                    if (timeoutIdBg) {
                        clearTimeout(timeoutIdBg);
                    }

                    timeoutIdBg = setTimeout(() => {
                        updateOpacity();
                    }, 100);
                },
            });

            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        timeLine.current?.next({ ease: 'power3', duration: 0.725 });

                        if (currentRef) {
                            observer?.unobserve(currentRef);
                        }
                    }
                },
                { threshold: 0.5 }
            );

            observer.observe(currentRef);
        })();

        return () => {
            timeLine.current?.destroy();
            timeLine.current = null;
            observer?.unobserve(currentRef);
            if (timeoutIdBg) {
                clearTimeout(timeoutIdBg);
            }
        };
    }, [widthWindow, items, DataSlider, onSlideChange]);

    if (!items || items.length === 0) {
        return null;
    }
    const handleDotClick = (index: number) => {
        if (!timeLine.current) return;
        timeLine.current.toIndex(index, { ease: 'power3', duration: 0.725 });
    };

    return (
        <div
            ref={sliderRef}
            className={`slider-container relative overflow-hidden mt-[15px] 1k:max-w-[calc(100vw-824px)] xl:max-w-[calc(100vw-656px)] l:max-w-[640px] xxs:max-w-[580px] xxs:mx-auto -mx-[26px] w-[calc(100%+52px)] ${containerClassName || ''} ${className || ''}`}
        >
            <div className={`${styles.slideBlur} ${styles.feedbackBlur} left-0`}>
                <span
                    className={styles.line}
                    style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}
                ></span>
                <span
                    className={styles.line}
                    style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}
                ></span>
                <span
                    className={styles.line}
                    style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}
                ></span>
            </div>
            <div className={`${styles.slideBlur} ${styles.feedbackBlur} right-0`}>
                <span
                    className={styles.line}
                    style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}
                ></span>
                <span
                    className={styles.line}
                    style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}
                ></span>
                <span
                    className={styles.line}
                    style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}
                ></span>
            </div>
            <div
                data-slider="slider-wrap"
                className={`slider-wrapper flex ${wrapperClassName || ''}`}
                style={{ gap: `${gap}px` }}
            >
                {typeof renderItem === 'function' && Array.isArray(items)
                    ? items.map((item, index) => (
                        <div
                            key={index}
                            data-slider={DataSlider}
                            className={`transition-opacity duration-300  ${itemClassName || ''}`}
                        >
                            {renderItem(item, index)}
                        </div>
                    ))
                    : null}
            </div>

            {showDots && (
                <div className={`${styles.slideDotsBoxContainer} !flex my-[20px] ${dotsClassName || ''}`}>
                    <div className={`${styles.slideDotsBox} !flex`}>
                        {items.map((_, i) => (
                            <button
                                type="button"
                                onClick={() => handleDotClick(i)}
                                key={i}
                                aria-label={`Слайд ${i + 1}`}
                                aria-current={activeIndex === i ? 'true' : undefined}
                                className={`${activeIndex === i ? styles.activeDots : ''} ${styles.slideDots}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SliderPost;

