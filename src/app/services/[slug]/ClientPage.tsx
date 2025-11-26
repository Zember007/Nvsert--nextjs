'use client';
import React, {  useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { NavigationItem } from '@/store/navigation';
/* import useWindowSize from '@/hook/useWindowSize'; */
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

// Галерея с ленивой загрузкой, чтобы её JS не блокировал первый рендер
const ServiceGallery = dynamic(
    () => import('@/components/services/ServiceGallery'),
    { ssr: false }
);
interface ClientPageProps {
    initialNavigation: NavigationItem;
    initialSlug: string;
}

const ctaInsertAfterIndex = 1;


const ServiceDetailContent: React.FC<ClientPageProps> = ({ initialNavigation, initialSlug }) => {
    /*  const slug = initialSlug; */
    const { openDefaultModal, initialNavigation: navigation } = useHeaderContext();
    /* const { height: windowHeight, width: windowWidth } = useWindowSize(); */

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number | null>(null);

    const currentService = currentServiceIndex !== null && navigation
        ? navigation[currentServiceIndex]
        : initialNavigation;


    const toggleSection = (blockId: number) => {
        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };



    useEffect(() => {
        if (currentServiceIndex === null) return;

        const idQuery = window.location.hash.split('#')[1];
        if (idQuery) {
            const element = document.getElementById(idQuery);
            if (!element) return;
            window.scrollTo({
                top: element.offsetTop - 50,
                behavior: 'smooth',
            });
        }
    }, [currentServiceIndex]);

    const recomendedServices: NavigationItem[] = [];

    return (
        <div className="main text-[#000]  mb-[100px]">
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }, { id: 3, title: currentService?.title || '', full_slug: '/services/' + currentService?.slug }]} />

            <ServiceGallery
                navigation={navigation}
                onChange={(index: number) => {
                    setCurrentServiceIndex(index);
                    if (navigation?.[index]) {
                        const newUrl = `/services/${navigation[index].slug}`;
                        window.history.replaceState({}, '', newUrl);
                    }
                }}
            />

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

const ClientPage = ({ initialNavigation, initialSlug }: ClientPageProps) => {
    return (
        <ServiceDetailContent initialNavigation={initialNavigation} initialSlug={initialSlug} />
    );
};

export default ClientPage;


