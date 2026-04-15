/**
 * Компоновка layout: Header, Footer, Modal, Scrollbar, CopyNotification.
 *
 * СТРАТЕГИЯ ЗАГРУЗКИ:
 * - AppHeaderDeferred: ssr:true — шапка нужна поисковикам и LCP. Пока бандл грузится,
 *   показывается HeaderFallback — статичный HTML-скелет с базовыми ссылками (избегает CLS).
 * - AppModalWrapper, AppFooterDeferred, CopyNotificationDeferred: ssr:false — не влияют
 *   на LCP и не нужны поисковикам; откладываем загрузку до interactive.
 *
 * Suspense вокруг AppHeaderDeferred: Next.js 16 canary считает usePathname() "динамическим"
 * и бросает ошибку prerender без Suspense-границы.
 *
 * HeaderFallback содержит захардкоженные ссылки на основные страницы. При изменении
 * структуры навигации — обновляйте и его.
 */
'use client';

import { ReactNode, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHeaderContext } from 'shared/contexts';
import dynamic from 'next/dynamic';
import { NavigationItem } from '@/types/navigation';
import { groupServices } from '@/assets/lib/navigation';
import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';
import AppLogo from 'widgets/layout/AppLogo';
import headerStyles from '@/assets/styles/base/base.module.scss';
import headerMenuStyles from 'widgets/layout/Header.module.scss';
import CustomScrollbar from 'widgets/layout/CustomScrollbar';


const AppModalWrapper = dynamic(() => import('widgets/layout').then((m) => m.AppModalWrapper), {
  ssr: false,
});

const AppHeaderDeferred = dynamic(() => import('widgets/layout').then((m) => m.AppHeader), {
  ssr: true,
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

const HeaderFallback = () => {
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);
    const t = locale === 'en'
        ? { services: 'Services', contacts: 'Contacts', order: 'Order' }
        : { services: 'Услуги', contacts: 'Контакты', order: 'Заявка' };

    return (
        <header className={headerStyles.header}>
            <div className={`${headerStyles.header__bg} min-w-[192px] xss:!px-[20px] !px-[14px]`}>
                <AppLogo className="xl:mx-auto" />
            </div>

            <div className={`${headerStyles.header__menu} ${headerStyles.header__bg}`}>
                <nav className="flex items-center gap-[8px]">
                    <Link
                        prefetch={false}
                        href={withLocalePrefix('/services/', locale)}
                        className={headerMenuStyles['menu-item']}
                    >
                        <span>{t.services}</span>
                    </Link>
                    <Link
                        prefetch={false}
                        href={withLocalePrefix('/contacts/', locale)}
                        className={`${headerMenuStyles['menu-item']} hidden xss:flex`}
                    >
                        <span>{t.contacts}</span>
                    </Link>
                </nav>
            </div>

            <div className="hidden xl:flex gap-[2px]">
                <div className="w-[368px]"></div>
                <div className={`${headerStyles.header__bg} w-[192px] !backdrop-filter-none mix-blend-difference h-full`}>
                    <Link
                        prefetch={false}
                        href={withLocalePrefix('/contacts/', locale)}
                        className={`${headerMenuStyles['menu-item']} mx-auto w-[170px]`}
                    >
                        <span>{t.order}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};


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
            <Suspense fallback={null}>
                <AppHeaderDeferred services={(initialNavigation && initialNavigation.length > 0) ? groupServices(initialNavigation) : []} />
            </Suspense>

            <main >

                {children}

            </main>
            <AppFooterDeferred />

            <CustomScrollbar target="window" />

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