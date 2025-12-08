'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { groupServices } from '@/assets/lib/navigation';
import { NavigationItem } from '@/store/navigation';
import ServicesBreadcrumbs from '@/components/services/ServicesBreadcrumbs';
import ServicesHeader from '@/components/services/ServicesHeader';
import ServicesList from '@/components/services/ServicesList';
import { useHeaderContext } from '@/components/contexts/HeaderContext';



const ServicesContent = () => {

    const { initialNavigation } = useHeaderContext();
    const [expandedServices, setExpandedServices] = useState<number[]>([]);
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);

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

    const handleToggleAll = () => {
        if (expandedServices.length > 0) {
            setExpandedServices([]);
        } else {
            setExpandedServices(services.map((_, index) => index));
        }
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

    const isAnyExpanded = expandedServices.length > 0;

    return (
        <div className="main text-[#000] overflow-hidden relativ mb-[100px] ">
            <ServicesBreadcrumbs />

            <ServicesHeader
                title="Полный список услуг"
                isExpanded={isAnyExpanded}
                onToggleAll={handleToggleAll}
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />

            <ServicesList
                services={services}
                expandedServices={expandedServices}
                hover={hover}
                active={active}
                onToggleService={toggleService}
            />
        </div>
    );
};

export default ServicesContent;

