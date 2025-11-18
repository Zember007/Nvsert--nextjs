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
import useWindowSize from '@/hook/useWindowSize';
import { StrapiResponsiveImage } from '@/components/general/StrapiResponseImage';

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
    isFirst?: boolean;
}> = ({ block, isExpanded = true, onToggle, isFirst = false }) => {
    const { heading, richText, image } = block;

    if (richText && heading) {
        return (
            <div
                id={'block-' + block.id}
                className="w-full">
                <div
                    className="flex justify-center group items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer line-after"
                    onClick={onToggle}
                >
                    <h4 className="-my-[0.6%] group-active:scale-[0.98] transition-all duration-100  group-hover:text-[#34446D] text-[#000] flex-1">
                        {heading}
                    </h4>


                    <svg
                        className={`transition-transform duration-100 group-hover:text-[#34446D] text-[#000] ${!isExpanded ? 'rotate-180' : ''}`}
                        width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="currentColor" strokeWidth="2" />
                        <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>

                {isExpanded && (
                    <div className="pt-[30px]">
                        <RichTextRenderer content={richText.replace('📞 ', '')} />
                    </div>
                )}

                {
                    image?.url ? (
                        <div className="max-w-full mx-auto mx-auto mt-[50px] flex justify-center">
                            <StrapiResponsiveImage
                                image={image}
                                baseUrl={'https://test11.audiosector.ru/cp'}
                                priority={isFirst && isExpanded}
                            />
                        </div>
                    ) : null
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
    const { openDefaultModal, initialNavigation: navigation } = useHeaderContext();
    const { height: windowHeight, width: windowWidth } = useWindowSize();



    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState<number | null>(null);

    const currentService = currentServiceIndex && navigation ? navigation[currentServiceIndex] : initialNavigation;

    // Sync index with slug
    React.useEffect(() => {
        if (navigation && navigation.length > 0) {
            const index = navigation.findIndex(item => item.slug === slug);
            if (index !== -1) {
                setCurrentServiceIndex(index);
            }
        }
    }, [slug, navigation]);


    const toggleSection = (blockId: number) => {
        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };


    const ctaInsertAfterIndex = useMemo(() => {
        return Math.ceil((currentService.content?.length || 0) / 2) - 1;
    }, [currentService]);

    useEffect(() => {
        if (currentServiceIndex === null) return;
        let timer: NodeJS.Timeout | null = null;
        const idQuery = window.location.hash.split('#')[1];
        if (idQuery) {
            timer = setTimeout(() => {
                const element = document.getElementById(idQuery);
                if (!element) return;
                window.scrollTo({
                    top: (element?.offsetTop) - 50,
                    behavior: 'smooth'
                });
            }, 1000);
        } else {
            if (timer) {
                clearTimeout(timer);
            }
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [currentServiceIndex]);

    const recomendedServices = useMemo(() => {
        return [...(navigation || [])].sort((a, b) => a.category.name === currentService?.category.name ? -1 : 1).filter(item => item.slug !== currentService?.slug).slice(0, (windowHeight >= 820 || windowWidth < 960) ? 3 : 2);
    }, [navigation, currentService, windowHeight, windowWidth]);



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
            {(currentService) &&
                <div className="wrapper pt-[50px] ">
                    <div className="flex gap-[40px]">
                        <div className="flex flex-col m:gap-[50px] gap-[40px] flex-1">
                            <h1 className="m:!m-0  m:text-left text-center">
                                {filterPrepositions(currentService?.title || '')}
                            </h1>

                            {/* Two Column Layout */}
                            <div className="flex gap-[40px] items-stretch m:flex-row flex-col">
                                {/* Left Column */}
                                <div className="m:w-[265px] relative">
                                    <div className="sticky top-[104px] flex flex-col xl:gap-[40px] gap-[20px] m:overflow-y-auto m:max-h-[calc(100vh-104px)]">

                                        <div className="flex  gap-[20px] flex-col-reverse">
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
                                                    priority={true}
                                                />
                                            </div>

                                            <Button
                                                wrapperClassName='xl:hidden block !max-w-[250px]'
                                                onClick={() => { openDefaultModal('orderForm') }}
                                                label='Оформить заявку'
                                            />
                                        </div>

                                        <div className="w-full m:block hidden">
                                            {recomendedServices.length > 0 && (
                                                <AppCollapsibleList
                                                    position='left'
                                                    title={'Рекомендуем к оформлению'}
                                                    items={recomendedServices}
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
                                        {currentService.content?.map((block, index) => (
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
                                                    isExpanded={!expandedSections.includes(block.id)}
                                                    onToggle={() => toggleSection(block.id)}
                                                    isFirst={index === 0}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    {currentService.content && currentService.content.length > 0 && (
                                        <div className="w-full flex justify-end">
                                            <p className='text-[12px] leading-[8px] text-[#93969D] font-light'>Статья написана 20.04.2025</p>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full m:hidden block">
                                    {recomendedServices.length > 0 && (
                                        <AppCollapsibleList
                                            position='left'
                                            title={'Рекомендуем к оформлению'}
                                            items={recomendedServices}
                                            defaultOpen={true}
                                            listClassName='flex flex-col gap-[20px]'
                                            renderItem={(children) => (
                                                <AppNavigationItem
                                                    className='w-full'
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
                            <div className=" sticky top-[104px] flex flex-col gap-[50px] overflow-y-auto max-h-[calc(100vh-104px)]">
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


