'use client';
import React, { Suspense, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '@/config/store';
import ServiceCard from '@/components/services/ServiceCard';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { AppNavigationItem } from '@/components/general/AppNavigation';

const ServiceDetailContent = () => {
    const params = useParams<{ slug: string }>();
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
    const { services } = useSelector((state: RootState) => state.navigation);
    const [expandedSections, setExpandedSections] = useState<string[]>(['what-is']);

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

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const navigationItems = [
        { title: 'Что такое сертификат соответствия ГОСТ Р', active: true, id: 'what-is' },
        { title: 'Виды сертификатов: обязательный и добровольный', active: false, id: 'types' },
        { title: 'Где и когда требуется сертификат ГОСТ Р', active: false, id: 'when-needed' },
        { title: 'Зачем оформлять сертификат соответствия ГОСТ Р', active: false, id: 'why' },
        { title: 'Почему выбирают NVSERT', active: false, id: 'why-us' }
    ];

    if (!slug || !match) return (
        <div className="main"></div>
    );

    return (
        <div className="main text-[#000] overflow-hidden select-none relative mb-[100px]">
            


            {/* Main Content */}
            <div className="wrapper pt-[58px]">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-[50px]">
                    <h1 className="text-[48px] font-light tracking-[-0.04em] text-black">
                        {match?.item.title || 'Сертификат соответствия ГОСТ Р'}
                    </h1>
                    <button className="bg-[#34446D] border border-[#34446D] text-white px-[15px] py-[13px] rounded text-[20px] font-light  h-[50px] backdrop-blur-sm">
                        Оформить заявку
                    </button>
                </div>

                {/* Two Column Layout */}
                <div className="flex gap-[30px]">
                    {/* Left Column */}
                    <div className=" flex flex-col gap-[37px]  w-[250px]">

                        <ServiceCard serviceName={match.serviceName} certificate={match.item} title={false} padding={false} />

                        {recommendedServices && (
                            <div className="flex flex-col gap-[20px]">
                                <div className="flex items-center justify-end gap-[10px] pb-[12px] border-b border-[#93969D]">
                                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_7117_3111)">
                                            <path d="M4.95426 3.77441L8.81413 7.5767C9.06163 7.82013 9.06163 8.17899 8.81413 8.42241L1.35538 15.771C0.888506 16.2293 -0.000244141 15.9516 -0.000244141 15.3481V8.80756L4.95426 3.77441Z" fill="black" />
                                            <path opacity="0.5" d="M0 7.1918V0.651224C0 0.0477958 0.88875 -0.229919 1.35562 0.228367L4.14675 2.97808L0 7.1918Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_7117_3111">
                                                <rect width="9" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="text-[16px] text-[#161616]">Рекомендуем к оформлению</span>
                                </div>

                                {recommendedServices.map((children) => (
                                    <AppNavigationItem dark={true} link={children.slug} key={children.id} title={children.title} img={'https://test11.audiosector.ru/cp' + children.img?.url} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col items-center gap-[50px]">
                        {/* Expandable Sections */}
                        <div className="w-full flex flex-col gap-[30px] items-center">
                            {/* What is section */}
                            <div className="w-full">
                                <div
                                    className="flex justify-center items-center gap-[10px] pb-[13px] border-b border-[#93969D] cursor-pointer"
                                    onClick={() => toggleSection('what-is')}
                                >
                                    <h2 className="text-[24px] font-light text-[#34446D] flex-1">
                                        Что такое сертификат соответствия ГОСТ Р
                                    </h2>
                                    <div className="w-[16px] h-[16px] relative">
                                        <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#93969D]">
                                            <path d="M1 1L15 15" stroke="currentColor" strokeWidth="2" />
                                            <path d="M1 1L9 9" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>

                                {expandedSections.includes('what-is') && (
                                    <div className="pt-[20px]">
                                        <div className="text-[16px] font-light leading-[1.5] text-black mb-[20px]">
                                            Сертификат соответствия ГОСТ Р — это официальный документ, подтверждающий, что продукция соответствует установленным в России требованиям безопасности, качества и техническим стандартам. Он выдаётся в рамках системы технического регулирования и может основываться на национальных ГОСТах, технических регламентах Таможенного союза (ТР ТС), регламентах Евразийского экономического союза (ТР ЕАЭС) или других нормативных актах.
                                        </div>

                                        <div className="mb-[20px]">
                                            <h3 className="text-[18px] font-normal tracking-[-0.01em] text-black mb-[10px]">Кто может выдавать сертификат?</h3>
                                            <div className="text-[16px] font-light leading-[1.5] text-black">
                                                Выдачей сертификатов ГОСТ Р занимаются только аккредитованные органы сертификации. Они включены в реестр Федеральной службы по аккредитации (Росаккредитация). Проверить легальность можно в открытом реестре на сайте fsa.gov.ru — по номеру сертификата или названию организации.
                                            </div>
                                        </div>

                                        <div className="mb-[20px]">
                                            <h3 className="text-[18px] font-normal tracking-[-0.01em] text-black mb-[10px]">Роль аккредитованных лабораторий</h3>
                                            <div className="text-[16px] font-light leading-[1.5] text-black">
                                                Лаборатория, проводящая испытания, должна иметь аккредитацию на соответствующий перечень методик. Без этого результаты будут признаны недействительными. Протоколы испытаний составляют юридическую основу для выдачи сертификата и могут быть использованы при судебных разбирательствах, проверках и международных поставках.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Banner 1 */}
                            <div className="w-[700px] h-[300px] bg-gray-400 rounded-[8px]"></div>

                            {/* Types section */}
                            <div className="w-full">
                                <div
                                    className="flex justify-center items-center gap-[10px] pb-[13px] border-b border-[#CCCCCC] cursor-pointer"
                                    onClick={() => toggleSection('types')}
                                >
                                    <h2 className="text-[24px] font-light text-black  flex-1">
                                        Виды сертификатов: обязательный и добровольный
                                    </h2>
                                    <div className="w-[16px] h-[16px] relative">
                                        <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#93969D]">
                                            <path d="M1 1L15 15" stroke="currentColor" strokeWidth="2" />
                                            <path d="M1 1L9 9" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>

                                {expandedSections.includes('types') && (
                                    <div className="pt-[20px] space-y-[20px]">
                                        <div>
                                            <h3 className="text-[18px] font-normal tracking-[-0.01em] text-black mb-[10px]">Обязательный сертификат соответствия</h3>
                                            <div className="text-[16px] font-light leading-[1.5] text-black">
                                                Обязательная сертификация требуется для продукции, включённой в утверждённый правительством перечень товаров, подлежащих обязательной оценке соответствия.
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] font-normal tracking-[-0.01em] text-black mb-[10px]">Добровольный сертификат соответствия</h3>
                                            <div className="text-[16px] font-light leading-[1.5] text-black">
                                                Этот документ оформляется по инициативе производителя или поставщика — в тех случаях, когда продукция не подлежит обязательной сертификации.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA Banner */}
                            <div className="w-[700px] h-[300px] bg-[rgba(52,68,109,0.2)] rounded-[8px] flex flex-col justify-center items-center gap-[16px] p-[40px] backdrop-blur-sm">
                                <h3 className="text-[24px] font-light tracking-[-0.04em]  text-black w-[492px]">
                                    Подходит ли ваша продукция под обязательную сертификацию?
                                </h3>
                                <p className="text-[16px] font-light tracking-[-0.01em]  text-[rgba(0,0,0,0.6)] w-[378px] leading-[1.4]">
                                    Наши специалисты проведут бесплатную предварительную проверку и дадут чёткий ответ.
                                </p>
                                <button className="bg-[#34446D] text-white px-[15px] py-[13px] rounded w-[280px] h-[50px] text-[20px] font-light backdrop-blur-sm">
                                    Узнать у специалиста
                                </button>
                            </div>

                            {/* More banners */}
                            <div className="w-[700px] h-[300px] bg-gray-400 rounded-[8px]"></div>
                            <div className="w-[700px] h-[300px] bg-gray-400 rounded-[8px]"></div>
                        </div>
                    </div>

                    {/* Navigation Sidebar */}
                   {/*  <div className="w-[250px]">
                        <div className="mb-[20px]">
                            <div className="flex items-center gap-[10px] pb-[12px] border-b border-[#93969D] w-[393px]">
                                <div className="w-[9px] h-[16px] relative">
                                    <svg width="9" height="16" viewBox="0 0 9 16" className="text-black">
                                        <path d="M0 3.77L9 12.22" fill="currentColor" />
                                        <path d="M0 0L4.15 7.19" fill="currentColor" opacity="0.5" />
                                    </svg>
                                </div>
                                <span className="text-[16px] font-normal text-[#161616]">Навигация по услуге</span>
                            </div>
                        </div>

                        <div className="space-y-[3px]">
                            {navigationItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-[24px] p-[0px] cursor-pointer ${item.active ? '' : 'pl-[15px]'}`}
                                    onClick={() => toggleSection(item.id)}
                                >
                                    <div className="flex items-center justify-center w-[16px] h-[16px]">
                                        {item.active ? (
                                            <>
                                                <div className="w-[16px] h-[16px] border border-[#34446D] rounded-full relative">
                                                    <div className="w-[8px] h-[8px] bg-[#34446D] rounded-full absolute top-[4px] left-[4px]"></div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-[8px] h-[8px] bg-[#93969D] border border-[#93969D] rounded-full"></div>
                                        )}
                                    </div>
                                    <span className={`text-[16px] font-light ${item.active ? 'text-[#34446D]' : 'text-black'}`}>
                                        {item.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div> */}
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


