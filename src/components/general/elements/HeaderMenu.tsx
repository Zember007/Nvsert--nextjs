import Link from 'next/link';
import ArrowIcon from '@/assets/images/svg/menu/arrow.svg'
import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Image04 from '@/assets/images/main-gallery/04.webp';
import Image05 from '@/assets/images/main-gallery/05.webp';
import Image06 from '@/assets/images/main-gallery/06.webp';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { RootState } from '@/config/store';
import { useSelector } from 'react-redux';
import { Services } from '@/store/navigation';
import { useCopyContext } from '@/components/contexts/CopyContext';


export interface Navigation {
    items?: Services[];
    id?: number;
    name: string;
    title: string;
    description?: string;
    slug?: string;
    img?: any;
}

interface navigationStackItem {
    items: Navigation[] | Services[],
    title: string,
    parentId?: string
}



const HeaderMenu = ({ active, closeMenu }: { active: boolean, closeMenu: () => void }) => {



    const navigationData: Navigation[] = [
        {
            name: 'main',
            title: 'Главная',
            slug: '/'
        },
        {
            name: 'services',
            title: 'Услуги',
            items: []
        },
        {
            name: 'about',
            title: 'О компании',
            slug: '/about'
        },
        {
            name: 'contacts',
            title: 'Контакты',
            slug: '/contacts'
        }
    ];

    const { services } = useSelector((state: RootState) => state.navigation);





    const [navigationStack, setNavigationStack] = useState<navigationStackItem[]>([
        { items: navigationData, title: 'NVSERT' }
    ]);

    const canGoBack = navigationStack.length > 1;


    const handleItemClick = (item: any) => {

        if (item.items && item.items.length > 0) {
            setNavigationStack(prev => [
                ...prev,
                {
                    items: item.items!,
                    title: item.title,
                    parentId: item.name
                }
            ]);

        }
    };

    const handleGoBack = () => {
        if (!canGoBack) return;

        setNavigationStack(prev => prev.slice(0, -1));
    };

    useEffect(() => {

        if (services.length) {
            const data = navigationData.find(item => item.name === 'services')
            if (data && data.items) {
                data.items = services
            }

            setTimeout(() => {
                setNavigationStack([{ items: navigationData, title: 'NVSERT' }]);
            }, 300);
        }

        if (!active) {
            setTimeout(() => {
                setNavigationStack([{ items: navigationData, title: 'NVSERT' }]);
            }, 300);
        }

        console.log(navigationData);

    }, [active, services]);

    const currentLevel = navigationStack[navigationStack.length - 1];
    const { openDefaultModal } = useHeaderContext();
    const { handleCopy } = useCopyContext();


    return (
        <div className={`header__menu-mob ${active && 'active'}`}>
            <div className="header__menu-mob-inner">
                <nav className="header-nav flex flex-col  relative overflow-hidden w-full">
                    <div className="header-nav__list !grid grid-cols-3 h-[50px] !items-center ">
                        {canGoBack &&
                            <>
                                <button
                                    className='px-[6px]'
                                    onClick={handleGoBack}>
                                    <Image
                                        className='rotate-[180deg]'
                                        src={ArrowIcon} alt='back' width={20} height={20} />
                                </button>

                                <span className='whitespace-nowrap text-[24px] text-center text-[#000] justify-self-center'>{currentLevel.title}</span>

                            </>
                        }
                    </div>
                    <div className="mt-[10px] grow overflow-hidden ">

                        <div
                            className="flex transition-transform max-h-full"
                            style={{
                                transform: `translateX(-${(navigationStack.length - 1) * 100}%)`
                            }}
                        >


                            {navigationStack.map((level, index) => (
                                <ul
                                    key={index}
                                    className="header-nav__list !py-[1px] min-w-full flex-shrink-0"
                                >
                                    {level.items.map((item, index_item) =>
                                        <li key={item.name} className='w-full'>
                                            {
                                                'slug' in item && item.slug ? (
                                                    <Link

                                                        href={item.slug}
                                                        className={`${index_item === 0 ? 'first-child' : ''} ${item.img ? 'have-img' : ''} header__menu-mob-item`}
                                                    >
                                                        <div className="flex items-center gap-[20px]">
                                                            {item.img?.url && (
                                                                <Image src={'https://test11.audiosector.ru/cp' + item.img.url} alt="document" width={43} height={60} />
                                                            )}
                                                            <span className="text-[18px] text-[#000]">{item.title}</span>
                                                        </div>
                                                        {item.items && (
                                                            <Image src={ArrowIcon} alt="more" width={20} height={20} />
                                                        )}
                                                    </Link>
                                                ) : (
                                                    <button

                                                        onClick={() => handleItemClick(item)}
                                                        className={`${index_item === 0 ? 'first-child' : ''} ${'img' in item && item.img ? 'have-img' : ''} header__menu-mob-item`}
                                                    >
                                                        <div className="flex items-center gap-[20px]">
                                                            {'img' in item && item.img?.url &&
                                                                <Image src={'https://test11.audiosector.ru/cp' + item.img.url} alt="document" width={43} height={60} />
                                                            }
                                                            <span className="text-[18px] text-[#000]">{item.title}</span>
                                                        </div>
                                                        {item.items && (
                                                            <Image
                                                                className='translate-x-[5px]'
                                                                src={ArrowIcon} alt="more" width={20} height={20} />
                                                        )}
                                                    </button>
                                                )
                                            }
                                        </li>
                                    )}
                                </ul>
                            ))}
                        </div>
                    </div>

                    <div className="header-nav__list !my-[15px]">

                        <Link
                            onClick={() => closeMenu()}
                            href="/services"
                            className={`header__menu-mob-item text-[#93969D] text-[20px]`}
                        >
                            Полный список услуг

                        </Link>
                    </div>
                </nav>

                <div className="flex flex-col items-center gap-[10px] px-[40px] pb-[80px]  text-[#FFF]">
                    <button onClick={() => { openDefaultModal('introForm'); closeMenu() }} className="button-menu bg-[#34446D]  w-[280px] mx-auto">
                        <span>Заказать звонок</span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.03597 1C6.61151 1 8.91367 6.17986 8.91367 6.7554C8.91367 7.90648 7.18705 9.05755 6.61151 10.2086C6.03597 11.3597 7.18705 12.5108 8.33813 13.6619C8.78705 14.1108 10.6403 15.964 11.7914 15.3885C12.9424 14.813 14.0935 13.0863 15.2446 13.0863C15.8201 13.0863 21 15.3885 21 15.964C21 18.2662 19.2734 19.9928 17.5468 20.5683C15.8201 21.1439 14.6691 21.1439 12.3669 20.5683C10.0647 19.9928 8.33813 19.4173 5.46043 16.5396C2.58273 13.6619 2.00719 11.9353 1.43165 9.63309C0.856115 7.33094 0.856115 6.17986 1.43165 4.45324C2.00719 2.72662 3.73381 1 6.03597 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="tariff-wrap">
                        <button
                            onClick={(e) => handleCopy('info@nvsert.ru', e)}
                            className="button-menu bg-[#F5F5F2] w-[280px] mx-auto">
                            <span className='text-[#000]'>info@nvsert.ru</span>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.69231 3.80769C1.69231 3.24666 1.91518 2.7086 2.31189 2.31189C2.7086 1.91518 3.24666 1.69231 3.80769 1.69231H5.07692V5.5C5.07692 5.7778 5.13164 6.05287 5.23795 6.30952C5.34425 6.56617 5.50007 6.79937 5.69651 6.9958C6.09322 7.39251 6.63127 7.61538 7.19231 7.61538H13.9615C14.2393 7.61538 14.5144 7.56067 14.7711 7.45436C15.0277 7.34805 15.2609 7.19223 15.4573 6.9958C15.6538 6.79937 15.8096 6.56617 15.9159 6.30952C16.0222 6.05287 16.0769 5.7778 16.0769 5.5V1.72615C16.4995 1.80356 16.8885 2.0078 17.1922 2.31169L19.6883 4.80785C19.8847 5.00432 20.0405 5.23756 20.1468 5.49424C20.2531 5.75093 20.3077 6.02603 20.3077 6.30385V18.1923C20.3078 18.68 20.1394 19.1527 19.831 19.5305C19.5226 19.9082 19.0932 20.1679 18.6154 20.2654V13.1154C18.6154 12.5543 18.3925 12.0163 17.9958 11.6196C17.5991 11.2229 17.061 11 16.5 11H5.5C4.93897 11 4.40091 11.2229 4.0042 11.6196C3.60749 12.0163 3.38462 12.5543 3.38462 13.1154V20.2654C2.90681 20.1679 2.47737 19.9082 2.16899 19.5305C1.8606 19.1527 1.69221 18.68 1.69231 18.1923V3.80769ZM5.07692 20.3077V13.1154C5.07692 13.0032 5.1215 12.8956 5.20084 12.8162C5.28018 12.7369 5.38779 12.6923 5.5 12.6923H16.5C16.6122 12.6923 16.7198 12.7369 16.7992 12.8162C16.8785 12.8956 16.9231 13.0032 16.9231 13.1154V20.3077H5.07692ZM14.3846 1.69231V5.5C14.3846 5.61221 14.34 5.71982 14.2607 5.79916C14.1814 5.8785 14.0737 5.92308 13.9615 5.92308H7.19231C7.0801 5.92308 6.97249 5.8785 6.89315 5.79916C6.8138 5.71982 6.76923 5.61221 6.76923 5.5V1.69231H14.3846ZM3.80769 1.42788e-10C2.79783 1.42788e-10 1.82933 0.401166 1.11525 1.11525C0.401166 1.82933 0 2.79783 0 3.80769V18.1923C0 19.2022 0.401166 20.1707 1.11525 20.8848C1.82933 21.5988 2.79783 22 3.80769 22H18.1923C19.2022 22 20.1707 21.5988 20.8848 20.8848C21.5988 20.1707 22 19.2022 22 18.1923V6.30385C22 5.80381 21.9015 5.30867 21.7102 4.8467C21.5188 4.38473 21.2383 3.96497 20.8848 3.61138L18.3886 1.11523C18.035 0.761655 17.6153 0.481184 17.1533 0.289832C16.6913 0.0984808 16.1962 -4.33008e-06 15.6962 1.42788e-10H3.80769Z" fill="black" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-[#000] flex items-center mt-[13px] gap-[10px]">
                        <div className="tariff-wrap">
                            <button
                                onClick={(e) => handleCopy('@nvsert', e)}
                                className="flex items-center px-[8px] gap-[8px]">
                                <span className='text-[18px]'>Telegram</span>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2632 8.32245L15.9925 16.4581C15.975 16.5702 15.9299 16.6763 15.8613 16.7667C15.7926 16.8571 15.7026 16.9291 15.5993 16.9761C15.496 17.0232 15.3826 17.0438 15.2693 17.0362C15.1561 17.0286 15.0465 16.993 14.9504 16.9325L10.6955 14.2665C10.607 14.2112 10.5324 14.1364 10.4772 14.0478C10.4221 13.9593 10.3878 13.8593 10.3772 13.7556C10.3665 13.6518 10.3796 13.547 10.4156 13.449C10.4516 13.3511 10.5094 13.2627 10.5847 13.1905L14.1169 9.80525C14.1565 9.76795 14.1099 9.70617 14.0632 9.73414L8.94337 12.7977C8.63906 12.9807 8.27767 13.0442 7.92919 12.976L6.07568 12.6182C5.40655 12.4888 5.31446 11.5702 5.94279 11.3102L15.8538 7.21268C16.0226 7.14243 16.2072 7.11848 16.3883 7.14331C16.5695 7.16813 16.7408 7.24083 16.8845 7.35391C17.0282 7.46698 17.1392 7.61635 17.206 7.78659C17.2727 7.95684 17.2917 8.14182 17.2632 8.32245Z" fill="white" />
                                    <path d="M17.2632 8.32245L15.9925 16.4581C15.975 16.5702 15.9299 16.6763 15.8613 16.7667C15.7926 16.8571 15.7026 16.9291 15.5993 16.9761C15.496 17.0232 15.3826 17.0438 15.2693 17.0362C15.1561 17.0286 15.0465 16.993 14.9504 16.9325L10.6955 14.2665C10.607 14.2112 10.5324 14.1364 10.4772 14.0478C10.4221 13.9593 10.3878 13.8593 10.3772 13.7556C10.3665 13.6518 10.3796 13.547 10.4156 13.449C10.4516 13.3511 10.5094 13.2627 10.5847 13.1905L14.1169 9.80525C14.1565 9.76795 14.1099 9.70617 14.0632 9.73414L8.94337 12.7977C8.63906 12.9807 8.27767 13.0442 7.92919 12.976L6.07568 12.6182C5.40655 12.4888 5.31446 11.5702 5.94279 11.3102L15.8538 7.21268C16.0226 7.14243 16.2072 7.11848 16.3883 7.14331C16.5695 7.16813 16.7408 7.24083 16.8845 7.35391C17.0282 7.46698 17.1392 7.61635 17.206 7.78659C17.2727 7.95684 17.2917 8.14182 17.2632 8.32245Z" fill="url(#paint0_linear_5542_9235)" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0601 0C5.4329 0 0.0600586 5.37284 0.0600586 12C0.0600586 18.6272 5.4329 24 12.0601 24C18.6872 24 24.0601 18.6272 24.0601 12C24.0601 5.37284 18.6872 0 12.0601 0ZM2.87332 8.19473C2.3736 9.40115 2.1164 10.6942 2.1164 12C2.1164 14.6372 3.16403 17.1664 5.02883 19.0312C6.89363 20.896 9.42284 21.9437 12.0601 21.9437C14.6973 21.9437 17.2265 20.896 19.0913 19.0312C20.9561 17.1664 22.0037 14.6372 22.0037 12C22.0037 10.6942 21.7465 9.40115 21.2468 8.19473C20.7471 6.98831 20.0146 5.89213 19.0913 4.96877C18.1679 4.04542 17.0718 3.31297 15.8653 2.81326C14.6589 2.31354 13.3659 2.05634 12.0601 2.05634C10.7542 2.05634 9.46121 2.31354 8.25479 2.81326C7.04837 3.31297 5.95219 4.04542 5.02883 4.96877C4.10548 5.89213 3.37303 6.98831 2.87332 8.19473Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0601 0C5.4329 0 0.0600586 5.37284 0.0600586 12C0.0600586 18.6272 5.4329 24 12.0601 24C18.6872 24 24.0601 18.6272 24.0601 12C24.0601 5.37284 18.6872 0 12.0601 0ZM2.87332 8.19473C2.3736 9.40115 2.1164 10.6942 2.1164 12C2.1164 14.6372 3.16403 17.1664 5.02883 19.0312C6.89363 20.896 9.42284 21.9437 12.0601 21.9437C14.6973 21.9437 17.2265 20.896 19.0913 19.0312C20.9561 17.1664 22.0037 14.6372 22.0037 12C22.0037 10.6942 21.7465 9.40115 21.2468 8.19473C20.7471 6.98831 20.0146 5.89213 19.0913 4.96877C18.1679 4.04542 17.0718 3.31297 15.8653 2.81326C14.6589 2.31354 13.3659 2.05634 12.0601 2.05634C10.7542 2.05634 9.46121 2.31354 8.25479 2.81326C7.04837 3.31297 5.95219 4.04542 5.02883 4.96877C4.10548 5.89213 3.37303 6.98831 2.87332 8.19473Z" fill="url(#paint1_linear_5542_9235)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_5542_9235" x1="593.414" y1="7.13379" x2="593.414" y2="997.528" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#2AABEE" />
                                            <stop offset="1" stop-color="#229ED9" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_5542_9235" x1="1200.15" y1="0" x2="1200.15" y2="2400" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#2AABEE" />
                                            <stop offset="1" stop-color="#229ED9" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        <div className="tariff-wrap">
                            <button
                                onClick={(e) => handleCopy('@nvsert', e)}
                                className="flex items-center px-[8px] gap-[8px]">
                                <span className='text-[18px]'>WhatsApp</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0769 14.196C17.2553 14.2829 17.3985 14.3528 17.472 14.388C17.5313 14.4165 17.586 14.4417 17.6361 14.4648C17.8395 14.5586 17.9686 14.6181 18.036 14.724C18.12 14.856 18.12 15.444 17.868 16.14C17.628 16.836 16.44 17.472 15.864 17.556C15.348 17.628 14.7 17.664 13.992 17.436C13.56 17.304 13.008 17.124 12.3 16.812C9.45485 15.5845 7.54196 12.7885 7.25346 12.3668C7.2402 12.3474 7.23037 12.333 7.22404 12.324L7.2217 12.3209C7.06889 12.1172 6.01204 10.7084 6.01204 9.25204C6.01204 7.90132 6.66579 7.18392 6.9743 6.84538C7.00017 6.81699 7.02361 6.79126 7.04404 6.76805C7.32004 6.46805 7.63204 6.39605 7.83604 6.39605H8.41204C8.43288 6.39744 8.45468 6.3977 8.47732 6.39797C8.65023 6.40006 8.87182 6.40274 9.08403 6.91205C9.32403 7.51204 9.92403 8.97604 9.99603 9.12004C10.068 9.26404 10.116 9.43204 10.02 9.63604C10.0118 9.65242 10.0039 9.66836 9.99618 9.68392C9.91319 9.85082 9.85175 9.97437 9.72003 10.128C9.67406 10.1817 9.62563 10.2402 9.57672 10.2993C9.47243 10.4254 9.36589 10.5542 9.27603 10.644C9.12003 10.8 8.97603 10.956 9.14403 11.256C9.32403 11.556 9.91203 12.528 10.8 13.32C11.7645 14.1819 12.6062 14.5437 13.0174 14.7205C13.0872 14.7505 13.1445 14.7752 13.188 14.796C13.488 14.952 13.668 14.928 13.836 14.724C14.004 14.532 14.568 13.86 14.772 13.56C14.976 13.272 15.168 13.32 15.444 13.416C15.6434 13.4976 16.5269 13.9281 17.0769 14.196Z" fill="#60D669" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.46 3.49206C19.3597 2.38099 18.0492 1.50002 16.605 0.900497C15.1608 0.300974 13.6117 -0.00511579 12.048 6.4674e-05C5.49604 6.4674e-05 0.156059 5.34005 0.156059 11.892C0.156059 13.992 0.708057 16.032 1.74005 17.832L0.0600586 24L6.36004 22.344C8.10004 23.292 10.056 23.796 12.048 23.796C18.6 23.796 23.94 18.456 23.94 11.904C23.94 8.72404 22.704 5.73605 20.46 3.49206ZM7.00804 20.4C8.53203 21.3 10.272 21.78 12.048 21.78C17.496 21.78 21.936 17.352 21.912 11.904C21.917 10.6045 21.664 9.31698 21.1675 8.11604C20.6711 6.9151 19.9411 5.82469 19.02 4.90805C17.16 3.03606 14.676 2.00406 12.036 2.00406C6.58804 2.00406 2.14805 6.44405 2.14805 11.892C2.14916 13.7512 2.67311 15.5725 3.66005 17.148L3.90005 17.52L2.90405 21.168L6.64804 20.184L7.00804 20.4Z" fill="#60D669" />
                                </svg>
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenu;