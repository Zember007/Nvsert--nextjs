'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import StandardPageLayout from '@/components/general/StandardPageLayout';
import CollapseSection from '@/components/general/CollapseSection';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import Map from './_components/Map';
import Slider from './_components/Slider';
import { AboutData } from './page';
import AppCtaBanner from '@/components/general/AppCtaBanner';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { StrapiResponsiveImage } from '@/components/general/StrapiResponseImage';



interface AboutCompanyClientProps {
    aboutData: AboutData | null;
}

const AboutCompanyClient: React.FC<AboutCompanyClientProps> = ({ aboutData }) => {
    const [showAbout, setShowAbout] = React.useState<boolean>(true);
    const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);
    const { processContent } = useRichTextRenderer();
    const { openDefaultModal } = useHeaderContext();


    const toggleSection = (id: number) => {
        setSectionsOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Функция для обработки специальных маркеров
    const renderRichText = (richText: string): React.ReactNode => {
        // Обработка [slider]
        if (richText.includes('[slider]')) {
            const parts = richText.split('[slider]');
            return (
                <>
                    {parts[0] && <div className="mb-[20px]">{renderRichText(parts[0])}</div>}
                    <Slider />
                    {parts[1] && <div>{renderRichText(parts[1])}</div>}
                </>
            );
        }

        // Обработка [map]
        if (richText.includes('[map]')) {
            const parts = richText.split('[map]');
            return (
                <>

                    {parts[0] && <div className="mb-[20px]">{renderRichText(parts[0])}</div>}
                    <Map />
                    {parts[1] && <div>{renderRichText(parts[1])}</div>}
                </>
            );
        }



        // Обычный текст
        return processContent(richText);
    };


    // Генерируем элементы для правой навигации на основе загруженных данных
    const dotNavItems = aboutData?.content?.map((block, index) => ({
        id: index + 1,
        title: block.heading,
        active: sectionsOpen.includes(index + 1),
        href: `#block-${index + 1}`
    })) || [];

    if (!aboutData) {
        return (
            <StandardPageLayout
                title="О компании"
                breadcrumbs={[{ id: 1, title: 'О компании', full_slug: '/about' }]}

                dotNavItems={[]}
                showButton={true}
            >
                <div className="w-full text-center py-[50px]">
                    <span className="text-[16px] text-gray-500">Данные не найдены</span>
                </div>
            </StandardPageLayout>
        );
    }

    return (
        <StandardPageLayout
            title={aboutData.title || "О компании"}
            breadcrumbs={[{ id: 1, title: 'О компании', full_slug: '/about' }]}

            dotNavItems={dotNavItems}
            showButton={true}
        >
            {aboutData.content?.map((block, index) => {

                return (
                    <div key={block.id} id={`block-${index + 1}`} className="w-full">
                        <CollapseSection
                            title={block.heading}
                            isOpen={!sectionsOpen.includes(index + 1)}
                            onToggle={() => toggleSection(index + 1)}
                        >
                            <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                                {renderRichText(block.richText)}
                            </div>
                        </CollapseSection>
                        {
                            block.image?.url ? (
                                <div className="max-w-full mx-auto mx-auto mt-[50px] flex justify-center">
                                    <StrapiResponsiveImage image={block.image} baseUrl={'https://test11.audiosector.ru/cp'} />
                                </div>
                            ) : (<></>)
                        }
                    </div>
                )
            })}
            <AppCtaBanner
                key="cta-banner"
                text={aboutData?.cta?.text || ''}
                descriptionClassName="max-w-full"
                description={aboutData?.cta?.description || ''}
                onButtonClick={() => { openDefaultModal('introForm') }}
            />
        </StandardPageLayout>
    );
};

export default AboutCompanyClient;

