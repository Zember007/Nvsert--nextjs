'use client'
import '@/assets/styles/base.scss';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, useEffect, useRef, cloneElement, isValidElement } from 'react';
import AppFooter from '@/components/general/AppFooter';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import AppModalWrapper from '@/components/general/AppModalWrapper';
import CopyNotification from '@/components/general/elements/CopyNotification';
import { NavigationItem, Services } from '@/store/navigation';
import { groupServices } from '@/assets/lib/navigation';


const LayoutContent = ({ children, initialNavigation }: { children: ReactNode; initialNavigation?: NavigationItem[]; }) => {

    const { setDefaultModalActive, defaultModalActive, defaultModalName, resetCountModal, defaultModalCount, showCopyNotification, notificationPosition, hideNotification } = useHeaderContext();


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

    // Инициализируем навигацию из серверных данных синхронно до первого рендера


    // Загружаем данные только один раз при монтировании, если они еще не загружены
    /*   useEffect(() => {
          if (status === 'idle') {
              // dispatch(updateActionConfigs());
              // dispatch(updateActionFileConfigs());
              // Загружаем навигацию только если она еще не была инициализирована
              if (navigationStatus === 'idle' && navigation.length === 0 && !initialNavigation) {
                  dispatch(updateActionNavigation());
              }
          }
      }, [dispatch, status, navigationStatus, navigation.length, initialNavigation]); */



    return (
        <>
            <AppModalWrapper
                setDefaultModalActive={setDefaultModalActive}
                defaultModalActive={defaultModalActive}
                defaultModalName={defaultModalName}
                reset={resetCountModal}
                countTrigger={defaultModalCount}
            />

            <AppHeader services={(initialNavigation && initialNavigation.length > 0) ? groupServices(initialNavigation) : []} />

            <main >
                {/* Вариант 1: Передача через Context (рекомендуется) - используйте useNavigationContext() в компонентах */}
                {/* Вариант 2: Передача через children как проп (раскомментируйте, если нужно) */}
                {children}
                {/* Альтернативный вариант с передачей через cloneElement:
                {isValidElement(children) 
                    ? cloneElement(children, { initialNavigation } as any)
                    : children
                }
                */}
            </main>
            <AppFooter />

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

const Layout_wrapper = ({ children, initialNavigation }: { children: ReactNode; initialNavigation?: NavigationItem[]; }) => {
    return (
        <LayoutContent initialNavigation={initialNavigation}>
            {children}
        </LayoutContent>
    );
};

export default Layout_wrapper;