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

    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);


    return (
        <div className="main text-[#000] overflow-hidden select-none relativ mb-[100px] ">





            {/* Хлебные крошки */}
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }]} />

            <div className="flex items-center m:justify-between justify-center wrapper gap-[20px] m:!flex-row pt-[60px] pb-[50px]">
                <h1 className="tracking-[-0.04em] xl:!text-[48px] m:text-[40px] text-[24px] font-light text-center -translate-x-[4px] translate-y-[1px]">
                    Полный список услуг
                </h1>

                <div ref={setWrapperRef} className="tariff-wrap w-[250px]">
                    <button
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onMouseDown={() => setActive(true)}
                        onMouseUp={() => setActive(false)}
                        onClick={() => {
                            if (expandedServices.length > 0) {
                                setExpandedServices([]);
                            } else {
                                setExpandedServices(services.map((_, index) => index));
                            }
                        }}
                        ref={setButtonRef}
                        className="btnIconAn tariff bg-[#F5F5F2]   h-[50px] rounded-[4px] text-[20px] font-light border border-[#93969d] flex items-center justify-center"
                    >
                        <span className='sendText'>
                            {expandedServices.length > 0 ? 'Свернуть услуги' : 'Показать услуги'}
                        </span>

                        <span className='sendIconLeft'>

                        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6557_2555)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1049 7.72888L17.1338 7.73442L17.1533 15.6286L17.155 16.6434L17.1567 17.6568L7.23434 17.6339L7.22952 15.6043L13.69 15.621L9.37014 11.3012L10.8018 9.86951L15.1217 14.1894L15.1049 7.72888Z" fill="black"/>
<path d="M7.2572 9.1715L8.67142 7.75728L6.5501 5.63596L5.13588 7.05018L7.2572 9.1715Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_6557_2555">
<rect width="16" height="16" fill="white" transform="translate(11.5 0.686523) rotate(45)"/>
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
                        hover={hover}
                        active={active}
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