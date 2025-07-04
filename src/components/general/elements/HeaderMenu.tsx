import Link from 'next/link';
import ArrowIcon from '@/assets/images/svg/menu/arrow.svg'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
const navigationData = [
    {
        id: 'main',
        title: 'Главная',
        href: '/'
    },
    {
        id: 'services',
        title: 'Услуги',
        children: [
            {
                id: 'gost-r',
                title: 'ГОСТ Р',
                children: [
                    { id: 'cert-compliance', title: 'Сертификат соответствия ГОСТ Р', href: '/services/gost-r/cert-compliance' },
                    { id: 'decl-compliance', title: 'Декларация соответствия ГОСТ Р', href: '/services/gost-r/decl-compliance' },
                    { id: 'cert-agro', title: 'Сертификат соответствия «Сельхозпродукт»', href: '/services/gost-r/cert-agro' }
                ]
            },
            {
                id: 'customs-union',
                title: 'Таможенный союз',
                href: '/services/customs-union'
            },
            {
                id: 'rospotr',
                title: 'Роспотребнадзор',
                href: '/services/rospotr'
            },
            {
                id: 'tech-docs',
                title: 'Тех. документация',
                href: '/services/tech-docs'
            },
            {
                id: 'iso-smk',
                title: 'ИСО (СМК)',
                href: '/services/iso-smk'
            },
            {
                id: 'certification',
                title: 'Сертификация',
                href: '/services/certification'
            }
        ]
    },
    {
        id: 'about',
        title: 'О компании',
        href: '/about'
    },
    {
        id: 'contacts',
        title: 'Контакты',
        href: '/contacts'
    }
];

const HeaderMenu = ({ active }: { active: boolean }) => {

    const [navigationStack, setNavigationStack] = useState([
        { items: navigationData, title: 'NVSERT' }
    ]);

    const canGoBack = navigationStack.length > 1;


    const handleItemClick = (item: any) => {

        if (item.children && item.children.length > 0) {
            setNavigationStack(prev => [
                ...prev,
                {
                    items: item.children!,
                    title: item.title,
                    parentId: item.id
                }
            ]);

        }
    };

    const handleGoBack = () => {
        if (!canGoBack) return;

        setNavigationStack(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        if (!active) {
            setTimeout(() => {
                setNavigationStack([{ items: navigationData, title: 'NVSERT' }]);
            }, 300);
        }
    }, [active]);

    const currentLevel = navigationStack[navigationStack.length - 1];

    return (
        <div className={`header__menu-mob ${active && 'active'}`}>
            <nav className="header-nav flex flex-col gap-[26px] relative overflow-hidden w-full">
                <div className="header-nav__list !grid grid-cols-3">
                    {canGoBack &&
                        <>
                            <button
                                onClick={handleGoBack}>
                                <Image
                                    className='rotate-[180deg]'
                                    src={ArrowIcon} alt='back' width={20} height={20} />
                            </button>

                            <span className=' text-[24px] text-center text-[#000]'>{currentLevel.title}</span>

                        </>
                    }
                </div>
                <div
                    className="flex transition-transform"
                    style={{
                        transform: `translateX(-${(navigationStack.length - 1) * 100}%)`
                    }}
                >


                    {navigationStack.map((level, index) => (
                        <ul
                            key={index}
                            className="header-nav__list min-w-full flex-shrink-0"
                        >
                            {level.items.map((item, index_item) =>
                                item.href ? (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`${index_item === 0 ? 'first-child' : ''} header__menu-mob-item`}
                                    >
                                        <span className="text-[18px] text-[#000]">{item.title}</span>
                                        {item.children && (
                                            <Image src={ArrowIcon} alt="more" width={20} height={20} />
                                        )}
                                    </Link>
                                ) : (
                                    <button
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        className={`${index_item === 0 ? 'first-child' : ''} header__menu-mob-item`}
                                    >
                                        <span className="text-[18px] text-[#000]">{item.title}</span>
                                        {item.children && (
                                            <Image src={ArrowIcon} alt="more" width={20} height={20} />
                                        )}
                                    </button>
                                )
                            )}
                        </ul>
                    ))}
                </div>
            </nav>

            <div className="flex flex-col items-center gap-[10px] px-[40px] pb-[80px]  text-[#FFF]">
                <div className="button-menu bg-[#34446D]  w-[280px] mx-auto">
                    <span>Заказать звонок</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.03597 1C6.61151 1 8.91367 6.17986 8.91367 6.7554C8.91367 7.90648 7.18705 9.05755 6.61151 10.2086C6.03597 11.3597 7.18705 12.5108 8.33813 13.6619C8.78705 14.1108 10.6403 15.964 11.7914 15.3885C12.9424 14.813 14.0935 13.0863 15.2446 13.0863C15.8201 13.0863 21 15.3885 21 15.964C21 18.2662 19.2734 19.9928 17.5468 20.5683C15.8201 21.1439 14.6691 21.1439 12.3669 20.5683C10.0647 19.9928 8.33813 19.4173 5.46043 16.5396C2.58273 13.6619 2.00719 11.9353 1.43165 9.63309C0.856115 7.33094 0.856115 6.17986 1.43165 4.45324C2.00719 2.72662 3.73381 1 6.03597 1Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className="button-menu  w-[280px] mx-auto">
                    <span className='text-[#000]'>info@nvsert.ru</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.2 21C2.595 21 2.07727 20.7799 1.6468 20.3396C1.21633 19.8994 1.00073 19.3695 1 18.75V5.25C1 4.63125 1.2156 4.10175 1.6468 3.6615C2.078 3.22125 2.59573 3.00075 3.2 3H20.8C21.405 3 21.9231 3.2205 22.3543 3.6615C22.7855 4.1025 23.0007 4.632 23 5.25V18.75C23 19.3687 22.7848 19.8986 22.3543 20.3396C21.9238 20.7806 21.4057 21.0007 20.8 21H3.2ZM12 13.125L3.2 7.5V18.75H20.8V7.5L12 13.125ZM12 10.875L20.8 5.25H3.2L12 10.875ZM3.2 7.5V5.25V18.75V7.5Z" fill="#93969D" />
                    </svg>

                </div>
                <div className="flex items-center mt-[13px] gap-[10px]">
                    <a href="#" className="flex items-center px-[8px] gap-[8px]">
                        <span className='text-[18px] text-[#2AABEE]'>Telegram</span>
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.2691 7.6294L15.1044 15.087C15.0883 15.1899 15.047 15.2871 14.984 15.37C14.9211 15.4529 14.8386 15.5188 14.7439 15.5619C14.6492 15.605 14.5453 15.624 14.4414 15.617C14.3376 15.61 14.2371 15.5774 14.149 15.522L10.2487 13.0781C10.1676 13.0274 10.0992 12.9588 10.0487 12.8777C9.99809 12.7965 9.96672 12.7049 9.95693 12.6098C9.94714 12.5146 9.95919 12.4185 9.99216 12.3288C10.0251 12.239 10.0782 12.158 10.1472 12.0918L13.385 8.98864C13.4213 8.95444 13.3786 8.89781 13.3358 8.92345L8.64263 11.7317C8.36368 11.8994 8.03241 11.9577 7.71296 11.8952L6.01391 11.5671C5.40055 11.4485 5.31613 10.6065 5.89209 10.3682L14.9772 6.61211C15.132 6.54771 15.3011 6.52576 15.4672 6.54852C15.6333 6.57128 15.7903 6.63792 15.922 6.74157C16.0538 6.84522 16.1555 6.98214 16.2167 7.1382C16.2779 7.29426 16.2953 7.46382 16.2691 7.6294Z" fill="#93969D" />
                            <path d="M16.2691 7.6294L15.1044 15.087C15.0883 15.1899 15.047 15.2871 14.984 15.37C14.9211 15.4529 14.8386 15.5188 14.7439 15.5619C14.6492 15.605 14.5453 15.624 14.4414 15.617C14.3376 15.61 14.2371 15.5774 14.149 15.522L10.2487 13.0781C10.1676 13.0274 10.0992 12.9588 10.0487 12.8777C9.99809 12.7965 9.96672 12.7049 9.95693 12.6098C9.94714 12.5146 9.95919 12.4185 9.99216 12.3288C10.0251 12.239 10.0782 12.158 10.1472 12.0918L13.385 8.98864C13.4213 8.95444 13.3786 8.89781 13.3358 8.92345L8.64263 11.7317C8.36368 11.8994 8.03241 11.9577 7.71296 11.8952L6.01391 11.5671C5.40055 11.4485 5.31613 10.6065 5.89209 10.3682L14.9772 6.61211C15.132 6.54771 15.3011 6.52576 15.4672 6.54852C15.6333 6.57128 15.7903 6.63792 15.922 6.74157C16.0538 6.84522 16.1555 6.98214 16.2167 7.1382C16.2779 7.29426 16.2953 7.46382 16.2691 7.6294Z" fill="url(#paint0_linear_4478_3820)" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 0C5.4251 0 0.5 4.9251 0.5 11C0.5 17.0749 5.4251 22 11.5 22C17.5749 22 22.5 17.0749 22.5 11C22.5 4.9251 17.5749 0 11.5 0ZM3.07882 7.51183C2.62075 8.61772 2.38498 9.803 2.38498 11C2.38498 13.4175 3.34531 15.7359 5.05471 17.4453C6.76411 19.1547 9.08255 20.115 11.5 20.115C13.9175 20.115 16.2359 19.1547 17.9453 17.4453C19.6547 15.7359 20.615 13.4175 20.615 11C20.615 9.803 20.3792 8.61772 19.9212 7.51183C19.4631 6.40595 18.7917 5.40112 17.9453 4.55471C17.0989 3.7083 16.0941 3.03689 14.9882 2.57882C13.8823 2.12075 12.697 1.88498 11.5 1.88498C10.303 1.88498 9.11772 2.12075 8.01183 2.57882C6.90595 3.03689 5.90112 3.7083 5.05471 4.55471C4.2083 5.40112 3.53689 6.40595 3.07882 7.51183Z" fill="#93969D" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 0C5.4251 0 0.5 4.9251 0.5 11C0.5 17.0749 5.4251 22 11.5 22C17.5749 22 22.5 17.0749 22.5 11C22.5 4.9251 17.5749 0 11.5 0ZM3.07882 7.51183C2.62075 8.61772 2.38498 9.803 2.38498 11C2.38498 13.4175 3.34531 15.7359 5.05471 17.4453C6.76411 19.1547 9.08255 20.115 11.5 20.115C13.9175 20.115 16.2359 19.1547 17.9453 17.4453C19.6547 15.7359 20.615 13.4175 20.615 11C20.615 9.803 20.3792 8.61772 19.9212 7.51183C19.4631 6.40595 18.7917 5.40112 17.9453 4.55471C17.0989 3.7083 16.0941 3.03689 14.9882 2.57882C13.8823 2.12075 12.697 1.88498 11.5 1.88498C10.303 1.88498 9.11772 2.12075 8.01183 2.57882C6.90595 3.03689 5.90112 3.7083 5.05471 4.55471C4.2083 5.40112 3.53689 6.40595 3.07882 7.51183Z" fill="url(#paint1_linear_4478_3820)" />
                            <defs>
                                <linearGradient id="paint0_linear_4478_3820" x1="544.407" y1="6.53979" x2="544.407" y2="914.401" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#2AABEE" />
                                    <stop offset="1" stop-color="#229ED9" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_4478_3820" x1="1100.59" y1="0" x2="1100.59" y2="2200" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#2AABEE" />
                                    <stop offset="1" stop-color="#229ED9" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </a>
                    <a href="#" className="flex items-center px-[8px] gap-[8px]">
                        <span className='text-[18px] text-[#60D669]'>WhatsApp</span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6772 13.013C15.8415 13.0927 15.9735 13.1567 16.0412 13.189C16.0959 13.2151 16.1462 13.2382 16.1924 13.2594C16.3797 13.3454 16.4987 13.4 16.5608 13.497C16.6382 13.618 16.6382 14.157 16.406 14.795C16.1849 15.433 15.0905 16.016 14.5598 16.093C14.0844 16.159 13.4874 16.192 12.8352 15.983C12.4372 15.862 11.9286 15.697 11.2764 15.411C8.65519 14.2858 6.8929 11.7227 6.62711 11.3362C6.61489 11.3184 6.60583 11.3052 6.6 11.297L6.59785 11.2942C6.45707 11.1074 5.48342 9.81601 5.48342 8.48104C5.48342 7.24288 6.0857 6.58526 6.36992 6.27493C6.39375 6.2489 6.41535 6.22532 6.43417 6.20404C6.68844 5.92904 6.97588 5.86304 7.16382 5.86304H7.69447C7.71367 5.86432 7.73376 5.86456 7.75462 5.86481C7.91391 5.86672 8.11806 5.86918 8.31357 6.33604C8.53467 6.88604 9.08744 8.22804 9.15377 8.36004C9.2201 8.49204 9.26432 8.64604 9.17588 8.83304C9.16834 8.84805 9.16103 8.86266 9.1539 8.87693C9.07744 9.02992 9.02084 9.14317 8.8995 9.28404C8.85714 9.3332 8.81253 9.38686 8.76747 9.44106C8.67138 9.55662 8.57323 9.67467 8.49045 9.75703C8.34673 9.90003 8.21407 10.043 8.36884 10.318C8.53467 10.593 9.07638 11.484 9.89447 12.21C10.783 13.0001 11.5584 13.3317 11.9373 13.4938C12.0016 13.5213 12.0544 13.5439 12.0945 13.563C12.3709 13.706 12.5367 13.684 12.6915 13.497C12.8462 13.321 13.3658 12.705 13.5538 12.43C13.7417 12.166 13.9186 12.21 14.1729 12.298C14.3565 12.3728 15.1705 12.7674 15.6772 13.013Z" fill="#60D669" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.794 3.20105C17.7803 2.18257 16.573 1.37502 15.2425 0.825456C13.912 0.275893 12.4848 -0.00468947 11.0442 5.92845e-05C5.00804 5.92845e-05 0.0884424 4.89505 0.0884424 10.901C0.0884424 12.826 0.596985 14.696 1.54774 16.346L0 22L5.80402 20.482C7.40703 21.351 9.20904 21.813 11.0442 21.813C17.0804 21.813 22 16.918 22 10.912C22 7.99704 20.8613 5.25805 18.794 3.20105ZM6.401 18.7C7.80502 19.525 9.40804 19.965 11.0442 19.965C16.0633 19.965 20.1538 15.906 20.1317 10.912C20.1363 9.72083 19.9032 8.54056 19.4458 7.4397C18.9885 6.33884 18.316 5.33929 17.4673 4.49905C15.7538 2.78305 13.4653 1.83705 11.0332 1.83705C6.01407 1.83705 1.92362 5.90704 1.92362 10.901C1.92464 12.6052 2.40734 14.2748 3.31658 15.719L3.53769 16.06L2.6201 19.404L6.06935 18.502L6.401 18.7Z" fill="#60D669" />
                        </svg>

                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenu;