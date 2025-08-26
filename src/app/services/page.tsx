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

    const { services } = useSelector((state: RootState) => state.navigation);

    const searchParams = useSearchParams();


    // Get the type query parameter and auto-expand matching category
    useEffect(() => {

        const id = new URL(window.location.href).hash.substring(1);
        if (id) {
            const matchingIndex = services.findIndex((service) =>
                service.name === id
            );

            if (matchingIndex !== -1) {
                setExpandedServices([matchingIndex]);

                setTimeout(() => {
                    const element = document.getElementById(id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                }, 200);

            }
        }
    }, [services, searchParams]);




    const { setWrapperRef, setButtonRef } = useButton()


    return (
        <div className="main text-[#000] overflow-hidden select-none relativ mb-[100px] ">
            {/* Хлебные крошки */}
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }]} />

            <div className="flex items-center m:justify-between justify-center wrapper gap-[20px] m:!flex-row pt-[60px] pb-[50px]">
                <h1 className="xl:!text-[48px] m:text-[40px] text-[24px] font-light text-center -translate-y-[6px]">
                    Полный список услуг
                </h1>

                <div ref={setWrapperRef} className="tariff-wrap w-[250px]">
                    <button
                        onClick={() => {
                            if (expandedServices.length > 0) {
                                setExpandedServices([]);
                            } else {
                                setExpandedServices(services.map((_, index) => index));
                            }
                        }}
                        ref={setButtonRef}
                        className="btnIconAn tariff bg-[#f5f5f2]  h-[50px] rounded-[4px] text-[20px] font-light border border-[#93969d] flex items-center justify-center"
                    >
                        <span className='sendText w-[192px]'>
                            {expandedServices.length > 0 ? 'Скрыть все услуги' : 'Показать все услуги'}
                        </span>

                        <span className='sendIconLeft'>
                            <svg
                                className={` ${expandedServices.length > 0 ? 'rotate-180' : ''} transition-transform duration-100`}
                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_5820_2465)">
                                    <path d="M1 1L15 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 7L15 15L7 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5820_2465">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </span>
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