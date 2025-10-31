'use client'
import '@/assets/styles/base.scss';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '@/components/general/AppFooter';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import AppModalWrapper from '@/components/general/AppModalWrapper';
import { AppDispatch, RootState } from '@/config/store';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopyNotification from '@/components/general/elements/CopyNotification';
import { updateActionNavigation } from '@/store/navigation';
import CustomScrollbar from '@/components/general/CustomScrollbar';

gsap.registerPlugin(ScrollTrigger);


const LayoutContent = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { setDefaultModalActive, defaultModalActive, defaultModalName, resetCountModal, defaultModalCount, showCopyNotification, notificationPosition, hideNotification } = useHeaderContext();
    const { configs: configsPure, file_configs: fileConfigsPure, status } = useSelector((state: RootState) => state.config);
    /* 
        const configs = useMemo(() => {
            if (!configsPure) return {};
            
            const parsedConf: any = {};
            configsPure.forEach((item) => {
                parsedConf[item.key] = item.value;
            });
            return parsedConf;
        }, [configsPure]); */
    /* 
        const file_configs = useMemo(() => {
            if (!fileConfigsPure) return {};
            
            const parsedConf: any = {};
            fileConfigsPure.forEach((item) => {
                parsedConf[item.key] = item.value;
            });
            return parsedConf;
        }, [fileConfigsPure]); */

    /*     useEffect(() => {
            if (Object.keys(configs).length > 0 && Object.keys(file_configs).length > 0) {
                dispatch(setMetadata(generateMetadata(configs, file_configs)));
            }
        }, [configs, file_configs, dispatch]); */

    // Загружаем данные только один раз при монтировании, если они еще не загружены
    useEffect(() => {
        if (status === 'idle') {
            /* dispatch(updateActionConfigs());
            dispatch(updateActionFileConfigs()); */
            dispatch(updateActionNavigation());
        }
    }, [dispatch, status]);



    return (
        <>
             <AppModalWrapper
                setDefaultModalActive={setDefaultModalActive}
                defaultModalActive={defaultModalActive}
                defaultModalName={defaultModalName}
                reset={resetCountModal}
                countTrigger={defaultModalCount}
            />

            <AppHeader />

            <main >
                {children}
            </main>
              <AppFooter />
            <div className="bg-noise"></div>
            {/* <CustomScrollbar target="window" /> */}

            <CopyNotification
                isVisible={showCopyNotification}
                onHide={hideNotification}
                duration={3000}
                position={notificationPosition}
            />
        </>
    );
};

const Layout_wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <LayoutContent>
            {children}
        </LayoutContent>
    );
};

export default Layout_wrapper;