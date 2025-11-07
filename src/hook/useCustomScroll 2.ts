

import { useLayoutEffect, useRef } from 'react';

export interface CustomScrollOptions {
    smoothScrollFactor?: number;
    scrollPadding?: number;
    minWidth?: number;
    enabled?: boolean;
    target?: 'window' | 'container';
    containerRef?: React.RefObject<any>;
    getScrollOffset?: () => number; // Добавляем новый параметр
}

export const useCustomScroll = (options: CustomScrollOptions = {}) => {
    const {
        smoothScrollFactor = 0.15,
        scrollPadding = 2,
        minWidth = 960,
        enabled = true,
        target = 'window',
        containerRef,
        getScrollOffset = () => 0 // Значение по умолчанию
    } = options;

    const scrollbarRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!enabled || !scrollbarRef.current) return;

        if (target === 'container' && !containerRef?.current) return;

        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;

        const isWindowMode = target === 'window';
        const container = containerRef?.current;

        const initScroll = () => {
            if (isWindowMode) {
                currentScroll = window.scrollY;
            } else if (container) {
                currentScroll = container.scrollTop;
            }
            targetScroll = currentScroll;
        };

        const smoothScroll = () => {
            if (document.body.style.overflow === 'hidden') return;
            const diff = targetScroll - currentScroll;
            if (Math.abs(diff) < 0.1) {
                isScrolling = false;
                return;
            }
            currentScroll += diff * smoothScrollFactor;

            if (isWindowMode) {
                window.scrollTo(0, currentScroll);
            } else if (container) {
                container.scrollTop = currentScroll;
            }

            requestAnimationFrame(smoothScroll);
        };

        const handleWheel = (e: Event) => {
            const wheelEvent = e as WheelEvent;
            e.preventDefault();
            targetScroll += wheelEvent.deltaY;

            let maxScroll: number;

            if (isWindowMode) {
                maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            } else if (container) {
                maxScroll = container.scrollHeight - container.clientHeight;
            } else {
                return;
            }

            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        // Добавляем обработчик якорных ссылок
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A") {
                const anchor = target.getAttribute("href");
                if (anchor?.startsWith("#")) {
                    const el = document.querySelector(anchor);
                    if (el) {
                        e.preventDefault();
                        const offset = getScrollOffset(); // Используем переданную функцию
                        const elTop = (el as HTMLElement).offsetTop - offset;

                        let maxScroll: number;
                        if (isWindowMode) {
                            maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                        } else if (container) {
                            maxScroll = container.scrollHeight - container.clientHeight;
                        } else {
                            return;
                        }

                        targetScroll = Math.max(0, Math.min(elTop, maxScroll));

                        if (!isScrolling) {
                            isScrolling = true;
                            // Синхронизируем currentScroll с реальной позицией
                            if (isWindowMode) {
                                currentScroll = window.scrollY;
                            } else if (container) {
                                currentScroll = container.scrollTop;
                            }
                            requestAnimationFrame(smoothScroll);
                        }
                    }
                }
            }
        };

        initScroll();

        const wheelTarget = isWindowMode ? window : container;
        if (wheelTarget) {
            wheelTarget.addEventListener('wheel', handleWheel, { passive: false });
        }

        let isTicking = false;
        let isDragging = false;
        let startY = 0;
        let startScrollTop = 0;

        const scrollbar = scrollbarRef.current;

        if (isWindowMode && minWidth && window.innerWidth < minWidth) return;

        function updateScrollbar() {
            if (!scrollbar) return;

            let scrollTop: number;
            let scrollHeight: number;
            let clientHeight: number;

            if (isWindowMode) {
                scrollTop = window.scrollY || window.pageYOffset;
                scrollHeight = document.documentElement.scrollHeight;
                clientHeight = window.innerHeight || document.documentElement.clientHeight;
            } else if (container) {
                scrollTop = container.scrollTop;
                scrollHeight = container.scrollHeight;
                clientHeight = container.clientHeight;
            } else {
                return;
            }

            const maxScroll = scrollHeight - clientHeight;

            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;
            const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

            scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
            scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
            if (scrollbarHeight === clientHeight) {
                scrollbar.style.display = 'none';
            } else {
                scrollbar.style.display = '';
            }
        }

        function scrollMove(e: TouchEvent | MouseEvent) {
            if (!isDragging || document.body.style.overflow === 'hidden') return;

            let scrollHeight: number;
            let clientHeight: number;

            if (isWindowMode) {
                scrollHeight = document.documentElement.scrollHeight;
                clientHeight = window.innerHeight || document.documentElement.clientHeight;
            } else if (container) {
                scrollHeight = container.scrollHeight;
                clientHeight = container.clientHeight;
            } else {
                return;
            }

            const maxScroll = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight - scrollPadding * 2;

            let clientY = 0;

            if (e instanceof TouchEvent) {
                clientY = e.touches[0].clientY;
            } else {
                clientY = e.clientY;
            }

            const deltaY = clientY - startY;
            const scrollDelta = (deltaY / maxTop) * maxScroll;

            if (isWindowMode) {
                window.scrollTo({
                    top: startScrollTop + scrollDelta,
                    behavior: 'auto'
                });
            } else if (container) {
                container.scrollTop = startScrollTop + scrollDelta;
            }
        }

        function startScroll(e: TouchEvent | MouseEvent) {
            isDragging = true;
            let clientY = 0;

            if (e instanceof TouchEvent) {
                clientY = e.touches[0].clientY;
            } else {
                clientY = e.clientY;
            }

            startY = clientY;

            if (isWindowMode) {
                startScrollTop = window.scrollY || window.pageYOffset;
            } else if (container) {
                startScrollTop = container.scrollTop;
            }

            e.preventDefault();
        }

        const handleResize = () => updateScrollbar();

        const handleScroll = () => {
            if (!isScrolling) {
                if (isWindowMode) {
                    currentScroll = window.scrollY;
                } else if (container) {
                    currentScroll = container.scrollTop;
                }
                targetScroll = currentScroll;
            }

            if (!isTicking) {
                requestAnimationFrame(() => {
                    updateScrollbar();
                    isTicking = false;
                });
                isTicking = true;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        // Добавляем обработчики событий
        if (isWindowMode) {
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll);
        } else if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        // Добавляем обработчик якорных ссылок
        document.addEventListener('click', handleAnchorClick);

        scrollbar.addEventListener('mousedown', startScroll);
        document.addEventListener('mousemove', scrollMove);
        document.addEventListener('mouseup', handleMouseUp);

        scrollbar.addEventListener('touchstart', startScroll);
        document.addEventListener('touchmove', scrollMove);
        document.addEventListener('touchend', handleTouchEnd);

        setTimeout(() => {
            updateScrollbar();
        }, 100);

        return () => {
            if (wheelTarget) {
                wheelTarget.removeEventListener('wheel', handleWheel);
            }

            if (isWindowMode) {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll);
            } else if (container) {
                container.removeEventListener('scroll', handleScroll);
            }

            // Удаляем обработчик якорных ссылок
            document.removeEventListener('click', handleAnchorClick);

            if (scrollbar) {
                scrollbar.removeEventListener('mousedown', startScroll);
                scrollbar.removeEventListener('touchstart', startScroll);
            }

            document.removeEventListener('mousemove', scrollMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', scrollMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [smoothScrollFactor, scrollPadding, minWidth, enabled, target, containerRef, getScrollOffset]);

    return { scrollbarRef };
};