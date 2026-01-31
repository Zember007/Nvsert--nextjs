'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';
import { useTranslation } from 'react-i18next';
import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';

export type SidebarItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
};

const SidebarNavButtons = () => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);
    const localizePath = (path: string) => withLocalePrefix(path, locale);
    const isAbout = pathname.includes('/about');
    const isFeedback = pathname.includes('/feedback');
    const isOkpd = pathname.includes('/okpd');
    const isTnved = pathname.includes('/tnved');
    const items = [
        {
            id: 'about',
            label: t('navigation.about'),
            active: isAbout,
            href: localizePath('/about'),
            icon: (
                <svg className='text-[#93969D]' width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.8519 1.21429V7.28572C11.8519 7.56988 11.9689 7.8424 12.1773 8.04333C12.3857 8.24426 12.6683 8.35714 12.963 8.35714H19.2593L11.8519 1.21429Z" fill={!isAbout ? '#34446D' : "#FFF"} />
                    <path d="M9.62963 7.28572V0.5H3.33333C2.44928 0.5 1.60143 0.838647 0.976311 1.44144C0.35119 2.04424 0 2.8618 0 3.71429V22.2857C0 23.1382 0.35119 23.9558 0.976311 24.5586C1.60143 25.1614 2.44928 25.5 3.33333 25.5H16.6667C17.1044 25.5 17.5379 25.4169 17.9423 25.2553C18.3467 25.0938 18.7142 24.857 19.0237 24.5586C19.3332 24.2601 19.5788 23.9057 19.7463 23.5158C19.9138 23.1258 20 22.7078 20 22.2857V10.5H12.963C12.0789 10.5 11.2311 10.1614 10.6059 9.55856C9.98082 8.95576 9.62963 8.1382 9.62963 7.28572Z" fill={!isAbout ? '#93969D' : "#FFF"} />
                    <path d="M11.416 15.3956L8.66795 15.7112L8.56954 16.1291L9.10955 16.2204C9.46236 16.2973 9.53196 16.4139 9.45516 16.7361L8.56954 20.5496C8.33674 21.536 8.69555 22 9.53916 22C10.1932 22 10.9528 21.7229 11.2972 21.3424L11.4028 20.885C11.1628 21.0785 10.8124 21.1555 10.5796 21.1555C10.2496 21.1555 10.1296 20.9433 10.2148 20.5694L11.416 15.3956ZM11.5 13.0996C11.5 13.3913 11.3736 13.671 11.1485 13.8772C10.9235 14.0834 10.6182 14.1993 10.3 14.1993C9.98171 14.1993 9.67648 14.0834 9.45143 13.8772C9.22638 13.671 9.09995 13.3913 9.09995 13.0996C9.09995 12.808 9.22638 12.5283 9.45143 12.3221C9.67648 12.1159 9.98171 12 10.3 12C10.6182 12 10.9235 12.1159 11.1485 12.3221C11.3736 12.5283 11.5 12.808 11.5 13.0996Z" fill={"#34446D"} />
                </svg>
            )
        },
        {
            id: 'feedback',
            label: t('navigation.reviews'),
            href: localizePath('/feedback'),
            active: isFeedback,
            icon: (
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8519 0.685714V6.51429C11.8519 6.78708 11.9689 7.0487 12.1773 7.2416C12.3857 7.43449 12.6683 7.54286 12.963 7.54286H19.2593L11.8519 0.685714Z" fill={!isFeedback ? '#34446D' : "#FFF"} />
                    <path d="M9.62963 6.51429V0H3.33333C2.44928 0 1.60143 0.325101 0.976311 0.903785C0.35119 1.48247 0 2.26733 0 3.08571V20.9143C0 21.7327 0.35119 22.5175 0.976311 23.0962C1.60143 23.6749 2.44928 24 3.33333 24H16.6667C17.1044 24 17.5379 23.9202 17.9423 23.7651C18.3467 23.61 18.7142 23.3827 19.0237 23.0962C19.3332 22.8097 19.5788 22.4695 19.7463 22.0951C19.9138 21.7208 20 21.3195 20 20.9143V9.6H12.963C12.0789 9.6 11.2311 9.2749 10.6059 8.69622C9.98082 8.11753 9.62963 7.33267 9.62963 6.51429Z" fill={!isFeedback ? '#93969D' : "#FFF"} />
                    <path d="M9.52447 10.9448C9.67415 10.4841 10.3259 10.4841 10.4755 10.9448L11.2076 13.1979C11.2745 13.4039 11.4665 13.5434 11.6831 13.5434H14.0522C14.5366 13.5434 14.738 14.1632 14.3461 14.4479L12.4295 15.8404C12.2542 15.9677 12.1809 16.1934 12.2478 16.3994L12.9799 18.6525C13.1296 19.1132 12.6024 19.4962 12.2105 19.2115L10.2939 17.819C10.1186 17.6917 9.88135 17.6917 9.70611 17.819L7.78949 19.2115C7.39764 19.4962 6.87039 19.1132 7.02007 18.6525L7.75215 16.3994C7.81909 16.1934 7.74576 15.9677 7.57052 15.8404L5.6539 14.4479C5.26204 14.1632 5.46343 13.5434 5.94779 13.5434H8.31686C8.53347 13.5434 8.72545 13.4039 8.79239 13.1979L9.52447 10.9448Z" fill="#34446D" />
                </svg>

            )
        },
        {
            id: 'okpd',
            label: t('navigation.okp'),
            href: localizePath('/okpd'),
            active: isOkpd,
            icon: (
                <svg className={`${isOkpd ? 'text-white' : 'text-[#93969D]'}`} width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.125 0.624875V5.93631C13.125 6.1849 13.2238 6.42331 13.3996 6.59909C13.5754 6.77487 13.8139 6.87363 14.0625 6.87363H19.375L13.125 0.624875ZM0.517027 4.31076C0.853559 3.8355 1.32936 3.47642 1.87875 3.28309L1.875 19.0637C1.875 20.1409 2.30301 21.174 3.06488 21.9357C3.82675 22.6974 4.86006 23.1254 5.9375 23.1254H16.7075C16.5136 23.6737 16.1544 24.1485 15.6793 24.4842C15.2042 24.82 14.6368 25.0002 14.055 25H5.9375C4.36278 25 2.85255 24.3746 1.73905 23.2613C0.625557 22.148 1.07303e-07 20.6381 1.07303e-07 19.0637V5.93631C-0.000160732 5.35401 0.180496 4.78602 0.517027 4.31076Z" fill="currentColor" />
                    <path d="M11.25 5.93631V0H5.9375C5.19158 0 4.47621 0.296257 3.94876 0.823597C3.42132 1.35094 3.125 2.06617 3.125 2.81194V19.0587C3.125 19.8045 3.42132 20.5197 3.94876 21.047C4.47621 21.5744 5.19158 21.8706 5.9375 21.8706H17.1875C17.5568 21.8706 17.9226 21.7979 18.2638 21.6566C18.605 21.5153 18.9151 21.3081 19.1762 21.047C19.4374 20.7859 19.6446 20.4759 19.7859 20.1348C19.9273 19.7936 20 19.428 20 19.0587V8.74825H14.0625C13.3166 8.74825 12.6012 8.45199 12.0738 7.92465C11.5463 7.39731 11.25 6.68209 11.25 5.93631Z" fill="currentColor" />
                </svg>

            )
        },
        {
            id: 'tnved',
            label: t('navigation.tnved'),
            href: localizePath('/tnved'),
            active: isTnved,
            icon: <svg
            className={`${isTnved ? 'text-white' : 'text-[#93969D]'}`}
            width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0161 0.530273H14.3191H19.6222V21.5303H14.3191H9.0161V0.530273Z" fill="currentColor" />
                <path d="M3.8357 0.847321L8.07812 1.43065L5.03883 21.5303L0.53125 20.9469L3.8357 0.847321Z" fill="currentColor" />
                <path d="M14.3191 0.530273H9.0161V21.5303H14.3191M14.3191 0.530273V21.5303M14.3191 0.530273H19.6222V21.5303H14.3191M3.8357 0.847321L8.07812 1.43065L5.03883 21.5303L0.53125 20.9469L3.8357 0.847321Z" stroke={isTnved ? '#34446D' : '#93969D'} stroke-width="1.06061" stroke-linejoin="round" />
                <path d="M17.0762 8.03027V5.03027M11.5762 8.03027V5.03027" stroke={isTnved ? '#34446D' : 'white'} stroke-linejoin="round" />
            </svg>

        }
    ];
    return (
        <div className={`m:flex xxs:grid xxs:grid-cols-2 xxs:gap-[20px] m:gap-[10px] gap-[10px] flex flex-col h-full`}>
            {items.map((item, index_item) => (
                <Link
                    key={item.id}
                    className={`${stylesBtn.borderButton} px-[15px] active:scale-[.98] transition-transform will-change-transform duration-100 group ${item.active ? stylesBtn.active : ''}`}
                    prefetch={false}
                    href={item.href}
                >
                    <span className={`${textSize.headerH6} font-light`}>{item.label}</span>
                    <div className="group-active:scale-[.9] transition-transform will-change-transform duration-100">
                        {item.icon}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SidebarNavButtons;


