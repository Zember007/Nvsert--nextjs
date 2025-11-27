import '@/assets/styles/global.scss';
import '@/assets/styles/base.scss';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, useEffect, useRef, cloneElement, isValidElement } from 'react';
import AppFooter from '@/components/general/AppFooter';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import dynamic from 'next/dynamic';
const AppModalWrapper = dynamic(() => import('@/components/general/AppModalWrapper'), {
    loading: () => <div>Loading...</div>,
});
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
    
                {children}
           
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