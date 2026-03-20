'use client';

import { ReactNode, Suspense } from 'react';
import { useHeaderContext } from 'shared/contexts';
import dynamic from 'next/dynamic';
import { NavigationItem } from '@/types/navigation';
import { groupServices } from '@/assets/lib/navigation';


const AppModalWrapper = dynamic(() => import('widgets/layout').then((m) => m.AppModalWrapper), {
  ssr: false,
});

const AppHeaderDeferred = dynamic(() => import('widgets/layout').then((m) => m.AppHeader), {
  ssr: false,
  loading: () => <header style={{ minHeight: 88 }} />,
});

const AppFooterDeferred = dynamic(() => import('widgets/layout').then((m) => m.AppFooter), {
  ssr: false,
});

const CopyNotificationDeferred = dynamic(
  () => import('widgets/layout/elements/CopyNotification'),
  {
    ssr: false,
  },
);


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

            {/* Next.js canary treats routing data (used by AppHeader via usePathname) as dynamic.
                Keep it under Suspense to avoid blocking-route prerender errors. */}
            <Suspense fallback={<header style={{ minHeight: 88 }} />}>
                <AppHeaderDeferred services={(initialNavigation && initialNavigation.length > 0) ? groupServices(initialNavigation) : []} />
            </Suspense>

            <main >

                {children}

            </main>
            <AppFooterDeferred />

            {/* <CustomScrollbar target="window" /> */}

            <CopyNotificationDeferred
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