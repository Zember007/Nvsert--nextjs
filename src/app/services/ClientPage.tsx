'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { groupServices } from '@/assets/lib/navigation';
import type { NavigationItem, Services } from '@/types/navigation';
import { useHeaderContext } from 'shared/contexts';
import { ServicesBreadcrumbs, ServicesHeader, ServicesList } from 'widgets/services';
import { useTranslation } from 'react-i18next';

const ServicesContent = () => {
  const { t } = useTranslation();
  const { initialNavigation } = useHeaderContext();
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const services = useMemo<Services[]>(() => {
    return groupServices(initialNavigation as NavigationItem[]);
  }, [initialNavigation]);

  const toggleService = (index: number) => {
    setExpandedServices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index],
    );
  };

  const handleToggleAll = () => {
    if (expandedServices.length > 0) {
      setExpandedServices([]);
    } else {
      setExpandedServices(services.map((_, index) => index));
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (services.length === 0) return;

    const id = window.location.hash.substring(1);
    if (!id) return;

    const matchingIndex = services.findIndex((service) => service.name === id);

    if (matchingIndex !== -1) {
      setExpandedServices((prev) => {
        if (prev.length === 1 && prev[0] === matchingIndex) {
          return prev;
        }
        return [matchingIndex];
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      });
    }
  }, [services]);

  const isAnyExpanded = expandedServices.length > 0;

  return (
    <main className="main text-[#000] overflow-hidden relativ mb-[100px] ">
      <ServicesBreadcrumbs />

      <ServicesHeader
        title={t('services.page.title')}
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
    </main>
  );
};

export default ServicesContent;
