'use client';
import React from 'react';
import { StandardPageLayout, CollapseSection, AppCtaBanner, StrapiResponsiveImage } from 'widgets/layout';
import { useRichTextRenderer } from 'shared/lib';
import { useHeaderContext } from 'shared/contexts';
import { Slider } from 'widgets/about';
import OkpdHierarchy, { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';
import FilesList from '@/widgets/okpd/FilesList';
import textSize from '@/assets/styles/base/base.module.scss';
import Image from 'next/image';
import SearchIcon from '@/assets/images/svg/search.svg';
import { OkpdPageData } from './page';

const ClientPage = ({ initialItems, pageData }: { initialItems: Okpd2Item[]; pageData: OkpdPageData | null }) => {
    const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);
    const { processContent } = useRichTextRenderer();
    const { openDefaultModal } = useHeaderContext();

    const toggleSection = (id: number) => {
        setSectionsOpen(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

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
        return processContent(richText);
    };

    const baseDotNavItems = [
        {
            id: 1,
            title: 'Быстрый поиск кода ОКПД\u00A02',
            active: false,
            href: `#`
        },
        {
            id: 2,
            title: 'Классификатор ОКПД 2',
            active: false,
            href: `#`
        },
    ];

    const contentDotNavItems = pageData?.content?.map((block, index) => ({
        id: baseDotNavItems.length + index + 1,
        title: block.heading,
        active: sectionsOpen.includes(index + 1),
        href: `#block-${index + 1}`
    })) || [];

    const dotNavItems = [...baseDotNavItems, ...contentDotNavItems];

    return (

        <StandardPageLayout
            title={pageData?.title || "ОКПД 2"}
            breadcrumbs={[{ id: 2, title: 'ОКПД 2', full_slug: '/okpd' }]}
            dotNavItems={dotNavItems}
            contentColumn={<FilesList />}
            showButton={true}
        >
            <div className="flex flex-col">
                <p className={`${textSize.headerH4} text-[#34446D] border-b border-[#34446D] mb-[20px]`}>Быстрый поиск кода ОКПД 2</p>
                <div className="flex rounded-[4px] border border-[#34446D] overflow-hidden mb-[10px]">
                    <label className="px-[15px] py-[14px] flex-1">
                        <input type="text"
                            placeholder='Поиск по продукту или коду'
                            className={`${textSize.text1} w-full placeholder:text-black/50 h-full outline-none`}
                        />

                    </label>
                    <button className={`text-[20px] py-[16px] px-[15px] bg-[#34446D] font-normal text-[#FFF] flex items-center gap-[10px]`}>
                        <Image src={SearchIcon} alt="search" width={18} height={18} />
                        <span>Найти</span>
                    </button>
                </div>
                <span className={`${textSize.text3} font-light`}>например: «мебель детская», «приборы медицинские», 25.11.23</span>
            </div>

            <h2 className={`${textSize.headerH3} `}>Классификатор ОКПД 2</h2>

            <p className={`${textSize.text2} font-normal text-[#93969D]`}>РАЗДЕЛ A — ПРОДУКЦИЯ СЕЛЬСКОГО, ЛЕСНОГО И РЫБНОГО ХОЗЯЙСТВА</p>

            <OkpdHierarchy items={initialItems} />

            {/* Page Content */}
            {pageData?.content?.map((block, index) => {
                return (
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
                );
            })}

            {pageData?.cta && (
                <AppCtaBanner
                    text={pageData.cta.text || ''}
                    descriptionClassName="max-w-full"
                    description={pageData.cta.description || ''}
                    onButtonClick={() => openDefaultModal('introForm')}
                />
            )}
            
        </StandardPageLayout>

    );
};

export default ClientPage;


