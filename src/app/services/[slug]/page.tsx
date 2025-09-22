'use client';
import React, { Suspense, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '@/config/store';
import ServiceCard from '@/components/services/ServiceCard';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { AppNavigationItem } from '@/components/general/AppNavigation';
import AppCollapsibleList from '@/components/general/AppCollapsibleList';
import Button from '@/components/ui/Button';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { ContentBlock } from '@/store/navigation';
import { PhotoProvider } from '@/assets/lib/react-photo-view';

// Component to render rich text with proper formatting
const RichTextRenderer: React.FC<{ content: string }> = ({ content }) => {
    // Split content by lines and process each line
    const processContent = (text: string) => {
        const lines = text.split('\n');
        const elements: React.ReactNode[] = [];
        let currentListItems: string[] = [];
        let listKey = 0;

        const flushList = () => {
            if (currentListItems.length > 0) {
                elements.push(
                    <ul key={`list-${listKey++}`} className="list-disc -my-[5px]">
                        {currentListItems.map((item, idx) => (
                            <li key={idx} className="text-[16px] font-light leading-[1.5] text-black ml-[25px]">
                                {item}
                            </li>
                        ))}
                    </ul>
                );
                currentListItems = [];
            }
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
                flushList();
                elements.push(<div key={`br-${index}`} className='h-[15px]' />);
                return;
            }

            // Handle list items (lines starting with -)
            if (trimmedLine.startsWith('- ')) {
                currentListItems.push(trimmedLine.substring(2));
                return;
            }

            // Handle subheadings (lines starting with #)
            if (trimmedLine.startsWith('# ')) {
                flushList();
                elements.push(
                    <h3 key={`subheading-${index}`} className="text-[18px] mt-[9px] font-normal tracking-[-0.01em] text-black">
                        {trimmedLine.substring(2)}
                    </h3>
                );
                return;
            }

            // Regular paragraph
            flushList();
            if (trimmedLine) {
                elements.push(
                    <p key={`p-${index}`} className="text-[16px] -my-[5px] font-light leading-[1.5] text-black">
                        {trimmedLine}
                    </p>
                );
            }
        });

        flushList(); // Flush any remaining list items
        return elements;
    };

    return <div>{processContent(content)}</div>;
};

// Component to render individual content blocks as collapsible sections
const ContentBlockRenderer: React.FC<{
    block: ContentBlock;
    isExpanded: boolean;
    onToggle: () => void;
}> = ({ block, isExpanded, onToggle }) => {
    const { heading, richText } = block;

    if (richText && heading) {
        return (
            <div
                id={'block-' + block.id}
                className="w-full">
                <div
                    className="flex justify-center items-center gap-[10px] pb-[10px] border-b border-[#93969D] cursor-pointer"
                    onClick={onToggle}
                >
                    <h2 className="text-[24px] font-light !m-0 leading-[16px] tracking-[0] text-[#34446D] flex-1">
                        {heading}
                    </h2>
                    <svg
                        className={`transition-transform duration-100 ${!isExpanded ? 'rotate-180' : ''}`}
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_7117_2690)">
                            <path d="M15 15L0.999999 0.999999" stroke="#93969D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 9L1 1L9 1" stroke="#93969D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_7117_2690">
                                <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 -1 16 16)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                {isExpanded && (
                    <div className="pt-[30px]">
                        <RichTextRenderer content={richText} />
                    </div>
                )}
            </div>
        );
    }

    return null;
};

const ServiceDetailContent = () => {
    const params = useParams<{ slug: string }>();
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    const { services } = useSelector((state: RootState) => state.navigation);
    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const { openDefaultModal } = useHeaderContext();
    const match = useMemo(() => {
        for (const service of services) {
            const found = service.items.find(item => item.slug === slug);
            if (found) {
                return { serviceName: service.name, item: found, serviceTitle: service.title };
            }
        }
        return null;
    }, [services, slug]);

    const recommendedServices = useMemo(() => {
        return services.find(service => service.name === match?.serviceName)?.items;
    }, [services, match]);

    // Sort content blocks by order
    const sortedContentBlocks = useMemo(() => {
        if (!match?.item?.content) return [];
        return [...match.item.content].sort((a, b) => a.order - b.order);
    }, [match?.item?.content]);



    // Toggle section expansion
    const toggleSection = (blockId: number) => {


        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };

    // Auto-expand first section
    React.useEffect(() => {
        if (sortedContentBlocks.length > 0 && expandedSections.length === 0) {
            setExpandedSections([sortedContentBlocks[0].id]);
        }
    }, [sortedContentBlocks]);

    const navigationItems = useMemo(() => {
        return match?.item?.content?.map(item => ({
            id: item.id,
            title: item.heading,
            active: expandedSections.includes(item.id)
        }));
    }, [match?.item.content, expandedSections]);

    if (!slug || !match) return (
        <div className="main"></div>
    );



    return (
        <div className="main text-[#000]  select-none relative mb-[100px]">



            <PhotoProvider
                maskOpacity={0.4} maskClassName="blurred-mask"
                speed={() => 0}

                maskClosable={false}
            >
                {/* Main Content */}
                <div className="wrapper pt-[60px]">

                    <div className="flex gap-[30px]">
                        <div className="flex flex-col gap-[50px] flex-1">
                            <h1 className="text-[48px] leading-[50px] !m-0 font-light tracking-[-0.04em] text-black">
                                {match?.item.title || 'Сертификат соответствия ГОСТ Р'}
                            </h1>


                            {/* Two Column Layout */}
                            <div className="flex gap-[30px] items-stretch">
                                {/* Left Column */}
                                <div className="w-[250px] relative">
                                    <div className=" sticky top-[110px] flex flex-col gap-[37px]">
                                            <ServiceCard serviceName={match.serviceName} certificate={{ ...match.item, slug: '' }} title={false} padding={false} />
                                        {recommendedServices && (
                                            <AppCollapsibleList
                                                title={'Рекомендуем к оформлению'}
                                                items={recommendedServices}
                                                defaultOpen={true}
                                                listClassName='flex flex-col gap-[20px]'
                                                renderItem={(children) => (
                                                    <AppNavigationItem
                                                        dark={true}
                                                        link={children.slug}
                                                        key={children.id}
                                                        title={children.title}
                                                        img={'https://test11.audiosector.ru/cp' + children.img?.url}
                                                    />
                                                )}
                                            />
                                        )}
                                    </div>

                                </div>

                                {/* Right Column */}
                                <div className="flex-1 flex flex-col items-center gap-[50px]">
                                    {/* Dynamic Content Blocks */}
                                    <div className="w-full flex flex-col gap-[30px] items-center">
                                        {sortedContentBlocks.map((block, index) => (
                                            <div key={block.id} className="w-full">
                                                <ContentBlockRenderer
                                                    block={block}
                                                    isExpanded={expandedSections.includes(block.id)}
                                                    onToggle={() => toggleSection(block.id)}
                                                />
                                                {index < sortedContentBlocks.length - 1 && (
                                                    <div className="mt-[30px]" />
                                                )}
                                            </div>
                                        ))}

                                        {/* CTA Banner */}
                                        <div className="text-center  max-w-[700px] w-full h-[300px] bg-[rgba(52,68,109,0.2)] rounded-[8px] flex flex-col justify-center items-center gap-[16px] p-[40px] backdrop-blur-sm">
                                            <h3 className="text-[24px] font-light tracking-[-0.04em]  text-black w-[460px]">
                                                Подходит ли ваша продукция <br /> под обязательную сертификацию?
                                            </h3>
                                            <p className="text-[16px] font-light tracking-[-0.01em]  text-[rgba(0,0,0,0.6)] w-[378px] leading-[1.4]">
                                                Наши специалисты проведут бесплатную предварительную проверку и дадут чёткий ответ.
                                            </p>
                                            <Button
                                                onClick={() => { openDefaultModal('orderForm') }}
                                                label='Узнать у специалиста'
                                            />
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>



                        <div className="w-[250px] relative">

                            <div className=" sticky top-[110px] flex flex-col gap-[50px]">

                                <Button
                                    onClick={() => { openDefaultModal('orderForm') }}
                                    label='Оформить заявку'
                                />

                                <AppCollapsibleList
                                    title={'Навигация по услуге'}
                                    items={navigationItems}
                                    defaultOpen={true}
                                    listClassName='flex flex-col gap-[20px]'
                                    renderItem={(item, index) => (
                                        <button
                                            key={index}
                                            className={`flex items-center gap-[24px]  cursor-pointer text-left group`}
                                            onClick={() => toggleSection(item.id)}
                                        >
                                            <div className={`flex items-center justify-center min-w-[16px] w-[16px] h-[16px] relative transition-all duration-100 ${item.active ? 'left-0' : 'left-[15px]'}`}>
                                                {item.active ? (
                                                    <>
                                                        <div className="w-[16px] h-[16px] border border-[#34446D] rounded-full relative">
                                                            <div className="w-[8px] h-[8px] bg-[#34446D] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-[8px] h-[8px]  border border-[#93969D] rounded-full"></div>
                                                )}
                                            </div>
                                            <span className={`text-[16px] group-active:scale-[0.95] transition-transform duration-100  ${item.active ? 'text-[#34446D] ' : 'text-black font-light'}`}>
                                                {item.title}
                                            </span>
                                        </button>
                                    )}
                                />

                            </div>

                        </div>
                    </div>

                </div>
            </PhotoProvider>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServiceDetailContent />
        </Suspense>
    );
};

export default Page;


