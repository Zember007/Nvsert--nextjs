'use client';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { AppNavigationItem } from '@/components/general/AppNavigation';
import AppCollapsibleList from '@/components/general/AppCollapsibleList';
import Button from '@/components/ui/Button';
import AppCtaBanner from '@/components/general/AppCtaBanner';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { ContentBlock, NavigationItem } from '@/store/navigation';
import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import DotNavList from '@/components/general/DotNavList';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import { filterPrepositions } from '@/hook/filter';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store';

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
    const { heading, richText, image, imageCaption } = block;

    // Extract first markdown image from content
    const firstImage = { alt: imageCaption, src: image?.url, width: image?.width, height: image?.height };
    if (richText && heading) {
        return (
            <div
                id={'block-' + block.id}
                className="w-full">
                <div
                    className="flex justify-center group items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer"
                    onClick={onToggle}
                >
                    <h4 className="group-active:scale-[0.98] transition-all duration-100  text-[#34446D] flex-1">
                        {heading}
                    </h4>
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

                {
                    firstImage.src ? (
                        <div className="max-w-[700px] mx-auto mt-[50px]">
                            <Image src={'https://test11.audiosector.ru/cp' + firstImage.src || ''} alt={firstImage.alt || ''} className="w-full h-auto"
                                width={firstImage.width || 0}
                                height={firstImage.height || 0}
                            />
                        </div>
                    ) : (<></>)
                }
            </div>
        );
    }

    return null;
};

interface ClientPageProps {
    initialNavigation: NavigationItem;
    initialSlug: string;
}

const ServiceDetailContent: React.FC<ClientPageProps> = ({ initialNavigation, initialSlug }) => {
    const slug = initialSlug;
    const { openDefaultModal } = useHeaderContext();

    const { navigation } = useSelector((state: RootState) => state.navigation);

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);

    const currentService = useMemo(() => {
        if (navigation && navigation.length > 0) {
            return navigation[currentServiceIndex];
        }
        return initialNavigation || undefined;
    }, [initialNavigation, currentServiceIndex, slug]);

    // Sync index with slug
    React.useEffect(() => {
        if (navigation && navigation.length > 0) {
            console.log('navigation', navigation, slug);
            const index = navigation.findIndex(item => item.slug === slug);
            if (index !== -1) {
                setCurrentServiceIndex(index);
            }
        }
    }, [slug, navigation]);

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
                    if (navigation?.[index]) {
                        const newUrl = `/services/${navigation[index].slug}`;
                        window.history.replaceState({}, '', newUrl);
                    }
                }}
                maskClosable={false}
            >
                {navigation?.map((item) => <PhotoView
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
                <div className="wrapper pt-[50px] ">
                    <div className="flex gap-[40px]">
                        <div className="flex flex-col m:gap-[50px] gap-[40px] flex-1">
                            <h1 className="!m-0  -translate-x-[4px] m:text-left text-center">
                                {filterPrepositions(currentService?.title || '')}
                            </h1>

                            {/* Two Column Layout */}
                            <div className="flex gap-[40px] items-stretch m:flex-row flex-col">
                                {/* Left Column */}
                                <div className="m:w-[250px] relative">
                                    <div className="sticky xl:top-[116px] top-[106px] flex flex-col xl:gap-[40px] gap-[20px]">

                                        <div className="flex flex-col gap-[20px] m:flex-col-reverse">
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
                                            {navigation?.filter(item => item.slug !== currentService?.slug) && (
                                                <AppCollapsibleList
                                                    position='left'
                                                    title={'Рекомендуем к оформлению'}
                                                    items={navigation.filter(item => item.category.name === currentService?.category.name && item.slug !== currentService?.slug).slice(0, 4)}
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

                                {/* Right Column */}
                                <div className="flex-1 flex flex-col items-center gap-[50px]">
                                    {/* Dynamic Content Blocks */}
                                    <div className="xl:hidden block w-full">
                                        <DotNavList
                                            position={null}
                                            items={currentService?.content?.map(item => ({ id: item.id, title: item.heading }))}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col items-center space-y-[50px]">
                                        {sortedContentBlocks.map((block, index) => (
                                            <React.Fragment key={block.id}>
                                                {index === ctaInsertAfterIndex && (
                                                    <AppCtaBanner
                                                        key="cta-banner"
                                                        text={currentService?.cta?.text || ''}
                                                        description={currentService?.cta?.description || ''}
                                                        onButtonClick={() => { openDefaultModal('introForm') }}
                                                    />
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
                                    {navigation?.filter(item => item.slug !== currentService?.slug) && (
                                        <AppCollapsibleList
                                            position='left'
                                            title={'Рекомендуем к оформлению'}
                                            items={navigation.filter(item => item.category.name === currentService?.category.name && item.slug !== currentService?.slug).slice(0, 4)}
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
                            <div className=" sticky top-[116px] flex flex-col gap-[50px]">
                                <Button
                                    onClick={() => { openDefaultModal('orderForm') }}
                                    label='Оформить заявку'
                                />

                                <DotNavList
                                    items={currentService?.content?.map(item => ({ id: item.id, title: item.heading }))}
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


