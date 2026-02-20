'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useHeaderContext } from 'shared/contexts';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui';
import ServiceCard from 'widgets/services/ServiceCard';
import { NavigationItem } from '@/types/navigation';
import textSize from '@/assets/styles/base/base.module.scss';
import dynamic from 'next/dynamic';

const ServiceRecommendedListDynamic = dynamic(
  () => import('widgets/services').then((m) => m.ServiceRecommendedList),
  { ssr: false },
);

interface ServiceLeftColumnContentProps {
  /** Slug услуги, для которой на сервере отрендерено LCP-изображение */
  initialSlug: string;
}

/**
 * Контент левого sticky-столбца: оверлей поверх серверного изображения (срок, цена, клик)
 * или полная карточка при смене услуги; кнопка и список рекомендаций.
 */
export default function ServiceLeftColumnContent({ initialSlug }: ServiceLeftColumnContentProps) {
  const { initialNavigation: navigation, openDefaultModal } = useHeaderContext();
  const { t } = useTranslation();
  const pathname = usePathname();
  const [showSecondaryUI, setShowSecondaryUI] = useState(false);

  const currentSlug = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const i = segments.indexOf('services');
    if (i >= 0 && segments[i + 1]) return segments[i + 1];
    return segments[segments.length - 1] || '';
  }, [pathname]);

  const currentService = useMemo(() => {
    if (!navigation?.length) return null;
    const found = navigation.find((s: NavigationItem) => s.slug === currentSlug);
    return found ?? navigation[0];
  }, [navigation, currentSlug]);

  const recomendedServices = useMemo(() => {
    if (!navigation?.length || !currentService) return [];
    const currentCategoryName = currentService?.category?.name ?? null;
    const sorted = navigation
      .filter((item: NavigationItem) => item?.slug && item.slug !== currentService.slug)
      .filter((item: NavigationItem) => Boolean(item?.category?.name))
      .sort((a: NavigationItem, b: NavigationItem) => {
        const aName = a?.category?.name ?? '';
        const bName = b?.category?.name ?? '';
        if (currentCategoryName) {
          if (aName === currentCategoryName && bName !== currentCategoryName) return -1;
          if (aName !== currentCategoryName && bName === currentCategoryName) return 1;
        }
        return (a?.title ?? '').localeCompare(b?.title ?? '');
      });
    return sorted.slice(0, 3);
  }, [navigation, currentService]);

  const useServerImage = currentSlug === initialSlug;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!useServerImage) {
      document.body.classList.add('service-lcp-image-hidden');
    } else {
      document.body.classList.remove('service-lcp-image-hidden');
    }
    return () => document.body.classList.remove('service-lcp-image-hidden');
  }, [useServerImage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ric = (window.requestIdleCallback as ((cb: () => void) => number) | undefined);
    if (ric) {
      const id = ric(() => setShowSecondaryUI(true));
      return () => window.cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setShowSecondaryUI(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!currentService) return null;

  return (
    <>
      {useServerImage ? (
        <div className="absolute inset-0 rounded-[4px] cursor-pointer" role="button" tabIndex={0} onClick={() => document.getElementById('service-' + currentService?.id)?.click()} onKeyDown={(e) => e.key === 'Enter' && document.getElementById('service-' + currentService?.id)?.click()}>
          <div className="absolute bottom-[9px] left-[9px] right-[9px] justify-between flex py-[10px] px-[6px] bg-[#F5F5F580] rounded-[4px] border border-[#000] backdrop-blur-[4px]">
            <div className="flex flex-col gap-[10px]">
              <span className={`${textSize.text5} !tracking-[-0.4px]`}>{t('services.labels.duration')}</span>
              <span className={`${textSize.text1} !tracking-[-0.4px] font-light`}>{currentService.duration}</span>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className={`${textSize.text5} !tracking-[-0.4px]`}>{t('services.labels.price')}</span>
              <span className={`${textSize.text1} !tracking-[-0.4px] font-light`}>{currentService.price}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="pointer-events-auto">
          <ServiceCard
            onClick={() => document.getElementById('service-' + currentService?.id)?.click()}
            serviceName={currentService?.category?.name || ''}
            certificate={{
              ...currentService,
              slug: '',
              id: currentService?.id ?? 0,
              documentId: currentService?.documentId ?? '',
              title: currentService?.title ?? '',
              duration: currentService?.duration ?? '',
              price: currentService?.price ?? '',
              description: currentService?.description ?? '',
              createdAt: currentService?.createdAt ?? '',
              updatedAt: currentService?.updatedAt ?? '',
              publishedAt: currentService?.publishedAt ?? '',
              documents: currentService?.documents ?? [],
              img: currentService?.img ?? null,
              category: currentService?.category ?? null,
            }}
            title={false}
            padding={false}
            priority={false}
          />
        </div>
      )}

      <Button
        wrapperClassName="xl:hidden block !max-w-[250px]"
        onClick={() => openDefaultModal('orderForm')}
        label={t('form.buttons.submitApplication')}
      />

      {showSecondaryUI && (
        <ServiceRecommendedListDynamic
          items={recomendedServices}
          wrapperClassName="w-full m:block hidden"
          itemClassName={undefined}
          textClassName="m:!whitespace-pre-line !whitespace-normal"
        />
      )}
    </>
  );
}
