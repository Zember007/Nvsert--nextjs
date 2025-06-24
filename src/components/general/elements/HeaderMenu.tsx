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
                    {canGoBack && (
                        <li className="w-full grid grid-cols-3 items-center justify-items-center">
                            <button
                                onClick={handleGoBack}
                                className="h-[50px] flex items-center"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12.0002L14.4763 18.0002L16 16.5885L11.0431 11.9962L16 7.40384L14.4763 6.00018L8 12.0002Z" fill="white" />
                                </svg>
                                <span className="text-[18px] text-[#FFF]">Назад</span>
                            </button>
                            <span className="text-[20px] font-bold text-[#FFF]">
                                {currentLevel.title}
                            </span>
                        </li>
                    )}
                    {currentLevel.items.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className="menu-mob-item"
                        >
                            <span className="text-[18px] text-[#FFF]">
                                {item.title}
                            </span>

                            {item.children && item.children.length > 0 && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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