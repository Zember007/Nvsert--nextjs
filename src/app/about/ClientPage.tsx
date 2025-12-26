'use client';
import React from 'react';
import { useRichTextRenderer } from 'shared/lib';
import { useHeaderContext } from 'shared/contexts';
import { GridBox, Map } from 'widgets/about';
import { SliderPost } from 'shared/ui';
import { CountUp } from 'widgets/layout';
import textSize from '@/assets/styles/base/base.module.scss';
import {
    AppCtaBanner,
    CollapseSection,
    StandardPageLayout,
    StrapiResponsiveImage,
} from 'widgets/layout';
import { AboutData } from './page';

type SliderBlock = {
    procent: string;
    title: string;
    description: string;
};

const defaultSliderBlocks: SliderBlock[] = [
    {
        procent: '15+',
        title: 'Лет на рынке сертификации',
        description: 'Являемся надёжным партнёром с глубоким пониманием требований и процедур в разных отраслях',
    },
    {
        procent: '7',
        title: 'Этапов комплексного сопровождения',
        description: 'Ведём клиента от первой консультации до регистрации документов в реестре и передачи оригиналов в установленные сроки.',
    },
    {
        procent: '75+',
        title: 'Квалифицированных экспертов в команде',
        description: 'Каждый проект сопровождает команда специалистов с опытом от 5 лет, что гарантирует точность и надёжность результата.',
    },
    {
        procent: '10000+',
        title: 'Компаний доверяют нам работу',
        description: 'NVSERT выбрали компании по всей России, ЕАЭС и зарубежные партнёры. Среди наших клиентов — крупные холдинги и корпорации.',
    },
    {
        procent: '25+',
        title: 'Отраслей в нашей практике',
        description: 'Мы работаем с промышленностью, пищевой продукцией, строительными материалами, и другими сегментами рынка.',
    },
    {
        procent: '99%',
        title: 'Заказов выполняем раньше срока',
        description: 'Документы подготавливаются быстрее, чем указано в договоре, при этом качество и юридическая сила остаются безупречными.',
    },
];

// Функция для парсинга числа и суффикса из строки
const parseProcent = (procent: string): { value: number; suffix: string } => {
    const match = procent.match(/(\d+(?:\.\d+)?)([+%]?)/);
    if (match) {
        return {
            value: parseFloat(match[1]),
            suffix: match[2] || '',
        };
    }
    return { value: 0, suffix: '' };
};

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

    const renderSliderItem = React.useCallback(
        (block: SliderBlock) => {
            return (
                <div
                    className="h-full p-[20px] l:w-[300px] l:min-w-[300px] xxs:w-[280px] xxs:min-w-[280px] xss:w-[300px] xss:min-w-[300px] w-[280px] min-w-[280px] l:min-h-[200px] min-h-[270px] relative border border-[#93969D] bg-[#93969d26] rounded-[4px] flex flex-col justify-between transition-opacity duration-300"
                >
                    <svg
                        className="absolute top-[10px] right-[10px]"
                        width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 0L16.1889 7.2177C16.7462 10.6016 19.3984 13.2538 22.7823 13.8111L30 15L22.7823 16.1889C19.3984 16.7462 16.7462 19.3984 16.1889 22.7823L15 30L13.8111 22.7823C13.2538 19.3984 10.6016 16.7462 7.2177 16.1889L0 15L7.2177 13.8111C10.6016 13.2538 13.2538 10.6016 13.8111 7.2177L15 0Z" fill="#93969D" fillOpacity="0.5" />
                    </svg>
                    <div className="flex flex-col gap-[15px] w-full">

                        <h2 className="!text-[48px] text-[#34446D]">
                            {(() => {
                                const { value, suffix } = parseProcent(block.procent);
                                return (
                                    <>
                                        <CountUp
                                            to={value}
                                            duration={0.5}
                                            className="inline-block"
                                        />
                                        {suffix && <span>{suffix}</span>}
                                    </>
                                );
                            })()}
                        </h2>

                        <h6 className={`${textSize.headerH6} leading-[1.3] text-black !font-normal`}>
                            {block.title}
                        </h6>
                        <div>
                            {block.description}
                        </div>
                    </div>
                </div>
            );
        },
        []
    );

    // Исправленная функция — теперь возвращает один элемент, а не массив!
    const renderRichText = (richText: string): React.ReactNode => {
        if (richText.includes('[slider]')) {
            const parts = richText.split('[slider]');
            return (
                <>
                    {parts[0] && <div className="mb-[20px]">{renderRichText(parts[0])}</div>}
                    <SliderPost items={defaultSliderBlocks} renderItem={renderSliderItem} />
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