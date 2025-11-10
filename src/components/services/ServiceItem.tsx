'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { NavigationItem } from '@/store/navigation';
import Link from 'next/link';
import { AppNavigationItem } from '@/components/general/AppNavigation';
import { motion, useAnimation } from "framer-motion";
import ServiceCard from '@/components/services/ServiceCard';
import { filterPrepositions } from '@/hook/filter';

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
    active: boolean;
    hover: boolean;
    last: boolean;
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

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, isExpanded, onToggle, active, hover, last }) => {

    const controls = useAnimation();

    const [noActive, setNoActive] = useState(false);

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

    const replaceValue = (value: string) => {
        return value
            .replace(/Сертификат\s+соответствия\s+Сейсмостойкости/gi, "Сертификат\u00A0соответствия cейсмостойкости")
            .replace(/пожарной\s+безопасности/gi, "пожарной\u00A0безопасности")
            .replace(/таможенного\s+союза/gi, "таможенного\u00A0союза")
            .replace(/\s+\(ЭЗ\)/g, "\u00A0(ЭЗ)")
            .replace(/инспекционного\s+контроля/gi, "инспекционного\u00A0контроля")
            .replace(/Сертификат\s+на\s+тип/gi, "Сертификат\nна тип")
            .replace(/Обоснования\s+безопасности/gi, "Обоснования\u00A0безопасности")
            ;
    }

    return (
        <div className={`overflow-hidden relative ${index === 0 ? 'border-t' : ''} border-[#93969d80]  ${last && isExpanded ? '' : 'border-b'}`}>
            {/* Заголовок спойлера */}

            <div id={service.name} className='absolute top-[-94px] left-0 w-full'></div>
            <button
                onClick={() => {
                    onToggle(index);
                    setNoActive(true);
                }}
                onMouseDown={() => setNoActive(false)}
                onMouseLeave={() => setNoActive(false)}
                onMouseEnter={() => setNoActive(false)}
                onTouchStart={() => setNoActive(false)}
                onTouchEnd={() => setNoActive(false)}
                className={`w-full`}
            >
                <div className={`line-after__box justify-between group wrapper xxl:!flex-row flex xxl:items-center py-[25px] overflow-hidden`}>
                    <div className="w-[250px]">
                        <div className={`flex gap-[22px] justify-start w-fit items-center transition-transform duration-100  group-active:scale-[.9] ${active && 'scale-[.9]'}`}>
                            <svg
                                className={`${hover && '!text-[#34446D]'} ${!noActive ? 'group-hover:text-[#34446D]' : ''} text-black transition-transform duration-100 ${isExpanded ? 'rotate-90' : ''}`}
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

                            <h4 className={`line-after ${noActive ? 'noactive' : ''} after:!bottom-[-5px] !m-0   ${hover && 'active'}  transition-all duration-200 translate-y-[1px]`}>{service.title}</h4>
                        </div>
                    </div>
                    <div className={`ml-[25px] xxl:mt-0 mt-[25px] xxl:grid flex gap-[20px] xxl:grid-cols-4 items-center flex-wrap transition-all duration-100 overflow-hidden ${isExpanded ? 'opacity-0 xxl:max-h-[100%] max-h-0 translate-y-full !mt-0' : 'opacity-100  translate-y-0 xxl:max-h-[100%] max-h-[350px]'}`}>
                        {service.items.map((item, itemIndex) => (
                            <AppNavigationItem
                                onClick={(e) => { e.stopPropagation() }}
                                dark={true}
                                className='!w-[250px]'
                                key={itemIndex}
                                title={item.title}
                                img={'https://test11.audiosector.ru/cp' + item.img?.url}
                                link={item.slug}
                            />
                        ))}
                    </div>
                </div>
            </button>

            <div className={`${!isExpanded ? 'max-h-[0px]' : `max-h-[2370px] m:pb-[100px]  ${last ? 'pb-0' : 'pb-[80px]'}`} transition-all duration-200 overflow-hidden  `}>
                {/* Описание услуги */}
                <div className="wrapper">

                    <p className="xxs:ml-[30px] text-[#000000] text-base-post mb-[10px] max-w-[1150px]">
                        {service.description}
                    </p>

                    {/* Сертификаты */}
                    <div className={`flex l:gap-x-[110px] gap-x-[30px] gap-y-[30px] flex-wrap py-[20px] ${last ? 'pb-0' : ''} m:justify-start  justify-center`}>
                        {service.items.map((certificate: NavigationItem, certIndex: number) => (
                            <motion.div
                                key={certIndex}
                                initial={{ y: 20 }}
                                animate={controls}
                            >
                                <ServiceCard serviceName={service.name} certificate={certificate} />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceItem;
