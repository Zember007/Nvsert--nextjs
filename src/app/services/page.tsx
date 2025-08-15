'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { RootState } from '@/config/store';
import { useButton } from '@/hook/useButton';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import ServiceItem from '@/components/services/ServiceItem';


const ServicesContent = () => {
    const [expandedServices, setExpandedServices] = useState<number[]>([]);

    const toggleService = (index: number) => {
        setExpandedServices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };
    const searchParams = useSearchParams();

    const { services } = useSelector((state: RootState) => state.navigation);



    // Get the type query parameter and auto-expand matching category
    useEffect(() => {

        const typeParam = searchParams.get('type');
        if (typeParam) {
            const matchingIndex = services.findIndex((service) =>
                service.name === typeParam
            );

            if (matchingIndex !== -1) {
                setExpandedServices([matchingIndex]);
                const element = document.getElementById(`service-${matchingIndex}`);
                window.scrollTo({ top: (element?.offsetTop || 100) - 100, behavior: 'smooth' });
            }
        }
    }, [services, searchParams]);

    const { setWrapperRef, setButtonRef } = useButton()


    return (
        <div className="main text-[#000] overflow-hidden select-none relative ">
            {/* Хлебные крошки */}
            <div className="mt-[10px]">
                <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }]} />
            </div>

            <div className="flex items-center m:justify-between justify-center wrapper !flex-row pt-[30px] pb-[50px]">
                <h1 className="xl:text-[48px] m:text-[40px] text-[24px] font-light text-center ">
                    Полный список услуг
                </h1>

                <div ref={setWrapperRef} className="m:!block !hidden tariff-wrap w-[250px]">
                    <button
                        onClick={() => {
                            if (expandedServices.length > 0) {
                                setExpandedServices([]);
                            } else {
                                setExpandedServices(services.map((_, index) => index));
                            }
                        }}
                        ref={setButtonRef}
                        className="tariff bg-[#f5f5f2]  h-[50px] rounded-[4px] text-[19px] font-light border border-[#93969d] flex items-center justify-center"
                    >
                        {expandedServices.length > 0 ? 'Скрыть все услуги' : 'Показать все услуги'}
                    </button>
                </div>
            </div>

            {/* Список услуг */}
            <div className="flex flex-col">
                {services.map((service, index) => (
                    <ServiceItem
                        key={index}
                        service={service}
                        index={index}
                        isExpanded={expandedServices.includes(index)}
                        onToggle={toggleService}
                    />
                ))}
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServicesContent />
        </Suspense>
    );
};

export default Page;