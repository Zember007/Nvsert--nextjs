'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavigationItem } from '@/store/navigation';

interface ServiceCardProps {
    serviceName?: string;
    certificate: NavigationItem;
    className?: string;
    title?: boolean;
    padding?: boolean;
    onClick?: () => void;
}

const replaceValue = (value: string) => {
    return value
        .replace(/Сертификат\s+соответствия\s+Сейсмостойкости/gi, "Сертификат\u00A0соответствия cейсмостойкости")
        .replace(/пожарной\s+безопасности/gi, "пожарной\u00A0безопасности")
        .replace(/таможенного\s+союза/gi, "таможенного\u00A0союза")
        .replace(/\s+\(ЭЗ\)/g, "\u00A0(ЭЗ)")
        .replace(/инспекционного\s+контроля/gi, "инспекционного\u00A0контроля")
        .replace(/Сертификат\s+на\s+тип/gi, "Сертификат\nна тип")
        .replace(/Обоснования\s+безопасности/gi, "Обоснования\u00A0безопасности");
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceName, certificate, className, title = true, padding = true, onClick }) => {
    const href = certificate.slug ? `/services/${certificate.slug}` : '';

    return (
        href ? (
            <Link
                href={href}
                className={` transition-transform will-change-transform duration-100 active:scale-[.95] ${padding ? 'xss:px-[30px] xss:py-[30px] px-[15px] py-[20px] xss:w-[312px] w-[282px] hover:bg-[#F5F5F2] border border-[transparent] hover:border-[#34446D]' : 'p-0 w-full'} flex flex-col gap-[20px] text-left  rounded-[8px]  ${className || ''}`}
            >
                {title && <h6 className='flex items-center xss:h-[38px] h-[34px] max-w-[230px] whitespace-pre-line !font-normal'>{replaceValue(certificate.title)}</h6>}
                <div className="relative w-full ">
                    <div className="border border-[#93969d] rounded-[4px] overflow-hidden h-[346px]">
                        <Image
                            src={'https://test11.audiosector.ru/cp' + certificate.img?.url}
                            alt={certificate.title}
                            width={249}
                            height={346}
                            className='h-[346px]'
                        />
                    </div>
                    <div className='xss:w-[250px] w-[206px] justify-between flex absolute xss:bottom-[-10px] bottom-[-13px] xss:*:*:!leading-[0.68] *:*:!leading-[0.8]  xss:right-[-11px] right-[-8px] flex p-[11px] bg-[#F5F5F580] rounded-[4px] border border-[#000] backdrop-blur-[4px]'>
                        <div className="flex flex-col gap-[10px]">
                            <span className='text-5'>Срок оформления</span>
                            <span className='text-1 font-light'>{certificate.duration}</span>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <span className='text-5'>Стоимость</span>
                            <span className='text-1 font-light'>{certificate.price}</span>
                        </div>
                    </div>
                </div>
            </Link>
        ) : (
                <button
                    onClick={onClick}
                    className={` transition-transform will-change-transform duration-100 active:scale-[.95] ${padding ? 'xss:px-[30px] xss:py-[30px] px-[15px] py-[20px] xss:w-[312px] w-[282px] hover:bg-[#F5F5F2] border border-[transparent] hover:border-[#34446D]' : 'p-0 w-full'} flex flex-col gap-[20px] text-left  rounded-[8px]  ${className || ''}`}
                >
                    {title && <h6 className='flex items-center xss:h-[38px] h-[34px] max-w-[230px] whitespace-pre-line'>{replaceValue(certificate.title)}</h6>}
                    <div className="relative w-full ">
                        <div className="border border-[#93969d] rounded-[4px] overflow-hidden h-[346px]">
                            <Image
                                src={'https://test11.audiosector.ru/cp' + certificate.img?.url}
                                alt={certificate.title}
                                width={249}
                                height={346}
                                className='h-[346px]'
                            />
                        </div>
                        <div className='xss:w-[250px] w-[206px] justify-between flex absolute xss:bottom-[-10px] bottom-[-13px] xss:*:*:!leading-[0.68] *:*:!leading-[0.8]  xss:right-[-11px] right-[-8px] flex p-[11px] bg-[#F5F5F580] rounded-[4px] border border-[#000] backdrop-blur-[4px]'>
                            <div className="flex flex-col gap-[10px]">
                                <span className='text-5'>Срок оформления</span>
                                <span className='text-1 font-light'>{certificate.duration}</span>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <span className='text-5'>Стоимость</span>
                                <span className='text-1 font-light'>{certificate.price}</span>
                            </div>
                        </div>
                    </div>
                </button>
        )
    );
};

export default ServiceCard;


