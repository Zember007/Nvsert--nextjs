'use client';
import React, { Suspense, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '@/config/store';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import AppCollapsibleList from '@/components/general/AppCollapsibleList';
import Button from '@/components/ui/Button';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import { useButton } from '@/hook/useButton';


interface ContentBlock {
    id: number;
    heading: string;
    content: string | React.ReactNode;
}

// Component to render individual content blocks as collapsible sections
const ContentBlockRenderer: React.FC<{
    block: ContentBlock;
    isExpanded: boolean;
    onToggle: () => void;
}> = ({ block, isExpanded, onToggle }) => {


    return (
        <div
            id={'block-' + block.id}
            className="w-full">
            <div
                className="flex justify-center group items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer"
                onClick={onToggle}
            >
                <h2 className="text-[24px] group-active:scale-[0.98] transition-all duration-100 font-light !m-0 leading-[18px] tracking-[0] text-[#34446D] flex-1">
                    {block.heading}
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
                    {block.content}
                </div>
            )}
        </div>
    );
}


const ServiceDetailContent = () => {

    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [activeBlockId, setActiveBlockId] = useState<number | null>(null);
    const { openDefaultModal } = useHeaderContext();

    const { setButtonRef, setWrapperRef } = useButton()




    const [sortedContentBlocks, setSortedContentBlocks] = useState<ContentBlock[]>([
        {
            id: 1,
            heading: 'Партнерство, подтвержденное клиентами ',
            content: `
            В современном бизнесе надёжность партнёра играет ключевую роль. Компании выбирают тех, кто способен обеспечить стабильность, качество и точное соблюдение требований.
За годы работы Центр Стандартизации зарекомендовал себя как надёжный партнёр в области сертификации и стандартизации. Наши клиенты — промышленные предприятия, производственные компании, торговые организации и государственные структуры — отмечают профессионализм, оперативность и внимательное отношение к задачам.
            `
        }
    ])




    // Toggle section expansion
    const toggleSection = (blockId: number) => {


        setExpandedSections(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };


    React.useEffect(() => {
        if (sortedContentBlocks.length > 0) {
            setExpandedSections(sortedContentBlocks.map(item => item.id));
        }
    }, [sortedContentBlocks]);



    const navigationItems = useMemo(() => {
        return sortedContentBlocks?.map(item => ({
            id: item.id,
            title: item.heading,
            active: activeBlockId === item.id,
        })) || [];
    }, [sortedContentBlocks, activeBlockId]);




    return (
        <div className="main text-[#000]  select-none mb-[100px]">

            <AppBreadcrumbs root={'/'} breadcrumbs={[{ id: 2, title: 'Отзывы', full_slug: '/feedback' }]} />




            {/* Main Content */}
            <div className="wrapper pt-[50px]">

                <div className="flex gap-[40px]">
                    <div className="flex flex-col gap-[50px] flex-1">
                        <h1 className="text-[48px] leading-[50px] !m-0 font-light tracking-[-0.04em] text-black -translate-x-[4px]">
                            Благодарственные письма
                        </h1>


                        {/* Two Column Layout */}
                        <div className="flex gap-[40px] items-stretch">
                            {/* Left Column */}
                            <div className="w-[250px] relative">
                                <div className=" sticky top-[112px] flex flex-col gap-[10px]">

                                    <div 
                                    ref={setWrapperRef}
                                    className='tariff-wrap'>
                                        <button 
                                        ref={setButtonRef}
                                        className='tariff h-[50px] px-[15px] hover:bg-[#f5f5f2] border group hover:border-[#34446d] border-transparent rounded-[4px] flex items-center justify-between'>
                                            <span className='text-[20px] font-light'>О компании</span>
                                            <svg className='text-[#FFF] group-hover:text-[#34446d]' width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8519 1.21429V7.28572C11.8519 7.56988 11.9689 7.8424 12.1773 8.04333C12.3857 8.24426 12.6683 8.35714 12.963 8.35714H19.2593L11.8519 1.21429Z" fill="#93969D" />
                                                <path d="M9.62963 7.28572V0.5H3.33333C2.44928 0.5 1.60143 0.838647 0.976311 1.44144C0.35119 2.04424 0 2.8618 0 3.71429V22.2857C0 23.1382 0.35119 23.9558 0.976311 24.5586C1.60143 25.1614 2.44928 25.5 3.33333 25.5H16.6667C17.1044 25.5 17.5379 25.4169 17.9423 25.2553C18.3467 25.0938 18.7142 24.857 19.0237 24.5586C19.3332 24.2601 19.5788 23.9057 19.7463 23.5158C19.9138 23.1258 20 22.7078 20 22.2857V10.5H12.963C12.0789 10.5 11.2311 10.1614 10.6059 9.55856C9.98082 8.95576 9.62963 8.1382 9.62963 7.28572Z" fill="#93969D" />
                                                <path d="M11.416 15.3956L8.66795 15.7112L8.56954 16.1291L9.10955 16.2204C9.46236 16.2973 9.53196 16.4139 9.45516 16.7361L8.56954 20.5496C8.33674 21.536 8.69555 22 9.53916 22C10.1932 22 10.9528 21.7229 11.2972 21.3424L11.4028 20.885C11.1628 21.0785 10.8124 21.1555 10.5796 21.1555C10.2496 21.1555 10.1296 20.9433 10.2148 20.5694L11.416 15.3956ZM11.5 13.0996C11.5 13.3913 11.3736 13.671 11.1485 13.8772C10.9235 14.0834 10.6182 14.1993 10.3 14.1993C9.98171 14.1993 9.67648 14.0834 9.45143 13.8772C9.22638 13.671 9.09995 13.3913 9.09995 13.0996C9.09995 12.808 9.22638 12.5283 9.45143 12.3221C9.67648 12.1159 9.98171 12 10.3 12C10.6182 12 10.9235 12.1159 11.1485 12.3221C11.3736 12.5283 11.5 12.808 11.5 13.0996Z" fill="#FFF" />

                                            </svg>
                                        </button>
                                    </div>

                                    <div
                                    ref={setWrapperRef}
                                    className='tariff-wrap'>
                                        <button 
                                        ref={setButtonRef}
                                        className='tariff h-[50px] px-[15px]  bg-[#34446d] border group hover:border-[#34446d] border-transparent rounded-[4px] flex items-center justify-between'>
                                            <span className='text-[20px] text-[#FFF] font-light'>Отзывы</span>
                                            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.5V8.625C10 9.12228 10.1975 9.59919 10.5492 9.95083C10.9008 10.3025 11.3777 10.5 11.875 10.5H20V23C20 23.663 19.7366 24.2989 19.2678 24.7678C18.7989 25.2366 18.163 25.5 17.5 25.5H2.5C1.83696 25.5 1.20107 25.2366 0.732233 24.7678C0.263392 24.2989 0 23.663 0 23V3C0 2.33696 0.263392 1.70107 0.732233 1.23223C1.20107 0.763392 1.83696 0.5 2.5 0.5H10ZM9.5675 12.6238L8.45 14.5425L6.27875 15.0125C6.19322 15.031 6.11406 15.0717 6.04918 15.1304C5.9843 15.1892 5.93596 15.2639 5.90901 15.3472C5.88206 15.4304 5.87743 15.5193 5.89559 15.6049C5.91375 15.6905 5.95407 15.7699 6.0125 15.835L7.4925 17.4913L7.2675 19.7013C7.25868 19.7883 7.27288 19.8762 7.30868 19.9561C7.34447 20.036 7.40061 20.105 7.47147 20.1564C7.54234 20.2078 7.62545 20.2397 7.7125 20.2488C7.79954 20.258 7.88747 20.2442 7.9675 20.2087L10 19.3138L12.0325 20.2087C12.1125 20.2442 12.2005 20.258 12.2875 20.2488C12.3746 20.2397 12.4577 20.2078 12.5285 20.1564C12.5994 20.105 12.6555 20.036 12.6913 19.9561C12.7271 19.8762 12.7413 19.7883 12.7325 19.7013L12.5075 17.4913L13.9888 15.835C14.0472 15.7698 14.0875 15.6903 14.1056 15.6046C14.1236 15.519 14.1189 15.43 14.0918 15.3467C14.0647 15.2634 14.0162 15.1887 13.9512 15.1301C13.8862 15.0714 13.8069 15.0309 13.7213 15.0125L11.55 14.5425L10.4325 12.6238C10.3885 12.548 10.3255 12.4851 10.2496 12.4414C10.1737 12.3976 10.0876 12.3746 10 12.3746C9.91241 12.3746 9.82635 12.3976 9.75044 12.4414C9.67454 12.4851 9.61145 12.548 9.5675 12.6238ZM12.5 0.55375C12.9736 0.654194 13.4078 0.889989 13.75 1.2325L19.2675 6.75C19.61 7.09216 19.8458 7.5264 19.9463 8H12.5V0.55375Z" fill="white" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div 
                                    ref={setWrapperRef}
                                    className='tariff-wrap'>
                                        <button 
                                        ref={setButtonRef}
                                        className='tariff h-[50px] px-[15px] hover:bg-[#f5f5f2] border group hover:border-[#34446d] border-transparent rounded-[4px] flex items-center justify-between'>
                                            <span className='text-[20px] font-light'>СОУТ</span>
                                            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.25 6.43631V0.5H5.9375C5.19158 0.5 4.47621 0.796257 3.94876 1.3236C3.42132 1.85094 3.125 2.56617 3.125 3.31194V19.5587C3.125 20.3045 3.42132 21.0197 3.94876 21.547C4.47621 22.0744 5.19158 22.3706 5.9375 22.3706H17.1875C17.5568 22.3706 17.9226 22.2979 18.2638 22.1566C18.605 22.0153 18.9151 21.8081 19.1762 21.547C19.4374 21.2859 19.6446 20.9759 19.7859 20.6348C19.9273 20.2936 20 19.928 20 19.5587V9.24825H14.0625C13.3166 9.24825 12.6012 8.95199 12.0738 8.42465C11.5463 7.89731 11.25 7.18208 11.25 6.43631ZM13.125 6.43631V1.12488L19.375 7.37363H14.0625C13.8139 7.37363 13.5754 7.27487 13.3996 7.09909C13.2238 6.92331 13.125 6.6849 13.125 6.43631ZM1.87875 3.78309C1.32936 3.97642 0.853559 4.3355 0.517027 4.81076C0.180496 5.28602 -0.000160732 5.85401 1.07303e-07 6.43631V19.5637C1.07303e-07 21.1381 0.625557 22.648 1.73905 23.7613C2.85255 24.8746 4.36278 25.5 5.9375 25.5H14.055C14.6368 25.5002 15.2042 25.32 15.6793 24.9842C16.1544 24.6485 16.5136 24.1737 16.7075 23.6254H5.9375C4.86006 23.6254 3.82675 23.1974 3.06488 22.4357C2.30301 21.674 1.875 20.6409 1.875 19.5637L1.87875 3.78309Z" fill="#93969D" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div
                                    ref={setWrapperRef}
                                    className='tariff-wrap'>
                                        <button 
                                        ref={setButtonRef}
                                        className='tariff h-[50px] px-[15px] hover:bg-[#f5f5f2] border group hover:border-[#34446d] border-transparent rounded-[4px] flex items-center justify-between'>
                                            <span className='text-[20px] font-light'>ТН ВЭД</span>
                                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_7117_6709"  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="22">
                                                    <path d="M14 1.48047H9V20.5189H14V1.48047ZM19 1.48047H14V20.5189H19V1.48047ZM3 1.48047L7 2.00931L5.25 20.5189L1 19.9901L3 1.48047Z" fill="#555555" />
                                                    <path d="M14 1.48047H9V20.5189H14M14 1.48047V20.5189M14 1.48047H19V20.5189H14M3 1.48047L7 2.00931L5.25 20.5189L1 19.9901L3 1.48047Z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                                                    <path d="M16.5 7.82677V6.24023M11.5 7.82677V6.24023" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </mask>
                                                <g mask="url(#mask0_7117_6709)">
                                                    <path d="M-2 -1.69336H22V23.6913H-2V-1.69336Z" fill="#93969D" />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>

                            {/* Right Column */}
                            <div className="flex-1 flex flex-col items-center gap-[50px]">
                                {/* Dynamic Content Blocks */}
                                <div className="w-full flex flex-col items-center">


                                    <ContentBlockRenderer
                                        block={sortedContentBlocks[0]}
                                        isExpanded={expandedSections.includes(sortedContentBlocks[0].id)}
                                        onToggle={() => toggleSection(sortedContentBlocks[0].id)}
                                    />





                                </div>

                            </div>



                        </div>
                    </div>



                    <div className="w-[250px] relative">

                        <div className=" sticky top-[112px] flex flex-col gap-[50px]">

                            <Button
                                onClick={() => { openDefaultModal('orderForm') }}
                                label='Оформить заявку'
                            />

                            <AppCollapsibleList
                                position='right'
                                title={'Навигация по услуге'}
                                items={[]}
                                defaultOpen={true}
                                listClassName='flex flex-col gap-[20px]'
                                renderItem={(item, index) => (
                                    <></>
                                )}
                            />

                        </div>

                    </div>
                </div>

            </div>
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


