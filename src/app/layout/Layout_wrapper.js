
import '@/assets/styles/base.scss'
import AppHeader from '@/components/general/AppHeader.js';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '@/components/general/AppFooter.js';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { updateActionConfigs, updateActionFileConfigs } from '@/store/configs';
import { generateMetadata } from '@/hook/useHeadLayout';
import { setMetadata } from '@/store/metadata';
import AppModalWrapper from '@/components/general/AppModalWrapper';


const Layout_wrapper = ({ children }) => {

    const dispatch = useDispatch()

    const metadata = useSelector((state) => state.metadata);


    const { transparent } = useHeaderContext();
    const { calcPageBodyClass } = useSelector((state) => state.documents);

    const { configs: configsPure, file_configs: fileConfigsPure, status, error } = useSelector((state) => state.config);




    const configs = useMemo(() => {

        let parsedConf = {};
        configsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });

        return parsedConf;
    }, [configsPure])

    const file_configs = useMemo(() => {
        let parsedConf = {};
        fileConfigsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });

        return parsedConf;
    }, [fileConfigsPure])

    useEffect(() => {
        if (configs.length && file_configs.length) {
            dispatch(setMetadata(generateMetadata(configs, file_configs)))
        }
    }, [configs, file_configs])

    useEffect(() => {
        dispatch(updateActionConfigs())
        dispatch(updateActionFileConfigs())

        function set100Vh() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        set100Vh();

        window.addEventListener('resize', set100Vh);

    }, [])
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
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png" />
                <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png" />
                <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
                <link rel="apple-touch-icon" sizes="1024x1024" href="/apple-touch-icon-1024x1024.png" />
            </head>
            <body>
                <main className={`${transparent && 'transparent-header'}  ${calcPageBodyClass && 'cost-calc-page'}`}>

                    <div className="container">
                        <div className="content">
                            <AppHeader />
                            {children}
                        </div>

                        <AppFooter />
                    </div>
                </main >

                <AppModalWrapper />
            </body>
        </>

    );

};

export default Layout_wrapper;

