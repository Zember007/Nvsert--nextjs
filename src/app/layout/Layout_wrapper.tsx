'use client'
import '@/assets/styles/base.scss';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, useEffect, useMemo, useState } from 'react';
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
import { CopyProvider, useCopyContext } from '@/components/contexts/CopyContext';
import CopyNotification from '@/components/general/elements/CopyNotification';
import { updateActionNavigation } from '@/store/navigation';
import SmoothScroll from '@/hook/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);


const LayoutContent = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const { showCopyNotification, notificationPosition, hideNotification } = useCopyContext();

    const metadata = useSelector((state: RootState) => state.metadata);
    const { transparent, setDefaultModalActive, defaultModalActive, defaultModalName, resetCountModal, defaultModalCount } = useHeaderContext();
    const { calcPageBodyClass } = useSelector((state: RootState) => state.documents);
    const { configs: configsPure, file_configs: fileConfigsPure } = useSelector((state: RootState) => state.config);

    const configs = useMemo(() => {
        let parsedConf: any = {};
        console.log(configsPure);

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
        dispatch(updateActionNavigation());

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
                <meta name="yandex-verification" content="90db85a0cc46fb2c" />
                <meta name="theme-color" content="#646467"></meta>
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
                <SmoothScroll>
                    <AppHeader />

                    <main className={` ${transparent && 'transparent-header'} ${calcPageBodyClass && 'cost-calc-page'}`}>

                        {children}

                    </main>
                    <AppFooter />
                    <div className="bg-noise"></div>
                    {/* <CustomScrollbar target="window" /> */}


                </SmoothScroll>

                <CopyNotification
                    isVisible={showCopyNotification}
                    onHide={hideNotification}
                    duration={3000}
                    position={notificationPosition}
                />
            </body>
        </>
    );
};

const Layout_wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <CopyProvider>
            <LayoutContent>
                {children}
            </LayoutContent>
        </CopyProvider>
    );
};

export default Layout_wrapper;