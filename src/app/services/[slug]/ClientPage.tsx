'use client';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { NavigationItem } from '@/store/navigation';
import useWindowSize from '@/hook/useWindowSize';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

/* const ServiceGallery = dynamic(
    () => import('@/components/services/ServiceGallery'),
    { ssr: false }
); */
interface ClientPageProps {
    initialNavigation: NavigationItem;
}

const ctaInsertAfterIndex = 2;


const ServiceDetailContent: React.FC<ClientPageProps> = ({ initialNavigation }) => {
    const { openDefaultModal, initialNavigation: navigation } = useHeaderContext();
    const { height: windowHeight, width: windowWidth } = useWindowSize();

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number | null>(null);

    const currentService = useMemo(() => {
        if (currentServiceIndex === null || !navigation) return initialNavigation;
        return navigation[currentServiceIndex];
    }, [currentServiceIndex, navigation, initialNavigation]);

    // toggleSection без изменений, т.к. безопасно
    const toggleSection = (blockId: number) => {
        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };

    // Scroll только после first paint
    useEffect(() => {
        if (currentServiceIndex === null) return;

        // откладываем scroll до next frame
        requestAnimationFrame(() => {
            const idQuery = window.location.hash.split('#')[1];
            if (idQuery) {
                const element = document.getElementById(idQuery);
                if (!element) return;
                window.scrollTo({
                    top: element.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        });
    }, [currentServiceIndex]);

    // recomendedServices разбиваем на две useMemo: сначала сортировка, потом slice
    const recomendedServices = useMemo(() => {
        if (!navigation || !currentService) return [];

        const sorted = navigation
            .filter(item => item.slug !== currentService.slug)
            .sort((a, b) =>
                a.category.name === currentService.category.name ? -1 : 1
            );

        const count = (windowHeight >= 820 || windowWidth < 960) ? 3 : 2;
        return sorted.slice(0, count);
    }, [navigation, currentService, windowHeight, windowWidth]);




    return (
        <div className="main text-[#000]  mb-[100px]">
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }, { id: 3, title: currentService?.title || '', full_slug: '/services/' + currentService?.slug }]} />

            {/* <ServiceGallery
                navigation={navigation}
                onChange={(index: number) => {
                    setCurrentServiceIndex(index);
                    if (navigation?.[index]) {
                        const newUrl = `/services/${navigation[index].slug}`;
                        window.history.replaceState({}, '', newUrl);
                    }
                }}
            /> */}

            {/* Main Content */}
            {currentService && (
                <ServiceDetailLayout
                    currentService={currentService}
                    recomendedServices={recomendedServices}
                    expandedSections={expandedSections}
                    onToggleSection={toggleSection}
                    ctaInsertAfterIndex={ctaInsertAfterIndex}
                    onOpenOrderForm={() => openDefaultModal('orderForm')}
                    onOpenIntroForm={() => openDefaultModal('introForm')}
                />
            )}
        </div>
    );
};

const ClientPage = ({ initialNavigation }: ClientPageProps) => {
    return (
        <ServiceDetailContent initialNavigation={initialNavigation} />
    );
};

export default ClientPage;


