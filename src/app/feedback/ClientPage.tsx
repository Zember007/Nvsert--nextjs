'use client';
import React from 'react';
import StandardPageLayout from '@/components/general/StandardPageLayout';
import CollapseSection from '@/components/general/CollapseSection';
import Image from 'next/image';
import { useButton } from '@/hook/useButton';
import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';

type FeedbackPhoto = {
    url?: string;
    formats?: { thumbnail?: { url?: string } };
    width?: number;
    height?: number;
    name?: string;
    alternativeText?: string;
};

type FeedbackCategory = {
    id: number;
    title?: string;
    slug?: string;
    order?: number;
};

type FeedbackItem = {
    id: number;
    title: string;
    slug?: string;
    order?: number;
    photo?: FeedbackPhoto;
    content?: { body?: string };
    category?: FeedbackCategory;
};

export type FeedbackCategoryGroup = {
    id: number;
    title: string;
    slug: string;
    order: number;
    items: FeedbackItem[];
};


const FeedbackCard: React.FC<{ item: FeedbackItem }> = ({ item }) => {
    const img = item.photo?.url || item.photo?.formats?.thumbnail?.url || '';

    const { processContent } = useRichTextRenderer();

    return (
        <PhotoView
            src={'https://test11.audiosector.ru/cp' + img}
            width={250}
            height={37}
        >
            <div className="cursor-pointer active:scale-[0.95] transition-all duration-100 flex gap-[16px] p-[20px] border border-[#93969d] bg-[#f5f5f2] rounded-[10px] w-full">
                {!!img && (
                    <div className="shrink-0 w-[190px] h-[267px] rounded-[6px] overflow-hidden bg-[#fff] border border-[#E2E4EA]">
                        {/* Using img to avoid Image domain config issues */}
                        <Image src={'https://test11.audiosector.ru/cp' + img} alt={item.photo?.alternativeText || item.title} className="w-full h-full object-contain" width={190} height={267} />
                    </div>
                )}
                <div className="flex-1 flex flex-col gap-[20px]">
                    <div className="text-[24px] text-[#000] ">{item.title}</div>
                    {item.content?.body && (
                        <div>
                           { processContent(item.content.body)}
                        </div>
                    )}
                </div>
            </div>
        </PhotoView>
    );
};

const ClientPage: React.FC<{ initialCategories: FeedbackCategoryGroup[] }> = ({ initialCategories }) => {
    const [openGroups, setOpenGroups] = React.useState<number[]>(() => initialCategories.map(c => c.id));
    const [showServices, setShowServices] = React.useState<boolean>(true);

    const toggleGroup = (id: number) => {
        setOpenGroups(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const { setWrapperRef, setButtonRef } = useButton();

    const [mainOpen, setMainOpen] = React.useState<boolean>(true);



    // Элементы для правой навигации
    const dotNavItems = initialCategories.map(cat => ({
        id: cat.id,
        title: cat.title,
        active: openGroups.includes(cat.id),
        href: '#block-' + cat.id
    }));

    return (
        <PhotoProvider
            maskOpacity={0.4}
            maskClassName="blurred-mask"
            speed={() => 0}
            loop={true}
            maskClosable={false}
        >
            <StandardPageLayout
                title="Благодарственные письма"
                breadcrumbs={[{ id: 2, title: 'Отзывы', full_slug: '/feedback' }]}
                dotNavItems={dotNavItems}
                showButton={true}
            >
                <CollapseSection
                    title={'Партнерство, подтвержденное клиентами'}
                    isOpen={mainOpen}
                    onToggle={() => {
                        setMainOpen(!mainOpen);
                    }}
                >
                    <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                        В современном бизнесе надёжность партнёра играет ключевую роль. Компании выбирают тех, кто способен обеспечить стабильность, качество и точное соблюдение требований.
                    </div>
                    <div className="h-[15px]"></div>
                    <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                        За годы работы Центр Стандартизации зарекомендовал себя как надёжный партнёр в области сертификации и стандартизации. Наши клиенты — промышленные предприятия, производственные компании, торговые организации и государственные структуры — отмечают профессионализм, оперативность и внимательное отношение к задачам.
                    </div>
                </CollapseSection>

                <div ref={setWrapperRef} className="tariff-wrap w-[250px] self-end">
                    <button
                        onClick={() => {
                            if (openGroups.length > 0) {
                                setOpenGroups([]);
                            } else {
                                setOpenGroups(initialCategories.map(c => c.id));
                            }
                        }}
                        ref={setButtonRef}
                        className="btnIconAn tariff bg-[#F5F5F2] h-[50px] rounded-[4px] text-[20px] font-light border border-[#93969d] flex items-center justify-center"
                    >
                        <span className="sendText">
                            {openGroups.length > 0 ? 'Свернуть услуги' : 'Показать услуги'}
                        </span>

                        <span className="sendIconLeft">
                            <svg
                                className={`${openGroups.length > 0 ? 'rotate-180' : ''} transition-all`}
                                width="23"
                                height="24"
                                viewBox="0 0 23 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_6557_2555)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.1049 7.72888L17.1338 7.73442L17.1533 15.6286L17.155 16.6434L17.1567 17.6568L7.23434 17.6339L7.22952 15.6043L13.69 15.621L9.37014 11.3012L10.8018 9.86951L15.1217 14.1894L15.1049 7.72888Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M7.2572 9.1715L8.67142 7.75728L6.5501 5.63596L5.13588 7.05018L7.2572 9.1715Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_6557_2555">
                                        <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                            transform="translate(11.5 0.686523) rotate(45)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </button>
                </div>

                {initialCategories.map(cat => {
                    const isOpen = openGroups.includes(cat.id);
                    return (
                        <div key={cat.id} id={'block-' + cat.id} className="w-full">
                            <CollapseSection title={cat.title} isOpen={isOpen} onToggle={() => toggleGroup(cat.id)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                                    {cat.items.map(item => (
                                        <FeedbackCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </CollapseSection>
                        </div>
                    );
                })}
            </StandardPageLayout>
        </PhotoProvider>
    );
};

export default ClientPage;


