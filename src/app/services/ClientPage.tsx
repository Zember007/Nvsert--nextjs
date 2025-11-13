'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useButton } from '@/hook/useButton';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import ServiceItem from '@/components/services/ServiceItem';
import { groupServices } from '@/assets/lib/navigation';
import { NavigationItem } from '@/store/navigation';
import { Services } from '@/store/navigation';

interface ServicesClientPageProps {
    initialNavigation: NavigationItem[];
}

const ServicesContent: React.FC<ServicesClientPageProps> = ({ initialNavigation }) => {
    const [expandedServices, setExpandedServices] = useState<number[]>([]);

    // Используем useMemo для предотвращения рекурсии
    const services = useMemo(() => {
        return groupServices(initialNavigation);
    }, [initialNavigation]);

    const toggleService = (index: number) => {
        setExpandedServices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    // Get the hash from URL and auto-expand matching category
    useEffect(() => {
        // Используем window.location только на клиенте
        if (typeof window === 'undefined') return;
        if (services.length === 0) return;

        const id = window.location.hash.substring(1);
        if (!id) return;

        const matchingIndex = services.findIndex((service) =>
            service.name === id
        );

        if (matchingIndex !== -1) {
            setExpandedServices(prev => {
                // Предотвращаем лишние обновления состояния
                if (prev.length === 1 && prev[0] === matchingIndex) {
                    return prev;
                }
                return [matchingIndex];
            });

            // Используем requestAnimationFrame для более плавного скролла
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const element = document.getElementById(id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
            });
        }
    }, [services]); // Зависимость от services, но services стабилен благодаря useMemo

    const { setWrapperRef, setButtonRef } = useButton()

    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);

    return (
        <div className="main text-[#000] overflow-hidden  relativ mb-[100px] ">

            {/* Хлебные крошки */}
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }]} />

            <div className="flex items-center m:justify-between justify-center wrapper overflow-hidden gap-[20px] m:!flex-row pt-[50px] pb-[50px]">
                <h1 className="text-center -translate-x-[4px] translate-y-[1px]">
                    Полный список услуг
                </h1>

                <div ref={setWrapperRef} className="tariff-wrap w-[250px]">
                    <button
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onMouseDown={() => { setActive(true); setHover(true); }}
                        onMouseUp={() => setActive(false)}
                        onTouchStart={() => {
                            setHover(true);
                            setActive(true);
                        }}
                        onTouchEnd={() => {
                            setActive(false);
                            setHover(false);
                        }}
                        onClick={() => {
                            if (expandedServices.length > 0) {
                                setExpandedServices([]);
                            } else {
                                setExpandedServices(services.map((_, index) => index));
                            }

                            setActive(false);
                            setHover(false);
                        }}
                        ref={setButtonRef}
                        className="btnIconAn width-23 tariff bg-[#F5F5F2]   h-[50px] rounded-[4px] btn-text border border-[#93969d] flex items-center justify-center"
                    >
                            <span className='sendText'>
                                {expandedServices.length > 0 ? 'Свернуть услуги' : 'Показать услуги'}
                            </span>

                        <span className='sendIconLeft'>

                            <svg
                                className={`${expandedServices.length > 0 ? 'rotate-180' : ''} transition-all`}
                                width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_6557_2555)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.1049 7.72888L17.1338 7.73442L17.1533 15.6286L17.155 16.6434L17.1567 17.6568L7.23434 17.6339L7.22952 15.6043L13.69 15.621L9.37014 11.3012L10.8018 9.86951L15.1217 14.1894L15.1049 7.72888Z" fill="black" />
                                    <path d="M7.2572 9.1715L8.67142 7.75728L6.5501 5.63596L5.13588 7.05018L7.2572 9.1715Z" fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_6557_2555">
                                        <rect width="16" height="16" fill="white" transform="translate(11.5 0.686523) rotate(45)" />
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
                        last={index === services.length - 1}
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

export default ServicesContent;

