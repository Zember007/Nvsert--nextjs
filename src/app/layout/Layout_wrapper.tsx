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
    const simpleBarRef = useRef<any>(null);

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
        let currentScroll = 0;
        let targetScroll = 0;
        let isScrolling = false;





        const initScroll = () => {
            const scrollTop = window.scrollY;

            currentScroll = scrollTop;
            targetScroll = currentScroll;
        };

        const smoothScroll = () => {
            const diff = targetScroll - currentScroll;
            if (Math.abs(diff) < 0.1) {
                isScrolling = false;
                return;
            }
            currentScroll += diff * 0.2;

            window.scrollTo({ top: currentScroll });

            requestAnimationFrame(smoothScroll);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            targetScroll += e.deltaY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
                const maxScroll = scrollHeight - clientHeight;
                targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
            

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        const handleScroll = () => {
                currentScroll = window.scrollY;
                targetScroll = currentScroll;
        };

        initScroll();

            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('scroll', handleScroll);

        return () => {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('scroll', handleScroll);
        };
    }, [simpleBarRef])

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
            </body>
        </>
    );
};

export default Layout_wrapper;