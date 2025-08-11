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

const Page = () => {
    const [expandedServices, setExpandedServices] = useState<number[]>([0]); // Первый спойлер открыт по умолчанию

    const toggleService = (index: number) => {
        setExpandedServices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const services = [
        {
            title: "Сертификация ГОСТ Р",
            description: "Система ГОСТ Р — это национальная система сертификации продукции в России. Документы, оформленные в рамках данной системы, необходимы для легальной продажи продукции, участия в тендерах, госзакупках и работы с крупными клиентами.",
            certificates: [
                {
                    title: "Сертификат соответствия ГОСТ Р",
                    image: image1,
                    processingTime: "от 2-х дней",

                    cost: "от 8 700 Р"
                },
                {
                    title: "Декларация соответствия ГОСТ Р",
                    image: image2,
                    processingTime: "от 2-х дней",


                    cost: "от 8 700 Р"
                },
                {
                    title: "Сертификат соответствия ГОСТ Р",
                    image: image3,
                    processingTime: "от 4-х недель",
                    cost: "от 38 000 Р"
                }
            ]
        },
        {
            title: "Таможенный союз",
            description: "Сертификация в рамках Таможенного союза (ЕАЭС) подтверждает соответствие продукции требованиям технических регламентов, обязательных для применения на территории стран-участниц ЕАЭС.",
            certificates: [
                {
                    title: "Сертификат соответствия ТС",
                    image: image4,
                    processingTime: "от 3-х дней",

                    cost: "от 12 000 Р"
                },
                {
                    title: "Декларация соответствия ТС",
                    image: image5,
                    processingTime: "от 2-х дней",
                    cost: "от 9 500 Р"
                }
            ]
        },
        {
            title: "Сертификация ISO",
            description: "Международные стандарты ISO помогают организациям повысить эффективность, качество продукции и услуг, а также соответствовать международным требованиям.",
            certificates: [
                {
                    title: "ISO 9001 - Система менеджмента качества",
                    image: image6,
                    processingTime: "от 6-ти недель",

                    cost: "от 45 000 Р"
                },
                {
                    title: "ISO 14001 - Система экологического менеджмента",
                    image: image7,
                    processingTime: "от 8-ми недель",
                    cost: "от 52 000 Р"
                }
            ]
        }
    ];


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
                    {services.map((service, index) => (
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

                                <h2 className="text-[24px] font-light">{service.title}</h2>

                            </button>

                            {/* Содержимое спойлера */}
                            {expandedServices.includes(index) && (
                                <div className=" wrapper">
                                    {/* Описание услуги */}
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Сертификаты */}
                                    <div className="flex gap-[110px] flex-wrap py-[20px]">
                                        {service.certificates.map((certificate, certIndex) => (
                                            <button
                                           
                                                key={certIndex}
                                                className={`p-[20px] flex flex-col gap-[20px] text-left w-[310px] hover:bg-[#F5F5F5] rounded-[8px] border border-[transparent] hover:border-[#34446d] ${selectedCertificate === certIndex ? 'bg-[#F5F5F5] !border-[#34446d]' : ''}`}
                                            >
                                                <span className='text-[18px]'>{certificate.title}</span>
                                                <div className="relative w-full">
                                                    <Image src={certificate.image} alt={certificate.title} className='w-full h-full object-cover border border-[#93969d] rounded-[4px]' />
                                                    <div className='absolute bottom-[-10px]  right-[-10px] flex gap-[15px] p-[10px] bg-[#F5F5F5] rounded-[4px] border border-[#000]'>
                                                        <div className="flex flex-col gap-[6px]">
                                                            <span className='text-[#00000080] text-[12px] font-light'>Срок оформления</span>
                                                            <span className='text-[16px] font-light'>{certificate.processingTime}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-[6px]">
                                                            <span className='text-[#00000080] text-[12px] font-light'>Стоимость</span>
                                                            <span className='text-[16px] font-light'>{certificate.cost}</span>
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