'use client'
import '@/assets/styles/base.scss';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, useEffect, useRef, cloneElement, isValidElement } from 'react';
import AppFooter from '@/components/general/AppFooter';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import AppModalWrapper from '@/components/general/AppModalWrapper';
import CopyNotification from '@/components/general/elements/CopyNotification';
import { NavigationItem } from '@/store/navigation';
import { groupServices } from '@/assets/lib/navigation';


const LayoutContent = ({ children, initialNavigation }: { children: ReactNode; initialNavigation?: NavigationItem[]; }) => {

    const { setDefaultModalActive, defaultModalActive, defaultModalName, resetCountModal, defaultModalCount, showCopyNotification, notificationPosition, hideNotification } = useHeaderContext();



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