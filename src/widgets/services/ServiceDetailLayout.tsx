'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'shared/ui';
import { AppCtaBanner } from 'widgets/layout';
import ServiceCard from 'widgets/services/ServiceCard';
import ServiceContentBlock from 'widgets/services/ServiceContentBlock';
import ServiceArticleDate from 'widgets/services/ServiceArticleDate';
import { NavigationItem } from '@/types/navigation';
import { filterPrepositions } from 'shared/lib';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';


const ServiceRecommendedList = dynamic(
  () => import('widgets/services').then((m) => m.ServiceRecommendedList),
  { ssr: false },
);

const DotNavList = dynamic(() => import('widgets/layout').then((m) => m.DotNavList), {
  ssr: false,
});

interface ServiceDetailLayoutProps {
    currentService: NavigationItem;
    recomendedServices: NavigationItem[];
    expandedSections: number[];
    onToggleSection: (blockId: number) => void;
    ctaInsertAfterIndex: number;
    onOpenOrderForm: () => void;
    onOpenIntroForm: () => void;
    /** Когда true: не рендерить обёртку и h1 (LCP уже в серверном shell) */
    contentOnly?: boolean;
}

const ServiceDetailLayout: React.FC<ServiceDetailLayoutProps> = ({
    currentService,
    recomendedServices,
    expandedSections,
    onToggleSection,
    ctaInsertAfterIndex,
    onOpenOrderForm,
    onOpenIntroForm,
    contentOnly = false,
}) => {
    const [showSecondaryUI, setShowSecondaryUI] = useState(false);
    const { t } = useTranslation();

    // Откладываем отрисовку второстепенных блоков (списки с анимациями),
    // чтобы не нагружать первый рендер
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ric = window.requestIdleCallback as
            | ((cb: () => void) => number)
            | undefined;

        if (ric) {
            const id = ric(() => setShowSecondaryUI(true));
            return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
        }

        const timeoutId = window.setTimeout(() => setShowSecondaryUI(true), 0);
        return () => window.clearTimeout(timeoutId);
    }, []);
    const rightColumnContent = (
                        <>
                        {/* Right Column */}
                        <div className="flex-1 flex flex-col items-center gap-[50px]">
                            {/* Dynamic Content Blocks */}
                            <div className="xl:hidden block w-full">
                                {showSecondaryUI && (
                                    <DotNavList
                                        position={null}
                                        items={currentService?.content?.map((item, index) => ({
                                            id: index,
                                            title: item.heading,
                                            index: index,
                                        }))}
                                    />
                                )}
                            </div>
                            <div className="w-full flex flex-col items-center space-y-[50px]">
                                {currentService.content?.map((block, index) => (
                                    <React.Fragment key={block.id}>
                                        {index === ctaInsertAfterIndex && (
                                            <AppCtaBanner
                                                key="cta-banner"
                                                text={currentService?.cta?.text || ''}
                                                description={currentService?.cta?.description || ''}
                                                onButtonClick={onOpenIntroForm}
                                            />
                                        )}
                                        <ServiceContentBlock
                                            index={index}
                                            block={block}
                                            isExpanded={!expandedSections.includes(block.id)}
                                            onToggle={() => onToggleSection(block.id)}
                                            isFirst={index === 0}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                            {currentService.content && currentService.content.length > 0 && (
                                <ServiceArticleDate
                                    date={currentService.createdAt}
                                />
                            )}
                        </div>

                        <div className="w-full m:hidden block">
                            {showSecondaryUI && (
                                <ServiceRecommendedList
                                    items={recomendedServices}
                                    wrapperClassName="w-full m:hidden block"
                                    itemClassName="w-full"
                                    textClassName="m:!whitespace-pre-line !whitespace-normal"
                                />
                            )}
                        </div>
                        </>
    );

    const leftColumnContent = !contentOnly && (
                        <div className="m:w-[265px] relative">
                            <div className="sticky top-[104px] flex flex-col xl:gap-[40px] gap-[20px] no-scrollbar m:overflow-y-auto m:max-h-[calc(100vh-104px)]">
                                <div className="flex  gap-[20px] flex-col-reverse">
                                    <div className="w-[250px] mx-auto">
                                        <ServiceCard
                                            onClick={() => {
                                                document.getElementById('service-' + currentService?.id)?.click();
                                            }}
                                            serviceName={currentService?.category?.name || ''}
                                            certificate={{
                                                ...currentService,
                                                slug: '',
                                                id: currentService?.id || 0,
                                                documentId: currentService?.documentId || '',
                                                title: currentService?.title || '',
                                                duration: currentService?.duration || '',
                                                price: currentService?.price || '',
                                                description: currentService?.description || '',
                                                createdAt: currentService?.createdAt || '',
                                                updatedAt: currentService?.updatedAt || '',
                                                publishedAt: currentService?.publishedAt || '',
                                                documents: currentService?.documents || [],
                                                img: currentService?.img || null,
                                                category: currentService?.category || null,
                                            }}
                                            title={false}
                                            padding={false}
                                            priority={true}
                                        />
                                    </div>

                                    <Button
                                        wrapperClassName="xl:hidden block !max-w-[250px]"
                                        onClick={onOpenOrderForm}
                                        label={t('form.buttons.submitApplication')}
                                    />
                                </div>

                                {showSecondaryUI && (
                                    <ServiceRecommendedList
                                        items={recomendedServices}
                                        wrapperClassName="w-full m:block hidden"
                                        itemClassName={undefined}
                                        textClassName="m:!whitespace-pre-line !whitespace-normal"
                                    />
                                )}
                            </div>
                        </div>
    );

    const twoColumnContent = (
                    <div className="flex gap-[40px] items-stretch m:flex-row flex-col">
                        {leftColumnContent}
                        {rightColumnContent}
                    </div>
    );

    const sidebar = (
                <div className="w-[250px] relative xl:block hidden">
                    <div className=" sticky top-[104px] flex flex-col gap-[50px] no-scrollbar overflow-y-auto max-h-[calc(100vh-104px)]">
                        <Button
                            onClick={onOpenOrderForm}
                            label={t('form.buttons.submitApplication')}
                        />

                        {showSecondaryUI && (
                            <DotNavList
                                items={currentService?.content?.map((item, index) => ({
                                    id: index,
                                    title: item.heading,
                                    index: index,
                                }))}
                            />
                        )}
                    </div>
                </div>
    );

    if (contentOnly) {
        return (
            <div className="flex gap-[40px]">
                {twoColumnContent}
                {sidebar}
            </div>
        );
    }

    return (
        <div className="wrapper pt-[50px] ">
            <div className="flex gap-[40px]">
                <div className="flex flex-col m:gap-[50px] gap-[40px] flex-1">
                    <h1 className="!m-0  m:text-left text-center">
                        {filterPrepositions(currentService?.title || '')}
                    </h1>
                    {twoColumnContent}
                    {sidebar}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailLayout;


