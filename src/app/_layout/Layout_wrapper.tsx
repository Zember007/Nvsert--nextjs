'use client';

import { AppFooter, AppHeader } from 'widgets/layout';
import { ReactNode, useEffect } from 'react';
import { useHeaderContext } from 'shared/contexts';
import dynamic from 'next/dynamic';
import CopyNotification from 'widgets/layout/elements/CopyNotification';
import { NavigationItem } from '@/types/navigation';
import { groupServices } from '@/assets/lib/navigation';
import '@/assets/styles/base.scss';


const AppModalWrapper = dynamic(() => import('widgets/layout').then((m) => m.AppModalWrapper), {
  ssr: false,
});


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