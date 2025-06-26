import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
            <nav className="header-nav">
                <ul className="header-nav__list">
                    <li className="w-full h-[50px] flex items-center gap-[10px]">
                        {canGoBack && navigationStack.map((item, i) => (
                            <>
                                <span className={`text-[18px] ${i !== navigationStack.length - 1 ? 'after:text-[#adadad] after:content-["/"] after:ml-[10px]' : ''}`}>
                                    {i === 0 ?
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.26026 5.83292C3.11372 8.49102 0.417351 10.7687 0.271981 10.892L0 11.1234L0.830012 12.3008L1.66002 13.4833L1.82415 13.3393C1.91794 13.2571 4.24384 11.2931 7.00117 8.97431L12.0047 4.75323L17.0129 8.97431C19.7655 11.2931 22.0914 13.2571 22.1852 13.3393L22.3494 13.4833L23.1747 12.3059L24 11.1337L23.9015 11.0309C23.8453 10.9794 23.0762 10.3265 22.1946 9.58099L20.5862 8.23395V3.46274L18.8652 3.47303L17.1395 3.48845L17.1254 4.37277C17.1208 4.8612 17.102 5.26223 17.0879 5.26223C17.0739 5.26223 15.925 4.30079 14.5369 3.12855C13.1442 1.95632 12 0.994879 11.9953 1.00002C11.9859 1.00002 9.4068 3.17483 6.26026 5.83292Z" fill="#ADADAD" />
                                            <path d="M7.8687 10.1877L3.75147 13.6632V23H10.3634V16.162H13.9273V23H20.2579V13.6632L16.1501 10.1928C13.8898 8.28536 12.0234 6.72238 12.0094 6.71724C11.9953 6.7121 10.129 8.27508 7.8687 10.1877Z" fill="#ADADAD" />
                                        </svg>
                                        :
                                        item.title
                                    }
                                </span>
                            </>
                        ))}
                    </li>
                    {currentLevel.items.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className={`${index === 0 ? 'border-t' : ''} ${item.children && item.children.length > 0 ? 'group' : ''} menu-mob-item`}
                        >
                            <span className="text-[18px] text-[#FFF]">
                                {item.title}
                            </span>

                            {item.children && item.children.length > 0 && (
                                <svg
                                    className='group-active:*:stroke-[#FFF] transition-all'
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5L19 19" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19 11L19 19L11 19" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            )}
                        </button>
                    ))}
                </ul>
            </nav>
            <div className="header__menu-content">
                <p className="title">
                    Зачем искать что-то самому, если можно заказать расчет?
                </p>
                <p className="subtitle">
                    Оставьте свои контактные данные, и мы сформируем для вас предложение
                    по документу или пакету документов
                </p>
                <Link
                    href="/find-out-cost/"
                    className="btn btn--primary btn--m header__calc-link"
                >
                    Заказать звонок
                </Link>
                <Link
                    href="/find-out-cost/"
                    className="btn btn--primary btn--m header__calc-link"
                >
                    Оформить заявку
                </Link>
            </div>
        </div>
    );
};

export default HeaderMenu;