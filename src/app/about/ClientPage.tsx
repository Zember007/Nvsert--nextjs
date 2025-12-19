'use client';
import React from 'react';
import { useRichTextRenderer } from 'shared/lib';
import { useHeaderContext } from 'shared/contexts';
import { GridBox, Map, Slider } from 'widgets/about';
import {
  AppCtaBanner,
  CollapseSection,
  StandardPageLayout,
  StrapiResponsiveImage,
} from 'widgets/layout';
import { AboutData } from './page';

interface AboutCompanyClientProps {
    aboutData: AboutData | null;
}

const AboutCompanyClient: React.FC<AboutCompanyClientProps> = ({ aboutData }) => {
    const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);
    const { processContent } = useRichTextRenderer();
    const { openDefaultModal } = useHeaderContext();

    const toggleSection = (id: number) => {
        setSectionsOpen(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Исправленная функция — теперь возвращает один элемент, а не массив!
    const renderRichText = (richText: string): React.ReactNode => {
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

        if (richText.includes('[grid_blocks_start]') && richText.includes('[grid_blocks_end]')) {
            const beforeGrid = richText.substring(0, richText.indexOf('[grid_blocks_start]')).trim();
            const gridContent = richText.substring(
                richText.indexOf('[grid_blocks_start]') + '[grid_blocks_start]'.length,
                richText.indexOf('[grid_blocks_end]')
            ).trim();
            const afterGrid = richText.substring(richText.indexOf('[grid_blocks_end]') + '[grid_blocks_end]'.length).trim();

            // ВОТ ГЛАВНОЕ ИСПРАВЛЕНИЕ: возвращаем один <>, а не массив
            return (
                <>
                    {beforeGrid && <div className="mb-[30px]">{renderRichText(beforeGrid)}</div>}
                    <GridBox gridContent={gridContent} processContent={processContent} />
                    {afterGrid && <div className="mt-[30px]">{renderRichText(afterGrid)}</div>}
                </>
            );
        }

        return processContent(richText);
    };

    const dotNavItems = aboutData?.content?.map((block, index) => ({
        id: index,
        title: block.heading,
        active: sectionsOpen.includes(index),
        href: `#block-${index}`
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
                    (
                        <div key={block.id} id={`block-${index + 1}`} className="w-full">


                            <CollapseSection
                                title={block.heading}
                                isOpen={!sectionsOpen.includes(index + 1)}
                                onToggle={() => toggleSection(index + 1)}
                            >
                                {block.image?.url && index === 0 && (
                                    <div className="max-w-full mx-auto mb-[50px] mt-[30px] flex justify-center">
                                        <StrapiResponsiveImage
                                            image={block.image}
                                            priority={true}
                                            baseUrl=""
                                        />
                                    </div>
                                )}
                                <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                                    {renderRichText(block.richText.replace('[start_img]', ''))}
                                </div>
                            </CollapseSection>

                            {block.image?.url && index !== 0 && (
                                <div className="max-w-full mx-auto mt-[50px] flex justify-center">
                                    <StrapiResponsiveImage
                                        image={block.image}
                                        baseUrl=""
                                    />
                                </div>
                            )}
                        </div>
                    )
                );
            })}

            {/* Убрали ненужный key — и так уникально */}
            <AppCtaBanner
                text={aboutData.cta?.text || ''}
                descriptionClassName="max-w-full"
                description={aboutData.cta?.description || ''}
                onButtonClick={() => openDefaultModal('introForm')}
            />
        </StandardPageLayout>
    );
};

export default AboutCompanyClient;