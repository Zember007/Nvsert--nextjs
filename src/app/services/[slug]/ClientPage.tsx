'use client';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { AppNavigationItem } from '@/components/general/AppNavigation';
import AppCollapsibleList from '@/components/general/AppCollapsibleList';
import Button from '@/components/ui/Button';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { ContentBlock, NavigationItem } from '@/store/navigation';
import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import DotNavList from '@/components/general/DotNavList';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import { filterPrepositions } from '@/hook/filter';

// Component to render rich text with proper formatting
const RichTextRenderer: React.FC<{ content: string }> = ({ content }) => {
    const { processContent } = useRichTextRenderer();
    return <div>{processContent(content)}</div>;
};

// Component to render individual content blocks as collapsible sections
const ContentBlockRenderer: React.FC<{
    block: ContentBlock;
    isExpanded: boolean;
    onToggle: () => void;
}> = ({ block, isExpanded, onToggle }) => {
    const { heading, richText } = block;

    // Extract first markdown image from content
    const firstImage = React.useMemo(() => {
        if (!richText) return null;
        // Match first occurrence like ![alt](url)
        const match = richText.match(/!\[(.*?)\]\((.*?)\)/m);
        if (!match) return null;
        const alt = match[1] || '';
        const src = match[2] || '';
        if (!src) return null;
        return { alt, src };
    }, [richText]);

    if (richText && heading) {
        return (
            <div
                id={'block-' + block.id}
                className="w-full">
                <div
                    className="flex justify-center group items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer"
                    onClick={onToggle}
                >
                    <h2 className="text-[24px] group-active:scale-[0.98] transition-all duration-100 font-light   tracking-[0] text-[#34446D] flex-1">
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

                {isExpanded ? (
                    <div className="pt-[30px]">
                        <RichTextRenderer content={richText} />
                    </div>
                ) : (
                    firstImage ? (
                        <div className="max-w-[700px] mx-auto mt-[50px]">
                            <img src={firstImage.src} alt={firstImage.alt} className="w-full h-auto" />
                        </div>
                    ) : (<></>)
                )}
            </div>
        );
    }

    return null;
};

interface ClientPageProps {
    initialNavigation: NavigationItem[];
    initialSlug: string;
}

const ServiceDetailContent: React.FC<ClientPageProps> = ({ initialNavigation, initialSlug }) => {
    const slug = initialSlug;
    const { openDefaultModal } = useHeaderContext();

    const navItems = useMemo(() => {
        return initialNavigation || [];
    }, [initialNavigation]);

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [activeBlockId, setActiveBlockId] = useState<number | null>(null);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);

    const currentService = useMemo(() => {

        return navItems[currentServiceIndex] || undefined;
    }, [navItems, currentServiceIndex, slug]);

    // Sync index with slug
    React.useEffect(() => {
        if (navItems && navItems.length > 0) {
            const index = navItems.findIndex(item => item.slug === slug);
            if (index !== -1) {
                setCurrentServiceIndex(index);
            }
        }
    }, [slug, navItems]);

    const sortedContentBlocks = useMemo(() => {
        if (!currentService?.content) return [] as ContentBlock[];
        return currentService.content;
    }, [currentService?.content]);

    const toggleSection = (blockId: number) => {
        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };

    // Auto-expand first section when service changes
    React.useEffect(() => {
        if (sortedContentBlocks.length > 0) {
            setExpandedSections([sortedContentBlocks[0].id]);
        }
    }, [currentService?.id, sortedContentBlocks]);

    // Auto-expand all sections on initial load (as per original)
    React.useEffect(() => {
        if (sortedContentBlocks.length > 0) {
            setExpandedSections(sortedContentBlocks.map(item => item.id));
        }
    }, [sortedContentBlocks]);

    // Track which content block is currently in view and reflect it in the right navigation


    const ctaInsertAfterIndex = useMemo(() => {
        return Math.ceil(sortedContentBlocks.length / 2) - 1;
    }, [sortedContentBlocks.length]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentServiceIndex]);



    return (
        <div className="main text-[#000]  mb-[100px]">
            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }, { id: 3, title: currentService?.title || '', full_slug: '/services/' + currentService?.slug }]} />

            <PhotoProvider
                maskOpacity={0.4} maskClassName="blurred-mask"
                speed={() => 0}
                loop={true}
                onIndexChange={(index) => {
                    setCurrentServiceIndex(index);
                    if (navItems?.[index]) {
                        const newUrl = `/services/${navItems[index].slug}`;
                        window.history.replaceState({}, '', newUrl);
                    }
                }}
                maskClosable={false}
            >
                {navItems?.map((item) => <PhotoView
                    key={item.id}
                    title={item.title}
                    description={
                        <>
                            <span>{item.duration}</span>
                            <span>{item.price}</span>
                        </>
                    }
                    src={'https://test11.audiosector.ru/cp' + item?.img?.url}
                    width={250}
                    height={37}
                >
                    <div id={'service-' + item.id}>
                    </div>
                </PhotoView>)}
            </PhotoProvider>

            {/* Main Content */}
            {slug && currentService &&
                <div className="wrapper pt-[50px]">
                    <div className="flex gap-[40px]">
                        <div className="flex flex-col gap-[50px] flex-1">
                            <h1 className="text-[48px] leading-[50px] !m-0 font-light tracking-[-0.04em] text-black -translate-x-[4px] m:text-left text-center">
                                {filterPrepositions(currentService?.title || '')}
                            </h1>

                            {/* Two Column Layout */}
                            <div className="flex gap-[40px] items-stretch m:flex-row flex-col">
                                {/* Left Column */}
                                <div className="m:w-[250px] relative">
                                    <div className="sticky top-[112px] flex flex-col gap-[40px]">

                                        <div className="flex flex-col gap-[40px] m:flex-col-reverse">
                                            <div className="w-[250px] mx-auto">
                                                <ServiceCard
                                                    onClick={() => { document.getElementById('service-' + currentService?.id)?.click() }}
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
                                                        category: currentService?.category || null
                                                    }}
                                                    title={false}
                                                    padding={false}
                                                />
                                            </div>

                                            <Button
                                                wrapperClassName='xl:hidden block'
                                                onClick={() => { openDefaultModal('orderForm') }}
                                                label='Оформить заявку'
                                            />
                                        </div>

                                        <div className="w-full m:block hidden">
                                            {navItems?.filter(item => item.slug !== currentService?.slug) && (
                                                <AppCollapsibleList
                                                    position='left'
                                                    title={'Рекомендуем к оформлению'}
                                                    items={navItems.sort((a, b) => a.category.name === currentService?.category.name ? -1 : 1).filter(item => item.slug !== currentService?.slug).slice(0, 3)}
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

                                        <div className="xl:hidden block">
                                            <DotNavList
                                                position='left'
                                                items={currentService?.content?.map(item => ({ id: item.id, title: item.heading, active: item.id === activeBlockId }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="flex-1 flex flex-col items-center gap-[50px]">
                                    {/* Dynamic Content Blocks */}
                                    <div className="w-full flex flex-col items-center space-y-[50px]">
                                        {sortedContentBlocks.map((block, index) => (
                                            <React.Fragment key={block.id}>
                                                {index === ctaInsertAfterIndex && (
                                                    <div className="text-center   max-w-[700px] w-full min-h-[300px] bg-[rgba(52,68,109,0.2)] rounded-[8px] flex flex-col justify-center items-center gap-[16px] s:p-[40px] p-[20px] backdrop-blur-sm" key="cta-banner">
                                                        <h3 className="s:text-[24px] text-[20px] font-light tracking-[-0.04em]  text-black max-w-[460px]">
                                                            Подходит ли ваша продукция <br /> под обязательную сертификацию?
                                                        </h3>
                                                        <p className="s:text-[16px] text-[14px] font-light tracking-[-0.01em]  text-[rgba(0,0,0,0.6)] max-w-[378px] leading-[1.4]">
                                                            Наши специалисты проведут бесплатную предварительную проверку и дадут чёткий ответ.
                                                        </p>
                                                        <Button
                                                        wrapperClassName='xs:!w-[inherit] !w-full'
                                                            onClick={() => { openDefaultModal('introForm') }}
                                                            label='Связаться'
                                                        />
                                                    </div>
                                                )}
                                                <ContentBlockRenderer
                                                    block={block}
                                                    isExpanded={expandedSections.includes(block.id)}
                                                    onToggle={() => toggleSection(block.id)}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    {sortedContentBlocks.length > 0 && (
                                        <div className="w-full flex justify-end pb-[20px] border-b border-[#93969d80]">
                                            <p className='text-[12px] leading-[8px] text-[#93969D] font-light'>Статья написана 20.04.2025</p>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full m:hidden block">
                                    {navItems?.filter(item => item.slug !== currentService?.slug) && (
                                        <AppCollapsibleList
                                            position='left'
                                            title={'Рекомендуем к оформлению'}
                                            items={navItems.filter(item => item.category.name === currentService?.category.name && item.slug !== currentService?.slug).slice(0, 4)}
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
                        </div>

                        <div className="w-[250px] relative xl:block hidden">
                            <div className=" sticky top-[112px] flex flex-col gap-[50px]">
                                <Button
                                    onClick={() => { openDefaultModal('orderForm') }}
                                    label='Оформить заявку'
                                />

                                <DotNavList
                                    items={currentService?.content?.map(item => ({ id: item.id, title: item.heading, active: item.id === activeBlockId }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

const ClientPage = ({ initialNavigation, initialSlug }: ClientPageProps) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServiceDetailContent initialNavigation={initialNavigation} initialSlug={initialSlug} />
        </Suspense>
    );
};

export default ClientPage;


