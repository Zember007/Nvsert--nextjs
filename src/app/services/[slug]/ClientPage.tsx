'use client';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { NavigationItem } from '@/store/navigation';
import useWindowSize from '@/hook/useWindowSize';
import ServiceGallery from '@/components/services/ServiceGallery';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
interface ClientPageProps {
    initialNavigation: NavigationItem;
    initialSlug: string;
}

const ServiceDetailContent: React.FC<ClientPageProps> = ({ initialNavigation, initialSlug }) => {
    const slug = initialSlug;
    const { openDefaultModal, initialNavigation: navigation } = useHeaderContext();
    const { height: windowHeight, width: windowWidth } = useWindowSize();

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number | null>(navigation.findIndex(item => item.slug === slug) || null);

    const currentService = currentServiceIndex !== null && navigation
        ? navigation[currentServiceIndex]
        : initialNavigation;

    // Sync index with slug
    /* React.useEffect(() => {
        if (navigation && navigation.length > 0) {
            const index = navigation.findIndex(item => item.slug === slug);
            if (index !== -1) {
                setCurrentServiceIndex(index);
            }
        }
    }, [slug, navigation]); */


    const toggleSection = (blockId: number) => {
        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };


    const ctaInsertAfterIndex = useMemo(() => {
        return Math.ceil((currentService.content?.length || 0) / 2) - 1;
    }, [currentService]);

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

    const recomendedServices = useMemo(() => {
        return [...(navigation || [])].sort((a, b) => a.category.name === currentService?.category.name ? -1 : 1).filter(item => item.slug !== currentService?.slug).slice(0, (windowHeight >= 820 || windowWidth < 960) ? 3 : 2);
    }, [navigation, currentService, windowHeight, windowWidth]);



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
        <Suspense fallback={<div>Loading...</div>}>
            <ServiceDetailContent initialNavigation={initialNavigation} initialSlug={initialSlug} />
        </Suspense>
    );
};

export default ClientPage;


