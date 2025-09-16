'use client';
import React, { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '@/config/store';
import ServiceCard from '@/components/services/ServiceCard';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';

const ServiceDetailContent = () => {
    const params = useParams<{ slug: string }>();
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    const { services } = useSelector((state: RootState) => state.navigation);

    const match = useMemo(() => {
        for (const service of services) {
            const found = service.items.find(item => item.slug === slug);
            if (found) {
                return { serviceName: service.name, item: found, serviceTitle: service.title };
            }
        }
        return null;
    }, [services, slug]);

    if (!slug) return null;

    return (
        <div className="main text-[#000] overflow-hidden select-none relativ mb-[100px] ">
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }, { id: 3, title: match?.item.title || '', full_slug: `/services/${slug}` }]} />

            <div className="wrapper pt-[60px]">
                <h1 className="tracking-[-0.04em] xl:!text-[48px] m:text-[40px] text-[24px] font-light -translate-x-[4px] translate-y-[1px] mb-[30px]">
                    {match?.item.title || 'Услуга'}
                </h1>

                {match ? (
                    <ServiceCard serviceName={match.serviceName} certificate={match.item} />
                ) : (
                    <div>Услуга не найдена.</div>
                )}
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServiceDetailContent />
        </Suspense>
    );
};

export default Page;


