'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { NavigationItem } from '@/store/navigation';
import Link from 'next/link';
import { AppNavigationItem } from '@/components/general/AppNavigation';
import { motion, useAnimation } from "framer-motion";

interface ServiceItemProps {
    service: {
        title: string;
        description: string;
        name: string;
        items: NavigationItem[];
    };
    index: number;
    isExpanded: boolean;
    onToggle: (index: number) => void;
}

const ANIMATION_SETTINGS = {
    duration: 0.6,
    bounce: 5,
    delay: 0,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [0, 26, 0, 0, 0],
    closeY: [60, -6, 0, 0, 0],
    opacity: [0, 1, 1, 1, 1],
};

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, isExpanded, onToggle }) => {

    const controls = useAnimation();

    useEffect(() => {
        if (!isExpanded) return;

        controls.start({
            y: ANIMATION_SETTINGS.openY,
            opacity: ANIMATION_SETTINGS.opacity,
            transition: {
                duration: ANIMATION_SETTINGS.duration,
                ease: ANIMATION_SETTINGS.ease,
                times: ANIMATION_SETTINGS.times
            }
        });

    }, [isExpanded, controls]);

    return (
        <div  className={`overflow-hidden relative ${index === 0 ? 'border-t' : ''} border-[#93969d80] border-b `}>
            {/* Заголовок спойлера */}

            <div id={service.name} className='absolute top-[-94px] left-0 w-full'></div>
            <button
                onClick={() => onToggle(index)}
                className={`w-full`}
            >
                <div className={`line-after__box justify-between group wrapper xxl:!flex-row flex xxl:items-center py-[25px] overflow-hidden`}>
                    <div className="flex gap-[22px] items-center w-[200px]">
                        <svg
                            className={`group-hover:text-[#34446D] text-black transition-transform duration-100 group-active:scale-[.85] ${isExpanded ? 'rotate-90' : ''}`}
                            width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_5667_4071)">
                                <path d="M4.404 3.30273L7.835 6.62973C8.055 6.84273 8.055 7.15673 7.835 7.36973L1.205 13.7997C0.79 14.2007 0 13.9577 0 13.4297V7.70673L4.404 3.30273Z" fill="currentColor" />
                                <path opacity="0.5" d="M0 6.29282V0.569821C0 0.0418214 0.79 -0.201179 1.205 0.199821L3.686 2.60582L0 6.29282Z" fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id="clip0_5667_4071">
                                    <rect width="8" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h2 className={`line-after xl:text-[24px] xxs:text-[20px] text-[18px] font-light group-active:scale-[.9] transition-all duration-200`}>{service.title}</h2>
                    </div>
                    <div className={`xxl:ml-[30px] xxl:mt-0 mt-[30px] flex gap-[20px] xxl:w-[1070px] items-center flex-wrap transition-all duration-100 overflow-hidden ${isExpanded ? 'opacity-0 xxl:max-h-[100%] max-h-0 translate-y-full !mt-0' : 'opacity-100  translate-y-0 xxl:max-h-[100%] max-h-[330px]'}`}>
                        {service.items.map((item, itemIndex) => (
                            <AppNavigationItem
                                dark={true}
                                className='!w-[252px]'
                                key={itemIndex}
                                title={item.title}
                                img={'https://test11.audiosector.ru/cp' + item.img?.url}
                                link={item.slug}
                            />
                        ))}
                    </div>
                </div>
            </button>

            <div className={`${!isExpanded ? 'max-h-[0px]' : 'max-h-[2000px] m:pb-[100px] pb-[80px]'} transition-all duration-200 overflow-hidden  `}>
                {/* Описание услуги */}
                <div className="wrapper">

                    <p className="ml-[30px] text-[#000000] mb-[10px] leading-relaxed max-w-[1150px]">
                        {service.description}
                    </p>

                    {/* Сертификаты */}
                    <div className="ml-[30px] flex l:gap-[110px] gap-[30px] flex-wrap py-[20px] m:justify-start  justify-center">
                        {service.items.map((certificate: NavigationItem, certIndex: number) => (
                            <motion.div
                                key={certIndex}
                                initial={{ y: 20 }}
                                animate={controls}
                            >
                                <Link
                                    href={`/services?type=${service.name}`}
                                    className={`transition-transform will-change-transform duration-100 active:scale-[.95] p-[20px] flex flex-col gap-[20px] text-left w-[310px] hover:bg-[#F5F5F5] rounded-[8px] border border-[transparent] hover:border-[#34446d]`}
                                >
                                    <span className='text-[20px] h-[45px] flex items-center tracking-[-1px]'>{certificate.title}</span>
                                    <div className="relative w-full">
                                        <Image
                                            src={'https://test11.audiosector.ru/cp' + certificate.img?.url}
                                            alt={certificate.title}
                                            width={380}
                                            height={270}
                                            className='w-full h-full object-cover border border-[#93969d] rounded-[4px]'
                                        />
                                        <div className='w-[250px] justify-between flex absolute bottom-[-10px]  right-[-10px] flex p-[10px] bg-[#F5F5F580] rounded-[4px] border border-[#000] backdrop-blur-[4px]'>
                                            <div className="flex flex-col gap-[6px]">
                                                <span className='text-[#000] text-[14px] font-light'>Срок оформления</span>
                                                <span className='text-[18px] font-light'>{certificate.duration}</span>
                                            </div>
                                            <div className="flex flex-col gap-[6px]">
                                                <span className='text-[#000] text-[14px] font-light'>Стоимость</span>
                                                <span className='text-[18px] font-light'>{certificate.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceItem;
