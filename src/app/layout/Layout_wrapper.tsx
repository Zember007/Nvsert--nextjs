'use client'
import '@/assets/styles/base.scss';
import 'simplebar-react/dist/simplebar.min.css';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '@/components/general/AppFooter';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { updateActionConfigs, updateActionFileConfigs } from '@/store/configs';
import { generateMetadata } from '@/hook/useHeadLayout';
import { setMetadata } from '@/store/metadata';
import AppModalWrapper from '@/components/general/AppModalWrapper';
import { AppDispatch, RootState } from '@/config/store';
import { usePathname } from 'next/navigation';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Layout_wrapper = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();

    const scrollbarRef = useRef<HTMLDivElement>(null)
    const metadata = useSelector((state: RootState) => state.metadata);
    const { transparent, setDefaultModalActive, defaultModalActive, defaultModalName, resetCountModal, defaultModalCount } = useHeaderContext();
    const { calcPageBodyClass } = useSelector((state: RootState) => state.documents);
    const { configs: configsPure, file_configs: fileConfigsPure } = useSelector((state: RootState) => state.config);

    const configs = useMemo(() => {
        let parsedConf: any = {};
        configsPure?.forEach((item) => {
            parsedConf[item.key] = item.value;
        });
        return parsedConf;
    }, [configsPure]);

    const file_configs = useMemo(() => {
        let parsedConf: any = {};
        fileConfigsPure?.forEach((item) => {
            parsedConf[item.key] = item.value;
        });
        return parsedConf;
    }, [fileConfigsPure]);

    useEffect(() => {

        if (configs && file_configs) {
            dispatch(setMetadata(generateMetadata(configs, file_configs)));
        }

    }, [configs, file_configs, dispatch]);

    useEffect(() => {

        dispatch(updateActionConfigs());
        dispatch(updateActionFileConfigs());

        function set100Vh() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        set100Vh();
        window.addEventListener('resize', set100Vh);

        const img = document.querySelector('img');
        img?.addEventListener('contextmenu', (e) => e.preventDefault());

        return () => {
            window.removeEventListener('resize', set100Vh);
            img?.removeEventListener('contextmenu', (e) => e.preventDefault());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!scrollbarRef.current) return
        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;

        // Инициализируем текущую прокрутку
        const initScroll = () => {
            currentScroll = window.scrollY;
            targetScroll = currentScroll;
        };

        const smoothScroll = () => {
            const diff = targetScroll - currentScroll;
            if (Math.abs(diff) < 0.1) {
                isScrolling = false;
                return;
            }
            currentScroll += diff * 0.2;
            window.scrollTo(0, currentScroll);
            requestAnimationFrame(smoothScroll);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY;

            // Ограничим targetScroll в пределах документа
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        initScroll();
        window.addEventListener('wheel', handleWheel, { passive: false });

        let isTicking = false;
        let isDragging = false;
        let startY = 0;
        let startScrollTop = 0;

        const scrollbar = scrollbarRef.current;

        if (!scrollbar) return

        // Обновление позиции и высоты ползунка при прокрутке
        function updateScrollbar() {
            const scrollTop = window.scrollY || window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            // Высота ползунка
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            // Позиция ползунка
            const maxTop = clientHeight - scrollbarHeight;
            const topPercent = maxScroll > 0 ? (scrollTop / maxScroll) * maxTop : 0;

            // Обновляем CSS-переменные
            scrollbar.style.setProperty('--scrollY', `${topPercent}px`);
            scrollbar.style.setProperty('--scrollbarHeight', `${scrollbarHeight}px`);
        }

        // Обработчик прокрутки
        window.addEventListener('scroll', () => {

            if (!isScrolling) {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
            }

            if (!isTicking) {
                requestAnimationFrame(() => {
                    updateScrollbar();
                    isTicking = false;
                });
                isTicking = true;
            }
        });

        // Обработчики для мыши
        scrollbar.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = window.scrollY || window.pageYOffset;
            e.preventDefault(); // Предотвращаем выделение текста
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight;

            // Вычисляем смещение
            const deltaY = e.clientY - startY;
            const scrollDelta = (deltaY / maxTop) * maxScroll;

            // Прокручиваем страницу
            window.scrollTo({
                top: startScrollTop + scrollDelta,
                behavior: 'auto'
            });
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Обработчики для сенсорных устройств
        scrollbar.addEventListener('touchstart', (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startScrollTop = window.scrollY || window.pageYOffset;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            const scrollbarHeight = (clientHeight / scrollHeight) * clientHeight;
            const maxTop = clientHeight - scrollbarHeight;

            // Вычисляем смещение
            const deltaY = e.touches[0].clientY - startY;
            const scrollDelta = (deltaY / maxTop) * maxScroll;

            // Прокручиваем страницу
            window.scrollTo({
                top: startScrollTop + scrollDelta,
                behavior: 'auto'
            });
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        updateScrollbar()

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', () => { });
        };
    }, [scrollbarRef])

    const [classBody, setClassBody] = useState('transparent-header');

    useEffect(() => {
        if (pathname !== '/' && classBody !== '') {
            setClassBody('');
        }
        if (pathname === '/' && classBody === '') {
            setClassBody('transparent-header');
        }
    }, [pathname, classBody]);

    return (
        <>
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />
                <meta property="og:title" content={metadata.openGraph?.title} />
                <meta property="og:description" content={metadata.openGraph?.description} />
                {metadata.openGraph?.images?.map((image, i) => (
                    <meta key={i} property="og:image" content={image} />
                ))}
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={classBody}>
                <AppModalWrapper
                    setDefaultModalActive={setDefaultModalActive}
                    defaultModalActive={defaultModalActive}
                    defaultModalName={defaultModalName}
                    reset={resetCountModal}
                    countTrigger={defaultModalCount}
                />
                <main className={`select-none ${transparent && 'transparent-header'} ${calcPageBodyClass && 'cost-calc-page'}`}>
                    <div className="content">
                        <AppHeader />
                        {children}
                    </div>
                    <AppFooter />
                </main>
                <div className="bg-noise"></div>
                <div ref={scrollbarRef} className="scrollbar"></div>
            </body>
        </>
    );
};

export default Layout_wrapper;