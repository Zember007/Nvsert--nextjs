'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import image1 from '@/assets/images/main-gallery/01.webp';
import image2 from '@/assets/images/main-gallery/02.webp';
import image3 from '@/assets/images/main-gallery/03.webp';
import image4 from '@/assets/images/main-gallery/04.webp';
import image5 from '@/assets/images/main-gallery/05.webp';
import image6 from '@/assets/images/main-gallery/06.webp';
import image7 from '@/assets/images/main-gallery/07.webp';
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store';
import { NavigationItem } from '@/store/navigation';

const Page = () => {
    const [expandedServices, setExpandedServices] = useState<number[]>([0]); // Первый спойлер открыт по умолчанию

    const toggleService = (index: number) => {
        setExpandedServices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const { navigation } = useSelector((state: RootState) => state.navigation);



    const services = navigation.reduce((acc:any, item:NavigationItem) => {
        const catId:number = item.category.id;
        if (!acc[catId]) {
          acc[catId] = {
            category: item.category,
            items: []
          };
        }
        acc[catId].items.push(item);
        return acc;
      }, {});

    return (
        <div className="main text-[#000] overflow-hidden select-none relative ">
            {/* Хлебные крошки */}

            <nav className="text-[14px] text-[#A4A4A4]  wrapper !flex-row items-center mt-[10px]">
                <span>Главная</span>
                <span className="mx-2">›</span>
                <span className='text-[#34446D]'>Все услуги</span>
            </nav>
            <h1 className="font-light text-center mt-[40px] mb-[50px]">
                Полный список услуг
            </h1>

            {/* Основной контент */}
            <div className="">
                {/* Заголовок */}


                {/* Список услуг */}
                <div className="space-y-8">
                    {Object.keys(services).map((service, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Заголовок спойлера */}
                            <button
                                onClick={() => toggleService(index)}
                                className="w-full  py-[21px] wrapper !flex-row items-center gap-[10px]"
                            >
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

                                <h2 className="text-[24px] font-light">{services[service].category.title}</h2>

                            </button>

                            {/* Содержимое спойлера */}
                            {expandedServices.includes(index) && (
                                <div className=" wrapper">
                                    {/* Описание услуги */}
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {services[service].category.description}
                                    </p>

                                    {/* Сертификаты */}
                                    <div className="flex gap-[110px] flex-wrap py-[20px]">
                                        {services[service].items.map((certificate:NavigationItem, certIndex:number) => (
                                            <button
                                           
                                                key={certIndex}
                                                className={`p-[20px] flex flex-col gap-[20px] text-left w-[310px] hover:bg-[#F5F5F5] rounded-[8px] border border-[transparent] hover:border-[#34446d]`}
                                            >
                                                <span className='text-[18px]'>{certificate.title}</span>
                                                <div className="relative w-full">
                                                    <Image src={certificate.img?.url} alt={certificate.title} className='w-full h-full object-cover border border-[#93969d] rounded-[4px]' />
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
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;