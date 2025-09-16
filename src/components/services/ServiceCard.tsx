'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavigationItem } from '@/store/navigation';

interface ServiceCardProps {
    serviceName?: string;
    certificate: NavigationItem;
    className?: string;
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

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceName, certificate, className }) => {
    const href = certificate.slug ? `/services/${certificate.slug}` : (serviceName ? `/services?type=${serviceName}` : '/services');

    return (
        <Link
            href={href}
            className={`w-[312px] transition-transform will-change-transform duration-100 active:scale-[.95] p-[30px] flex flex-col gap-[20px] text-left  hover:bg-[#F5F5F2] rounded-[8px] border border-[transparent] hover:border-[#34446D] ${className || ''}`}
       >
            <span className='text-[20px] flex items-center tracking-[-1px] h-[38px] max-w-[230px] whitespace-pre-line'>{replaceValue(certificate.title)}</span>
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
                <div className='w-[250px] justify-between flex absolute bottom-[-10px] leading-[0.68]  right-[-11px] flex p-[11px] bg-[#F5F5F580] rounded-[4px] border border-[#000] backdrop-blur-[4px]'>
                    <div className="flex flex-col gap-[10px]">
                        <span className='text-[#000] text-[14px] font-light'>Срок оформления</span>
                        <span className='text-[18px] font-light'>{certificate.duration}</span>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <span className='text-[#000] text-[14px] font-light'>Стоимость</span>
                        <span className='text-[18px] font-light'>{certificate.price}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;


