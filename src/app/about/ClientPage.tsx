'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import StandardPageLayout from '@/components/general/StandardPageLayout';
import CollapseSection from '@/components/general/CollapseSection';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import Map from './_components/Map';
import { AboutData, ContentBlock } from './page';
import AppCtaBanner from '@/components/general/AppCtaBanner';
import { useHeaderContext } from '@/components/contexts/HeaderContext';



interface AboutCompanyClientProps {
    aboutData: AboutData | null;
}

const AboutCompanyClient: React.FC<AboutCompanyClientProps> = ({ aboutData: initialAboutData }) => {
    const [showAbout, setShowAbout] = React.useState<boolean>(true);
    const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);
    const [aboutData, setAboutData] = useState<AboutData | null>(initialAboutData);
    const [loading, setLoading] = useState(!initialAboutData);
    const { processContent } = useRichTextRenderer();
    const { openDefaultModal } = useHeaderContext();
    useEffect(() => {
        // Если данные уже переданы с сервера, используем их
        if (initialAboutData) {
            setAboutData(initialAboutData);
            setLoading(false);
            // Открываем все секции по умолчанию
            const allSectionIds = initialAboutData.content?.map((_: ContentBlock, index: number) => index + 1) || [];
            setSectionsOpen(allSectionIds);
            return;
        }

        // Fallback для клиентской загрузки (если данные не переданы)
        const fetchAboutData = async () => {
            try {
                const response = await fetch('/api/about');
                const result = await response.json();
                if (result.data) {
                    setAboutData(result.data);
                    // Открываем все секции по умолчанию
                    const allSectionIds = result.data.content?.map((_: ContentBlock, index: number) => index + 1) || [];
                    setSectionsOpen(allSectionIds);
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, [initialAboutData]);

    const toggleSection = (id: number) => {
        setSectionsOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Функция для обработки специальных маркеров
    const renderRichText = (richText: string): React.ReactNode => {
        // Обработка [map]
        if (richText.includes('[map]')) {
            const parts = richText.split('[map]');
            return (
                <>

                    {parts[0] && <div className="mb-[30px]">{processContent(parts[0])}</div>}
                    <Map />
                    {parts[1] && <div>{processContent(parts[1])}</div>}
                </>
            );
        }



        // Обычный текст
        return processContent(richText);
    };

    // Элементы для левой боковой панели
    const sidebarNavItems = [
        {
            id: 'about',
            label: 'О компании',
            active: showAbout,
            onClick: () => setShowAbout(true),
            icon: (
                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.8519 1.21429V7.28572C11.8519 7.56988 11.9689 7.8424 12.1773 8.04333C12.3857 8.24426 12.6683 8.35714 12.963 8.35714H19.2593L11.8519 1.21429Z" fill="white" />
                    <path d="M9.62963 7.28572V0.5H3.33333C2.44928 0.5 1.60143 0.838647 0.976311 1.44144C0.35119 2.04424 0 2.8618 0 3.71429V22.2857C0 23.1382 0.35119 23.9558 0.976311 24.5586C1.60143 25.1614 2.44928 25.5 3.33333 25.5H16.6667C17.1044 25.5 17.5379 25.4169 17.9423 25.2553C18.3467 25.0938 18.7142 24.857 19.0237 24.5586C19.3332 24.2601 19.5788 23.9057 19.7463 23.5158C19.9138 23.1258 20 22.7078 20 22.2857V10.5H12.963C12.0789 10.5 11.2311 10.1614 10.6059 9.55856C9.98082 8.95576 9.62963 8.1382 9.62963 7.28572Z" fill="white" />
                    <path d="M11.416 15.3956L8.66795 15.7112L8.56954 16.1291L9.10955 16.2204C9.46236 16.2973 9.53196 16.4139 9.45516 16.7361L8.56954 20.5496C8.33674 21.536 8.69555 22 9.53916 22C10.1932 22 10.9528 21.7229 11.2972 21.3424L11.4028 20.885C11.1628 21.0785 10.8124 21.1555 10.5796 21.1555C10.2496 21.1555 10.1296 20.9433 10.2148 20.5694L11.416 15.3956ZM11.5 13.0996C11.5 13.3913 11.3736 13.671 11.1485 13.8772C10.9235 14.0834 10.6182 14.1993 10.3 14.1993C9.98171 14.1993 9.67648 14.0834 9.45143 13.8772C9.22638 13.671 9.09995 13.3913 9.09995 13.0996C9.09995 12.808 9.22638 12.5283 9.45143 12.3221C9.67648 12.1159 9.98171 12 10.3 12C10.6182 12 10.9235 12.1159 11.1485 12.3221C11.3736 12.5283 11.5 12.808 11.5 13.0996Z" fill="#FFF" />
                </svg>
            )
        },
        {
            id: 'feedback',
            label: 'Отзывы',
            active: !showAbout,
            onClick: () => setShowAbout(false),
            icon: (
                <svg className='text-[#93969D]' width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0.5V8.625C10 9.12228 10.1975 9.59919 10.5492 9.95083C10.9008 10.3025 11.3777 10.5 11.875 10.5H20V23C20 23.663 19.7366 24.2989 19.2678 24.7678C18.7989 25.2366 18.163 25.5 17.5 25.5H2.5C1.83696 25.5 1.20107 25.2366 0.732233 24.7678C0.263392 24.2989 0 23.663 0 23V3C0 2.33696 0.263392 1.70107 0.732233 1.23223C1.20107 0.763392 1.83696 0.5 2.5 0.5H10ZM9.5675 12.6238L8.45 14.5425L6.27875 15.0125C6.19322 15.031 6.11406 15.0717 6.04918 15.1304C5.9843 15.1892 5.93596 15.2639 5.90901 15.3472C5.88206 15.4304 5.87743 15.5193 5.89559 15.6049C5.91375 15.6905 5.95407 15.7699 6.0125 15.835L7.4925 17.4913L7.2675 19.7013C7.25868 19.7883 7.27288 19.8762 7.30868 19.9561C7.34447 20.036 7.40061 20.105 7.47147 20.1564C7.54234 20.2078 7.62545 20.2397 7.7125 20.2488C7.79954 20.258 7.88747 20.2442 7.9675 20.2087L10 19.3138L12.0325 20.2087C12.1125 20.2442 12.2005 20.258 12.2875 20.2488C12.3746 20.2397 12.4577 20.2078 12.5285 20.1564C12.5994 20.105 12.6555 20.036 12.6913 19.9561C12.7271 19.8762 12.7413 19.7883 12.7325 19.7013L12.5075 17.4913L13.9888 15.835C14.0472 15.7698 14.0875 15.6903 14.1056 15.6046C14.1236 15.519 14.1189 15.43 14.0918 15.3467C14.0647 15.2634 14.0162 15.1887 13.9512 15.1301C13.8862 15.0714 13.8069 15.0309 13.7213 15.0125L11.55 14.5425L10.4325 12.6238C10.3885 12.548 10.3255 12.4851 10.2496 12.4414C10.1737 12.3976 10.0876 12.3746 10 12.3746C9.91241 12.3746 9.82635 12.3976 9.75044 12.4414C9.67454 12.4851 9.61145 12.548 9.5675 12.6238ZM12.5 0.55375C12.9736 0.654194 13.4078 0.889989 13.75 1.2325L19.2675 6.75C19.61 7.09216 19.8458 7.5264 19.9463 8H12.5V0.55375Z" fill="#93969D" />
                </svg>
            )
        }
    ];

    // Генерируем элементы для правой навигации на основе загруженных данных
    const dotNavItems = aboutData?.content?.map((block, index) => ({
        id: index + 1,
        title: block.heading,
        active: sectionsOpen.includes(index + 1),
        href: `#block-${index + 1}`
    })) || [];

    if (loading) {
        return (
            <StandardPageLayout
                title="О компании"
                breadcrumbs={[{ id: 1, title: 'О компании', full_slug: '/about' }]}
                sidebarNavItems={sidebarNavItems}
                dotNavItems={[]}
                showButton={true}
            >
                <div className="w-full text-center py-[50px]">
                    <span className="text-[16px] text-gray-500">Загрузка...</span>
                </div>
            </StandardPageLayout>
        );
    }

    if (!aboutData) {
        return (
            <StandardPageLayout
                title="О компании"
                breadcrumbs={[{ id: 1, title: 'О компании', full_slug: '/about' }]}
                sidebarNavItems={sidebarNavItems}
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
            sidebarNavItems={sidebarNavItems}
            dotNavItems={dotNavItems}
            showButton={true}
        >
            {aboutData.content?.map((block, index) => {
                const firstImage = { alt: block.imageCaption, src: block.image?.url, width: block.image?.width, height: block.image?.height };

                return (
                    <div key={block.id} id={`block-${index + 1}`} className="w-full">
                        <CollapseSection
                            title={block.heading}
                            isOpen={sectionsOpen.includes(index + 1)}
                            onToggle={() => toggleSection(index + 1)}
                        >
                            <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                                {renderRichText(block.richText)}
                            </div>
                        </CollapseSection>
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
                )
            })}
            <AppCtaBanner
                key="cta-banner"
                text={aboutData?.cta?.text || ''}
                description={aboutData?.cta?.description || ''}
                onButtonClick={() => { openDefaultModal('introForm') }}
            />
        </StandardPageLayout>
    );
};

export default AboutCompanyClient;

