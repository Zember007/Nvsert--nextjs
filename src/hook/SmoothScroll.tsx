

'use client';
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {useCustomScroll} from "@/hook/useCustomScroll 2";

interface SmoothScrollProps {
    children: React.ReactNode;
}

interface TrackpadDebugInfo {
    deltaY: number;
    deltaX: number;
    deltaZ: number;
    deltaMode: number;
    avgDelta: number;
    maxDelta: number;
    minDelta: number;
    deltaVariance: number;
    eventCount: number;
    lastEventTime: number;
    frequency: number;
}

interface DelaySettings {
    detectionDelay: {
        enabled: boolean;
        value: number;
    };
    scrollAnimationDelay: {
        enabled: boolean;
        value: number;
    };
    routeChangeDelay: {
        enabled: boolean;
        value: number;
    };
    resizeDelay: {
        enabled: boolean;
        value: number;
    };
}

export default function SmoothScroll({children}: SmoothScrollProps) {

    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Состояния для drag-to-scroll
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragStartScrollTop, setDragStartScrollTop] = useState(0);

    const [isTrackpad, setIsTrackpad] = useState(false);
    const [trackpadDebugInfo, setTrackpadDebugInfo] = useState<TrackpadDebugInfo>({
        deltaY: 0,
        deltaX: 0,
        deltaZ: 0,
        deltaMode: 0,
        avgDelta: 0,
        maxDelta: 0,
        minDelta: 0,
        deltaVariance: 0,
        eventCount: 0,
        lastEventTime: 0,
        frequency: 0
    });

    const [mouseSettings, setMouseSettings] = useState({
        scrollStopThreshold: 0.5,
        scrollEaseFactor: 0.25,
        minScrollStep: 1
    });

    const [trackpadSettings, setTrackpadSettings] = useState({
        scrollStopThreshold: 0.0,
        scrollEaseFactor: 0.50,
        minScrollStep: 1
    });

    const [delaySettings, setDelaySettings] = useState<DelaySettings>({
        detectionDelay: {
            enabled: true,
            value: 40
        },
        scrollAnimationDelay: {
            enabled: true,
            value: 1
        },
        routeChangeDelay: {
            enabled: true,
            value: 40
        },
        resizeDelay: {
            enabled: true,
            value: 40
        }
    });


    const getScrollOffset = React.useCallback(() => {
     
        if (pathname.includes('/services')) return 50;
        return 120;
    }, [pathname]);

    const { scrollbarRef } = useCustomScroll({
        smoothScrollFactor: isTrackpad ? trackpadSettings.scrollEaseFactor : mouseSettings.scrollEaseFactor,
        scrollPadding: 2, // или ваше значение
        enabled: showScrollbar && !isMobile,
        target: 'window',
        getScrollOffset // Передаем вашу функцию offset
    });

    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768 ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0);

            setIsMobile(isMobileDevice);
            return isMobileDevice;
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Определение типа устройства ввода (только для desktop)
    useEffect(() => {
        if (isMobile) return;

        const wheelEvents: number[] = [];
        const wheelTimestamps: number[] = [];
        let detectionTimeout: NodeJS.Timeout;

        const detectInputDevice = (e: WheelEvent) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - trackpadDebugInfo.lastEventTime;

            setTrackpadDebugInfo(prev => {
                const newEventCount = prev.eventCount + 1;
                const frequency = timeDiff > 0 ? 1000 / timeDiff : 0;

                return {
                    ...prev,
                    deltaY: e.deltaY,
                    deltaX: e.deltaX,
                    deltaZ: e.deltaZ,
                    deltaMode: e.deltaMode,
                    eventCount: newEventCount,
                    lastEventTime: currentTime,
                    frequency: frequency
                };
            });

            wheelEvents.push(Math.abs(e.deltaY));
            wheelTimestamps.push(currentTime);
            if (wheelEvents.length > 10) {
                wheelEvents.shift();
                wheelTimestamps.shift();
            }

            clearTimeout(detectionTimeout);

            const delayValue = delaySettings.detectionDelay.enabled ?
                delaySettings.detectionDelay.value : 0;

            detectionTimeout = setTimeout(() => {
                if (wheelEvents.length >= 5) {
                    const avgDelta = wheelEvents.reduce((a, b) => a + b, 0) / wheelEvents.length;
                    const maxDelta = Math.max(...wheelEvents);
                    const minDelta = Math.min(...wheelEvents);
                    const deltaVariance = maxDelta - minDelta;

                    const intervals = [];
                    for (let i = 1; i < wheelTimestamps.length; i++) {
                        intervals.push(wheelTimestamps[i] - wheelTimestamps[i - 1]);
                    }
                    const avgInterval = intervals.length > 0 ?
                        intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;

                    setTrackpadDebugInfo(prev => ({
                        ...prev,
                        avgDelta,
                        maxDelta,
                        minDelta,
                        deltaVariance
                    }));

                    const isWindows = navigator.platform.toLowerCase().includes('win') ||
                        navigator.userAgent.toLowerCase().includes('windows');
                    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
                        navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

                    let isLikelyTrackpad = false;
                    let isLikelyMouse = false;

                    if (isMac) {
                        isLikelyTrackpad =
                            avgDelta < 50 &&
                            deltaVariance < 30 &&
                            e.deltaMode === 0 &&
                            avgInterval < 50;

                        isLikelyMouse =
                            avgDelta > 80 ||
                            deltaVariance > 50 ||
                            e.deltaMode !== 0 ||
                            avgInterval > 100;
                    } else if (isWindows) {
                        isLikelyTrackpad =
                            (avgDelta < 120 && deltaVariance < 100 && avgInterval < 30) ||
                            (avgDelta < 30 && e.deltaMode === 0);

                        isLikelyMouse =
                            (avgDelta >= 120 && (deltaVariance > 100 || avgInterval > 50)) ||
                            (e.deltaMode === 1) ||
                            (avgDelta === 120 && deltaVariance === 0);
                    } else {
                        isLikelyTrackpad =
                            avgDelta < 80 &&
                            deltaVariance < 60 &&
                            e.deltaMode === 0;

                        isLikelyMouse =
                            avgDelta > 100 ||
                            deltaVariance > 80 ||
                            e.deltaMode !== 0;
                    }

                    if (isLikelyTrackpad) {
                        setIsTrackpad(true);
                    } else if (isLikelyMouse) {
                        setIsTrackpad(false);
                    }
                }
            }, delayValue);
        };

        const isWindows = navigator.platform.toLowerCase().includes('win') ||
            navigator.userAgent.toLowerCase().includes('windows');
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
            navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

        if (isMac) {
            setIsTrackpad(true);
        } else if (isWindows) {
            setIsTrackpad(false);
        }

        window.addEventListener('wheel', detectInputDevice, {passive: true});

        return () => {
            window.removeEventListener('wheel', detectInputDevice);
            clearTimeout(detectionTimeout);
        };
    }, [delaySettings.detectionDelay, isMobile]);

    useEffect(() => {
        const hideScrollPaths = [
            // '/contacts/connection',
            '/pricing',
            // '/auth/login',
            // '/auth/register',
            // '/auth/forgot-password'
        ];

        const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

        // На мобилках не блокируем overflow
        if (window.screen.width > 768 && !isMobile) {
            document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
            setShowScrollbar(!shouldHideScrollbar);
        } else {
            // На мобилках разрешаем нативный скролл
            document.body.style.overflow = '';
            setShowScrollbar(false);
        }

        const routeDelay = delaySettings.routeChangeDelay.enabled ?
            delaySettings.routeChangeDelay.value : 0;

        const timeout1 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay);
        const timeout2 = setTimeout(() => window.dispatchEvent(new Event('scroll')), routeDelay * 6);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            if (!isMobile) {
                document.body.style.overflow = '';
            }
        };
    }, [pathname, delaySettings.routeChangeDelay, isMobile]);

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (!isDragging) return;

        e.preventDefault();

        const deltaY = e.clientY - dragStartY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const maxScroll = scrollHeight - clientHeight;

        // Вычисляем коэффициент прокрутки
        const scrollRatio = deltaY / clientHeight;
        const newScrollTop = dragStartScrollTop + (scrollRatio * scrollHeight);

        // Ограничиваем значения
        const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));

        window.scrollTo(0, clampedScrollTop);
    }, [isDragging, dragStartY, dragStartScrollTop]);

    const handleMouseUp = React.useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);

        // Возвращаем нормальный курсор
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, [isDragging]);

    // Добавляем обработчики мыши для drag-to-scroll
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    useEffect(() => {

        if (isMobile) return;

        if (!scrollbarRef.current) return;

        let currentScroll = window.scrollY;
        let targetScroll = currentScroll;
        let isScrolling = false;
        let lastUpdateTime = 0;
        let rafId: number | null = null;

        const initScroll = () => {
            currentScroll = window.scrollY;
            targetScroll = currentScroll;
        };

        const handleWheel = (e: WheelEvent) => {
            // Игнорируем wheel события во время drag
            if (isDragging) return;

            if ((e.target as HTMLElement).closest('textarea, .allow-native-scroll')) return;

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const settings = isTrackpad ? trackpadSettings : mouseSettings;
            const scrollStep = Math.sign(e.deltaY) * Math.max(Math.abs(e.deltaY), settings.minScrollStep);
            targetScroll += scrollStep;

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                const animate = () => {
                    const now = performance.now();
                    const timeDelta = now - lastUpdateTime;
                    lastUpdateTime = now;

                    const diff = targetScroll - currentScroll;
                    const absDiff = Math.abs(diff);

                    if (absDiff < settings.scrollStopThreshold) {
                        currentScroll = targetScroll;
                        const finalPosition = Math.round(currentScroll * 100) / 100;

                        window.scrollTo(0, finalPosition);

                        requestAnimationFrame(() => {
                            window.scrollTo(0, finalPosition);
                        });

                        isScrolling = false;
                        rafId = null;
                        return;
                    }

                    const timeMultiplier = Math.min(timeDelta / 16.67, 2);
                    const adjustedEase = settings.scrollEaseFactor * timeMultiplier;

                    currentScroll += diff * Math.min(adjustedEase, 0.5);
                    const smoothPosition = Math.round(currentScroll * 100) / 100;

                    window.scrollTo(0, smoothPosition);

                    if (delaySettings.scrollAnimationDelay.enabled) {
                        setTimeout(() => {
                            rafId = requestAnimationFrame(animate);
                        }, delaySettings.scrollAnimationDelay.value);
                    } else {
                        rafId = requestAnimationFrame(animate);
                    }
                };

                lastUpdateTime = performance.now();
                if (delaySettings.scrollAnimationDelay.enabled) {
                    setTimeout(() => {
                        rafId = requestAnimationFrame(animate);
                    }, delaySettings.scrollAnimationDelay.value);
                } else {
                    rafId = requestAnimationFrame(animate);
                }
            }
        };

        const handleScroll = () => {
            if (!isScrolling && !isDragging) {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
            }
        };

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A") {
                const anchor = target.getAttribute("href");
                if (anchor?.startsWith("#")) {
                    const el = document.querySelector(anchor);
                    if (el) {
                        e.preventDefault();
                        const offset = getScrollOffset();
                        const elTop = (el as HTMLElement).offsetTop - offset;
                        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                        targetScroll = Math.max(0, Math.min(elTop, maxScroll));

                        const settings = isTrackpad ? trackpadSettings : mouseSettings;

                        if (!isScrolling) {
                            isScrolling = true;
                            const animate = () => {
                                const diff = targetScroll - currentScroll;
                                if (Math.abs(diff) < settings.scrollStopThreshold) {
                                    currentScroll = targetScroll;
                                    window.scrollTo(0, Math.round(currentScroll * 100) / 100);
                                    isScrolling = false;
                                    return;
                                }

                                currentScroll += diff * settings.scrollEaseFactor;
                                window.scrollTo(0, Math.round(currentScroll * 100) / 100);

                                if (delaySettings.scrollAnimationDelay.enabled) {
                                    setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
                                } else {
                                    requestAnimationFrame(animate);
                                }
                            };

                            if (delaySettings.scrollAnimationDelay.enabled) {
                                setTimeout(() => requestAnimationFrame(animate), delaySettings.scrollAnimationDelay.value);
                            } else {
                                requestAnimationFrame(animate);
                            }
                        }
                    }
                }
            }
        };

        const scrollHandler = () => {
            handleScroll();
            if (delaySettings.scrollAnimationDelay.enabled) {
                setTimeout(() => requestAnimationFrame(updateScrollbar), delaySettings.scrollAnimationDelay.value);
            } else {
                requestAnimationFrame(updateScrollbar);
            }
        };

        const updateScrollbar = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const maxScroll = scrollHeight - clientHeight;

            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight - 8;
            const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

            if (scrollbarRef.current) {
                scrollbarRef.current.style.setProperty('--scrollY', `${topPercent}px`);
                scrollbarRef.current.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
            }
        };

        const handleResize = () => {
            const resizeDelay = delaySettings.resizeDelay.enabled ?
                delaySettings.resizeDelay.value : 0;

            if (resizeDelay > 0) {
                setTimeout(updateScrollbar, resizeDelay);
            } else {
                updateScrollbar();
            }
        };

        initScroll();
        updateScrollbar();

        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('scroll', scrollHandler, {passive: true});
        document.addEventListener('click', handleAnchorClick);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('click', handleAnchorClick);
            window.removeEventListener('resize', handleResize);

            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [isTrackpad, trackpadSettings, mouseSettings, pathname, getScrollOffset, delaySettings, isMobile, isDragging]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        const routeDelay = delaySettings.routeChangeDelay.enabled ?
            delaySettings.routeChangeDelay.value : 0;

        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, routeDelay);
    }, [pathname, delaySettings.routeChangeDelay]);



    return (
        <>
            {children}
            {showScrollbar && !isMobile && (
                <div
                    ref={scrollbarRef}
                    className={`scrollbar m:block hidden window`}
                />
            )}

          
        </>
    );
}


