'use client';
import React from 'react';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import Button from '@/components/ui/Button';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import CollapseSection from '@/components/general/CollapseSection';
import SidebarNavButtons from '@/components/general/SidebarNavButtons';
import DotNavList from '@/components/general/DotNavList';
import Image from 'next/image';
import { useButton } from '@/hook/useButton';
import { PhotoProvider, PhotoSlider, PhotoView } from '@/assets/lib/react-photo-view';

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
    const img = item.photo?.formats?.thumbnail?.url || item.photo?.url || '';
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
                <div className="flex-1 flex flex-col gap-[8px]">
                    <div className="text-[24px] text-[#000] ">{item.title}</div>
                    {item.content?.body && (
                        <div className="text-[14px] tracking-[-0.01em] text-[#000] font-light leading-[1.5]">{item.content.body}</div>
                    )}
                </div>
            </div>
        </PhotoView>
    );
};

const ClientPage: React.FC<{ initialCategories: FeedbackCategoryGroup[] }> = ({ initialCategories }) => {
    const { openDefaultModal } = useHeaderContext();
    const [openGroups, setOpenGroups] = React.useState<number[]>(() => initialCategories.map(c => c.id));
    const [showServices, setShowServices] = React.useState<boolean>(true);

    const toggleGroup = (id: number) => {
        setOpenGroups(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const { setWrapperRef, setButtonRef } = useButton();

    const [mainOpen, setMainOpen] = React.useState<boolean>(true);



    return (
        <PhotoProvider
            maskOpacity={0.4} maskClassName="blurred-mask"
            speed={() => 0}
            loop={true}
            maskClosable={false}
        >
            <div className="main text-[#000]   mb-[100px]">
                <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Отзывы', full_slug: '/feedback' }]} />
                <div className="wrapper pt-[50px]">
                    <div className="flex gap-[40px]">
                        <div className="flex flex-col gap-[50px] flex-1">
                            <h1 className="text-[48px] leading-[50px] !m-0 font-light tracking-[-0.04em] text-black -translate-x-[4px]">Благодарственные письма</h1>

                            <div className="flex gap-[40px] items-stretch">
                                {/* Left sidebar */}
                                <div className="w-[250px] relative">
                                    <div className="sticky top-[112px] flex flex-col gap-[10px]">
                                        <SidebarNavButtons
                                            items={[
                                                {
                                                    id: 'about',
                                                    label: 'О компании',
                                                    active: !showServices,
                                                    onClick: () => setShowServices(false),
                                                    icon: (
                                                        <svg className='text-[#93969D]' width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.8519 1.21429V7.28572C11.8519 7.56988 11.9689 7.8424 12.1773 8.04333C12.3857 8.24426 12.6683 8.35714 12.963 8.35714H19.2593L11.8519 1.21429Z" fill="#93969D" />
                                                            <path d="M9.62963 7.28572V0.5H3.33333C2.44928 0.5 1.60143 0.838647 0.976311 1.44144C0.35119 2.04424 0 2.8618 0 3.71429V22.2857C0 23.1382 0.35119 23.9558 0.976311 24.5586C1.60143 25.1614 2.44928 25.5 3.33333 25.5H16.6667C17.1044 25.5 17.5379 25.4169 17.9423 25.2553C18.3467 25.0938 18.7142 24.857 19.0237 24.5586C19.3332 24.2601 19.5788 23.9057 19.7463 23.5158C19.9138 23.1258 20 22.7078 20 22.2857V10.5H12.963C12.0789 10.5 11.2311 10.1614 10.6059 9.55856C9.98082 8.95576 9.62963 8.1382 9.62963 7.28572Z" fill="#93969D" />
                                                            <path d="M11.416 15.3956L8.66795 15.7112L8.56954 16.1291L9.10955 16.2204C9.46236 16.2973 9.53196 16.4139 9.45516 16.7361L8.56954 20.5496C8.33674 21.536 8.69555 22 9.53916 22C10.1932 22 10.9528 21.7229 11.2972 21.3424L11.4028 20.885C11.1628 21.0785 10.8124 21.1555 10.5796 21.1555C10.2496 21.1555 10.1296 20.9433 10.2148 20.5694L11.416 15.3956ZM11.5 13.0996C11.5 13.3913 11.3736 13.671 11.1485 13.8772C10.9235 14.0834 10.6182 14.1993 10.3 14.1993C9.98171 14.1993 9.67648 14.0834 9.45143 13.8772C9.22638 13.671 9.09995 13.3913 9.09995 13.0996C9.09995 12.808 9.22638 12.5283 9.45143 12.3221C9.67648 12.1159 9.98171 12 10.3 12C10.6182 12 10.9235 12.1159 11.1485 12.3221C11.3736 12.5283 11.5 12.808 11.5 13.0996Z" fill="#FFF" />
                                                        </svg>
                                                    )
                                                },
                                                {
                                                    id: 'feedback',
                                                    label: 'Отзывы',
                                                    active: showServices,
                                                    onClick: () => setShowServices(true),
                                                    icon: (
                                                        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10 0.5V8.625C10 9.12228 10.1975 9.59919 10.5492 9.95083C10.9008 10.3025 11.3777 10.5 11.875 10.5H20V23C20 23.663 19.7366 24.2989 19.2678 24.7678C18.7989 25.2366 18.163 25.5 17.5 25.5H2.5C1.83696 25.5 1.20107 25.2366 0.732233 24.7678C0.263392 24.2989 0 23.663 0 23V3C0 2.33696 0.263392 1.70107 0.732233 1.23223C1.20107 0.763392 1.83696 0.5 2.5 0.5H10ZM9.5675 12.6238L8.45 14.5425L6.27875 15.0125C6.19322 15.031 6.11406 15.0717 6.04918 15.1304C5.9843 15.1892 5.93596 15.2639 5.90901 15.3472C5.88206 15.4304 5.87743 15.5193 5.89559 15.6049C5.91375 15.6905 5.95407 15.7699 6.0125 15.835L7.4925 17.4913L7.2675 19.7013C7.25868 19.7883 7.27288 19.8762 7.30868 19.9561C7.34447 20.036 7.40061 20.105 7.47147 20.1564C7.54234 20.2078 7.62545 20.2397 7.7125 20.2488C7.79954 20.258 7.88747 20.2442 7.9675 20.2087L10 19.3138L12.0325 20.2087C12.1125 20.2442 12.2005 20.258 12.2875 20.2488C12.3746 20.2397 12.4577 20.2078 12.5285 20.1564C12.5994 20.105 12.6555 20.036 12.6913 19.9561C12.7271 19.8762 12.7413 19.7883 12.7325 19.7013L12.5075 17.4913L13.9888 15.835C14.0472 15.7698 14.0875 15.6903 14.1056 15.6046C14.1236 15.519 14.1189 15.43 14.0918 15.3467C14.0647 15.2634 14.0162 15.1887 13.9512 15.1301C13.8862 15.0714 13.8069 15.0309 13.7213 15.0125L11.55 14.5425L10.4325 12.6238C10.3885 12.548 10.3255 12.4851 10.2496 12.4414C10.1737 12.3976 10.0876 12.3746 10 12.3746C9.91241 12.3746 9.82635 12.3976 9.75044 12.4414C9.67454 12.4851 9.61145 12.548 9.5675 12.6238ZM12.5 0.55375C12.9736 0.654194 13.4078 0.889989 13.75 1.2325L19.2675 6.75C19.61 7.09216 19.8458 7.5264 19.9463 8H12.5V0.55375Z" fill="white" />
                                                        </svg>
                                                    )
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>

                                {/* Center content */}
                                <div className="flex-1 flex flex-col gap-[24px]">
                                    <CollapseSection title={'Партнерство, подтвержденное клиентами'} isOpen={mainOpen} onToggle={() => { setMainOpen(!mainOpen) }}>
                                        <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                                            В современном бизнесе надёжность партнёра играет ключевую роль. Компании выбирают тех, кто способен обеспечить стабильность, качество и точное соблюдение требований.
                                        </div>
                                        <div className="h-[15px]"></div>
                                        <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">За годы работы Центр Стандартизации зарекомендовал себя как надёжный партнёр в области сертификации и стандартизации. Наши клиенты — промышленные предприятия, производственные компании, торговые организации и государственные структуры — отмечают профессионализм, оперативность и внимательное отношение к задачам.</div>
                                    </CollapseSection>

                                    <div ref={setWrapperRef} className="tariff-wrap w-[250px] self-end">
                                        <button

                                            onClick={() => {
                                                if (openGroups.length > 0) {
                                                    setOpenGroups([])
                                                } else {
                                                    setOpenGroups(initialCategories.map(c => c.id));
                                                }


                                            }}
                                            ref={setButtonRef}
                                            className="btnIconAn tariff bg-[#F5F5F2]   h-[50px] rounded-[4px] text-[20px] font-light border border-[#93969d] flex items-center justify-center"
                                        >
                                            <span className='sendText'>
                                                {openGroups.length > 0 ? 'Свернуть услуги' : 'Показать услуги'}
                                            </span>

                                            <span className='sendIconLeft'>

                                                <svg
                                                    className={`${openGroups.length > 0 ? 'rotate-180' : ''} transition-all`}
                                                    width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_6557_2555)">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1049 7.72888L17.1338 7.73442L17.1533 15.6286L17.155 16.6434L17.1567 17.6568L7.23434 17.6339L7.22952 15.6043L13.69 15.621L9.37014 11.3012L10.8018 9.86951L15.1217 14.1894L15.1049 7.72888Z" fill="black" />
                                                        <path d="M7.2572 9.1715L8.67142 7.75728L6.5501 5.63596L5.13588 7.05018L7.2572 9.1715Z" fill="black" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_6557_2555">
                                                            <rect width="16" height="16" fill="white" transform="translate(11.5 0.686523) rotate(45)" />
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
                                </div>

                                {/* Right column */}
                                <div className="w-[250px] relative">
                                    <div className=" sticky top-[112px] flex flex-col gap-[24px]">
                                        <Button onClick={() => { openDefaultModal('orderForm'); }} label='Оформить заявку' />
                                        <DotNavList
                                            items={initialCategories.map(cat => ({ id: cat.id, title: cat.title, active: openGroups.includes(cat.id), href: '#block-' + cat.id }))}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default ClientPage;


