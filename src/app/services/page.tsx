'use client';
import Image from 'next/image';
import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { RootState } from '@/config/store';
import { NavigationItem } from '@/store/navigation';
import Link from 'next/link';

const ServicesContent = () => {
    const [expandedServices, setExpandedServices] = useState<number[]>([]);

    const toggleService = (index: number) => {
        setExpandedServices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };
    const searchParams = useSearchParams();

    const { services } = useSelector((state: RootState) => state.navigation);



    // Get the type query parameter and auto-expand matching category
    useEffect(() => {

        const typeParam = searchParams.get('type');
        if (typeParam) {
            const matchingIndex = services.findIndex((service) =>
                service.name === typeParam
            );

            if (matchingIndex !== -1) {
                setExpandedServices([matchingIndex]);
                const element = document.getElementById(`service-${matchingIndex}`);
                window.scrollTo({ top: (element?.offsetTop || 100) - 100, behavior: 'smooth' });
            }
        }
    }, [services, searchParams]);


    return (
        <div className="main text-[#000] overflow-hidden select-none relative ">
            {/* Хлебные крошки */}

            <nav className="text-[14px] text-[#A4A4A4] px-[42px] flex items-center mt-[10px]">
                <Link
                    className='hover:text-[#34446D] hover:underline transition-transform duration-100 hover:scale-95'
                    href={'/'}
                >Главная</Link>
                <span className="mx-[9px]">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 0.917969L5.33333 5.0013L1.25 9.08464" stroke="#A4A4A4" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </span>
                <span className='text-[#34446D]'>Все услуги</span>
            </nav>

            <h1 className="xl:text-[48px] m:text-[40px] text-[24px] font-light text-center pt-[40px] pb-[50px]">
                Полный список услуг
            </h1>

            {/* Список услуг */}
            <div className="space-y-[20px]">
                {services.map((service, index) => (
                    <div id={`service-${index}`} key={index} className="overflow-hidden">
                        {/* Заголовок спойлера */}
                        <button
                            onClick={() => toggleService(index)}
                            className="w-full border-t border-b border-[93969D] "
                        >
                            <div className="wrapper !flex-row flex items-center gap-[10px] py-[21px]">
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5667_4071)">
                                        <path d="M4.404 3.30273L7.835 6.62973C8.055 6.84273 8.055 7.15673 7.835 7.36973L1.205 13.7997C0.79 14.2007 0 13.9577 0 13.4297V7.70673L4.404 3.30273Z" fill="black" />
                                        <path opacity="0.5" d="M0 6.29282V0.569821C0 0.0418214 0.79 -0.201179 1.205 0.199821L3.686 2.60582L0 6.29282Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5667_4071">
                                            <rect width="8" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <h2 className="xl:text-[24px] xxs:text-[20px] text-[18px] font-light">{service.title}</h2>
                            </div>

                        </button>

                        {/* Содержимое спойлера */}
                        {expandedServices.includes(index) && (
                            <div className=" wrapper pt-[20px] m:pb-[80px] pb-[60px]">
                                {/* Описание услуги */}
                                <p className="text-[#000000] mb-[10px] leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Сертификаты */}
                                <div className="flex l:gap-[110px] gap-[30px] flex-wrap py-[20px] m:justify-start  justify-center">
                                    {service.items.map((certificate: NavigationItem, certIndex: number) => (
                                        <Link
                                            href={`/services?type=${service.name}`}
                                            key={certIndex}
                                            className={`p-[20px] flex flex-col gap-[20px] text-left w-[310px] hover:bg-[#F5F5F5] rounded-[8px] border border-[transparent] hover:border-[#34446d]`}
                                        >
                                            <span className='text-[18px] h-[45px] flex items-center'>{certificate.title}</span>
                                            <div className="relative w-full">
                                                <Image src={'https://test11.audiosector.ru/cp' + certificate.img?.url} alt={certificate.title}
                                                    width={380}
                                                    height={270}
                                                    className='w-full h-full object-cover border border-[#93969d] rounded-[4px]' />
                                                <div className='absolute bottom-[-10px]  right-[-10px] flex gap-[15px] p-[10px] bg-[#F5F5F5] rounded-[4px] border border-[#000]'>
                                                    <div className="flex flex-col gap-[6px]">
                                                        <span className='text-[#00000080] text-[12px] font-light'>Срок оформления</span>
                                                        <span className='text-[16px] font-light'>{certificate.duration}</span>
                                                    </div>
                                                    <div className="flex flex-col gap-[6px]">
                                                        <span className='text-[#00000080] text-[12px] font-light'>Стоимость</span>
                                                        <span className='text-[16px] font-light'>{certificate.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServicesContent />
        </Suspense>
    );
};

export default Page;