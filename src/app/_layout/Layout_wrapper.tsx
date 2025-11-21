import '@/assets/styles/base.scss';
import AppHeader from '@/components/general/AppHeader';
import { ReactNode, lazy, Suspense } from 'react';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import AppModalWrapper from '@/components/general/AppModalWrapper';
import CopyNotification from '@/components/general/elements/CopyNotification';
import { NavigationItem } from '@/store/navigation';
import { groupServices } from '@/assets/lib/navigation';

// Lazy load footer для уменьшения TBT
const AppFooter = lazy(() => import('@/components/general/AppFooter'));


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
            <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
                <AppFooter />
            </Suspense>

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