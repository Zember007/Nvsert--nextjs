'use client';
import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useCustomScroll } from "@/hook/useCustomScroll 2";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Дефолтные настройки скролла
    const scrollSettings = {
        smoothScrollFactor: 0.25,
        scrollPadding: 2,
        enabled: showScrollbar && !isMobile,
        target: 'window' as const
    };

    const getScrollOffset = useCallback(() => {
        if (pathname.includes('/policy') || pathname.includes('/organizations')) return -115;
        if (pathname.includes('/blogPage')) return -174;
        if (pathname.includes('/organizations/where-do-you-lose')) return -110;
        if (pathname.includes('/editors')) return 90;
        return 120;
    }, [pathname]);

    const { scrollbarRef: customScrollbarRef } = useCustomScroll({
        ...scrollSettings,
        getScrollOffset
    });

    // Определение мобильного устройства
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768 ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0);

            setIsMobile(isMobileDevice);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Управление скроллбаром на определенных страницах
    useEffect(() => {
        const hideScrollPaths = ['/pricing'];
        const shouldHideScrollbar = hideScrollPaths.some(path => pathname === path || pathname.startsWith(path));

        if (!isMobile && window.screen.width > 768) {
            document.body.style.overflow = shouldHideScrollbar ? 'hidden' : '';
            setShowScrollbar(!shouldHideScrollbar);
        } else {
            document.body.style.overflow = '';
            setShowScrollbar(false);
        }

        // Диспатч события scroll для обновления
        setTimeout(() => window.dispatchEvent(new Event('scroll')), 40);

        return () => {
            if (!isMobile) {
                document.body.style.overflow = '';
            }
        };
    }, [pathname, isMobile]);

    // Сброс скролла при смене роута
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 40);
    }, [pathname]);

    return (
        <>
            {children}
            {showScrollbar && !isMobile && (
                <div
                    ref={customScrollbarRef}
                    className="scrollbar md:block hidden"
                />
            )}
        </>
    );
}