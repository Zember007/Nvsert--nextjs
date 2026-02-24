'use client';
import React, { useEffect, useId, useState } from 'react';
import { NavigationItem } from '@/types/navigation';
import { AppNavigationItem } from 'widgets/layout';
import { motion, useAnimation } from "framer-motion";
import stylesBtn from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';
import { getStrapiImageApiPath } from '../../shared/lib/strapi-image';

const ServiceCard = dynamic(() => import('widgets/services').then((m) => m.ServiceCard), {
  ssr: false,
});

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
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);
    const localizePath = (path: string) => withLocalePrefix(path, locale);

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

    const clipId = useId();

    return (
        <div className={`overflow-hidden relative ${index === 0 ? 'border-t' : ''} border-[#93969d80]  ${last && isExpanded ? '' : 'border-b'}`}>
            {/* Заголовок спойлера */}

            <div id={service.name} className='absolute top-[-54px] left-0 w-full'></div>
            <div
                onClick={() => {
                    onToggle(index);
                    setNoActive(true);
                }}
                onMouseDown={() => setNoActive(false)}
                onMouseLeave={() => setNoActive(false)}
                onMouseEnter={() => setNoActive(false)}
                onTouchStart={() => setNoActive(false)}
                onTouchEnd={() => setNoActive(false)}
                className={`w-full cursor-pointer`}
            >
                
                
                <div className={`${stylesBtn.lineAfterBox} justify-between group wrapper xxl:flex-row flex-col flex xxl:items-center py-[25px] overflow-hidden`}>
                    <div className="w-[250px]">
                        <div className={`flex gap-[22px] justify-start w-fit items-center transition-transform duration-100  group-active:scale-[.9] ${active && 'scale-[.9]'}`}>
                            <svg
                                className={`${hover && '!text-[#34446D]'} ${!noActive ? 'group-hover:text-[#34446D]' : ''} text-black transition-transform duration-100 ${isExpanded ? 'rotate-90 translate-x-[4px] translate-y-[2px]' : ''}`}
                                width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath={`url(#${clipId})`}>
                                    <path d="M4.404 3.30273L7.835 6.62973C8.055 6.84273 8.055 7.15673 7.835 7.36973L1.205 13.7997C0.79 14.2007 0 13.9577 0 13.4297V7.70673L4.404 3.30273Z" fill="currentColor" />
                                    <path opacity="0.5" d="M0 6.29282V0.569821C0 0.0418214 0.79 -0.201179 1.205 0.199821L3.686 2.60582L0 6.29282Z" fill="currentColor" />
                                </g>
                                <defs>
                                    <clipPath id={clipId}>
                                        <rect width="8" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <h2 className={`${textSize.headerH4} ${stylesBtn.lineAfter} ${noActive ? stylesBtn.noactive : ''} after:!bottom-[-5px] !m-0   ${hover && 'active'}  transition-all duration-200 translate-y-[1px]`}>{service.title}</h2>
                        </div>
                    </div>
                    <div className={`xxs:ml-[30px] xxl:mt-0 mt-[25px] xxl:grid flex gap-[20px] xxl:grid-cols-4 items-center flex-wrap transition-all duration-100 overflow-hidden ${isExpanded ? 'opacity-0 xxl:max-h-[100%] max-h-0 translate-y-full !mt-0' : 'opacity-100  translate-y-0 xxl:max-h-[100%] max-h-[350px]'}`}>
                        {service.items.map((item, itemIndex) => (
                            <AppNavigationItem
                                onClick={(e) => { e.stopPropagation() }}
                                dark={true}
                                className='xxs:!w-[250px] w-full'
                                classNameText='m:!whitespace-pre-line !whitespace-normal'
                                key={itemIndex}
                                title={item.title}
                                img={(item.img?.formats?.thumbnail?.url ? getStrapiImageApiPath(item.img.formats.thumbnail.url) : '')}   
                                link={item.slug}
                                localizePath={localizePath}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${!isExpanded ? 'max-h-[0px]' : `max-h-[2370px] m:pb-[100px]  ${last ? 'pb-0' : 'pb-[80px]'}`} transition-all duration-200 overflow-hidden  `}>
                {/* Описание услуги */}
                <div className="wrapper">

                    <h3 className={`xxs:ml-[30px] text-[#000000] ${textSize.textBasePost} mb-[10px] max-w-[1150px]`}>
                        {service.description}
                    </h3>

                    {/* Сертификаты */}
                    <div className={`flex l:gap-x-[118px] gap-x-[30px] gap-y-[30px] flex-wrap py-[20px] ${last ? 'pb-0' : ''} m:justify-start  justify-center`}>
                        {service.items.map((certificate: NavigationItem, certIndex: number) => (
                            <motion.div
                                key={certIndex}
                                initial={{ y: 20 }}
                                animate={controls}
                            >
                                    <ServiceCard
                                        serviceName={service.name}
                                        certificate={certificate}
                                    />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServiceItem;
