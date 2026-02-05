'use client';
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { useHeaderContext } from 'shared/contexts';
import { NavigationItem } from '@/types/navigation';
import { AppBreadcrumbs } from 'widgets/layout';
import { ServiceDetailLayout } from 'widgets/services';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';

const ServiceGallery = dynamic(
  () => import('widgets/services').then((m) => m.ServiceGallery),
  { ssr: false },
);

interface ClientPageProps {
  initialNavigation: NavigationItem;
}

const ctaInsertAfterIndex = 2;

const ServiceDetailContent: React.FC<ClientPageProps> = ({ initialNavigation }) => {
  const { openDefaultModal, initialNavigation: navigation } = useHeaderContext();
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const currentService = useMemo(() => {
    if (currentServiceIndex === null || !navigation) return initialNavigation;
    return navigation[currentServiceIndex];
  }, [currentServiceIndex, navigation, initialNavigation]);

  const toggleSection = (blockId: number) => {
    setExpandedSections((prev) =>
      prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId],
    );
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ric =
      (window.requestIdleCallback as ((cb: () => void) => number) | undefined) ??
      undefined;

    if (ric) {
      const id = ric(() => setShowGallery(true));
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
    }

    const timeoutId = window.setTimeout(() => setShowGallery(true), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (currentServiceIndex === null) return;

    requestAnimationFrame(() => {
      const idQuery = window.location.hash.split('#')[1];
      if (idQuery) {
        const element = document.getElementById(idQuery);
        if (!element) return;
        window.scrollTo({
          top: element.offsetTop - 50,
          behavior: 'smooth',
        });
      }
    });
  }, [currentServiceIndex]);

  const recomendedServices = useMemo(() => {
    if (!navigation || !currentService) return [] as NavigationItem[];

    const currentCategoryName = currentService?.category?.name ?? null;

    const sorted = navigation
      .filter((item) => item?.slug && item.slug !== currentService.slug)
      // guard: some services can have null category during SSG/SSR
      .filter((item) => Boolean(item?.category?.name))
      .sort((a, b) => {
        const aName = a?.category?.name ?? '';
        const bName = b?.category?.name ?? '';

        if (currentCategoryName) {
          const aMatches = aName === currentCategoryName;
          const bMatches = bName === currentCategoryName;
          if (aMatches && !bMatches) return -1;
          if (!aMatches && bMatches) return 1;
        }

        // stable-ish secondary ordering to avoid inconsistent sort output
        return (a?.title ?? '').localeCompare(b?.title ?? '');
      });

    return sorted.slice(0, 3);
  }, [navigation, currentService]);

  return (
    <main className="main text-[#000]  mb-[100px]">
      <AppBreadcrumbs
        root="/"
        breadcrumbs={[
          { id: 2, title: t('services.breadcrumbs.allServices'), full_slug: '/services' },
          {
            id: 3,
            title: currentService?.title || '',
            full_slug: `/services/${currentService?.slug}`,
          },
        ]}
      />

      {showGallery && (
        <ServiceGallery
          navigation={navigation}
          onChange={(index: number) => {
            setCurrentServiceIndex(index);
            if (navigation?.[index]) {
              const newUrl = `/services/${navigation[index].slug}`;
              window.history.replaceState({}, '', withLocalePrefix(newUrl, locale));
            }
          }}
        />
      )}

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
    </main>
  );
};

const ClientPage = ({ initialNavigation }: ClientPageProps) => {
  return <ServiceDetailContent initialNavigation={initialNavigation} />;
};

export default ClientPage;
