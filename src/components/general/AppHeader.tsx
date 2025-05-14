import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '@/assets/styles/sections/_header.scss'
import Link from "next/link";
import { useTranslation } from "react-i18next";

import AppLogo from "./AppLogo";
import AppNavigation from "./AppNavigation";
import { usePathname } from "next/navigation";
import { disableOverflow, enableOverflow } from "@/store/body";
import { useHeaderContext } from "../contexts/HeaderContext";
import AppMenuItem from "./AppMenuItem";
import { useSimpleBar } from "../contexts/SimpleBarContext";
import html2canvas from 'html2canvas';
import useBackgroundBrightness from "@/hook/useBackgroundBrightness";
import { filterPhone } from "@/hook/filter";





const AppHeader = () => {
  const { makeDefaultHeader, makeTransparentHeader, openDefaultModal, darkHeader } = useHeaderContext();

  const pathname = usePathname();
  const [servicesMenuActive, setServicesMenuActive] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const headerRef = useRef<null | HTMLElement>(null)



  const { t } = useTranslation();

  const dispatch = useDispatch();

  function handleNavMenu() {
    if (servicesMenuActive) {
      setServicesMenuActive(false);
      document.body.style.overflow = '';
    } else {
      setServicesMenuActive(true);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeNavMenues() {
    setServicesMenuActive(false);
    setBurgerMenuActive(false);
    document.body.style.overflow = '';
    makeDefaultHeader();
  }

  function burgerHandler() {
    if (!burgerMenuActive) {
      setBurgerMenuActive(true);
      document.body.style.overflow = 'hidden';
      makeTransparentHeader();
    } else {
      setBurgerMenuActive(false);
      document.body.style.overflow = '';
      dispatch(disableOverflow());
      makeDefaultHeader();
    }
  }

  useEffect(() => {
    closeNavMenues();
  }, [pathname]);


  const { simpleBar } = useSimpleBar()



  useBackgroundBrightness({ simpleBar, headerRef })





  return (
    <>
      <header ref={headerRef} className="header">
        <div className="px-[30px] header__wrapper !h-[50px]">
          <div className="flex items-center">
            <AppLogo />
            <div className={`header__menu js-header-menu ${burgerMenuActive && 'active'}`}>
              <nav className="header-nav">
                <ul className="header-nav__list">
                  <li className="header-nav__item">
                    <AppMenuItem isActive={pathname === '/'} item={{ href: "/", label: 'Главная' }} />
                  </li>
                  <li className="header-nav__item group">
                    <AppMenuItem isActive={servicesMenuActive}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavMenu();
                      }}
                      item={{
                        href: '#',
                        label: <div className={`gap-[4px] flex items-center `}>
                          Услуги

                          <div>
                            <svg className={`transition-all duration-300 easy *:transition-all *:duration-300 *:easy *:stroke-[var(--color-item-menu)] group-hover:*:!stroke-[var(--color-item-menu-active)] ${servicesMenuActive ? '*:!stroke-[var(--color-item-menu-active)]' : 'rotate-[180deg]'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 16L12 9L19 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>
                        </div>
                      }}
                    />
                  </li>
                  <li className="header-nav__item">
                    <AppMenuItem isActive={pathname.includes('/o-kompanii')} item={{ href: "/about/o-kompanii/", label: t('navigation.about') }} />

                  </li>
                  <li className="header-nav__item">
                    <AppMenuItem isActive={pathname.includes('/contacts')} item={{ href: "/contacts/", label: t('navigation.contacts') }} />

                  </li>
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
                  {t('calculation.name')}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex gap-[8px]">
            <AppMenuItem
              className="!px-[35px] group"
              onClick={() => {
                openDefaultModal('introForm')
              }}
              item={{
                href: '#', label:
                  <div>
                    <svg className="absolute top-1/2 transition-all  ease -translate-y-1/2 left-[-1px] -translate-x-full group-hover:translate-x-0 group-hover:left-[15px]" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.9571 6.01519C21.8829 5.97144 21.8177 5.9129 21.7654 5.84295C21.7131 5.77299 21.6747 5.69299 21.6523 5.60757C21.6299 5.52214 21.6241 5.43297 21.6351 5.34519C21.6461 5.25741 21.6737 5.17275 21.7164 5.09609C21.7591 5.01943 21.816 4.95229 21.8838 4.89852C21.9517 4.84475 22.0291 4.80542 22.1116 4.78279C22.1942 4.76017 22.2802 4.75469 22.3649 4.76669C22.4495 4.77868 22.5309 4.8079 22.6046 4.85267C22.7842 4.96006 22.9555 5.0764 23.1187 5.20169C24.1787 6.01197 24.9232 7.18942 25.2171 8.52027C25.511 9.85111 25.3348 11.2471 24.7205 12.4547C24.6383 12.6082 24.5013 12.7221 24.339 12.7721C24.1766 12.822 24.0019 12.8041 23.8522 12.7221C23.7025 12.6401 23.5897 12.5006 23.538 12.3334C23.4864 12.1663 23.4999 11.9848 23.5758 11.8278C24.0832 10.83 24.198 9.66716 23.8962 8.58342C23.5944 7.49967 22.8995 6.57921 21.9571 6.01519ZM20.6622 8.34025C20.5879 8.2965 20.5228 8.23796 20.4705 8.168C20.4182 8.09804 20.3797 8.01805 20.3573 7.93262C20.335 7.8472 20.3291 7.75803 20.3401 7.67025C20.3511 7.58247 20.3788 7.49781 20.4215 7.42115C20.4642 7.34449 20.5211 7.27734 20.5889 7.22357C20.6567 7.16981 20.7341 7.13048 20.8167 7.10785C20.8993 7.08522 20.9853 7.07975 21.0699 7.09174C21.1545 7.10373 21.236 7.13295 21.3097 7.17772C21.9421 7.55609 22.4144 8.16683 22.6331 8.88903C22.8518 9.61123 22.801 10.3922 22.4906 11.0774C22.4175 11.2385 22.2856 11.3629 22.124 11.4232C21.9624 11.4835 21.7843 11.4748 21.6289 11.3989C21.4734 11.3231 21.3535 11.1864 21.2953 11.0188C21.2371 10.8513 21.2456 10.6667 21.3187 10.5056C21.4907 10.125 21.5187 9.69133 21.3972 9.29037C21.2756 8.88942 21.0133 8.55036 20.6622 8.34025ZM8.04294 24.9848C8.11717 25.0286 8.18232 25.0871 8.23464 25.1571C8.28696 25.227 8.32541 25.307 8.34778 25.3924C8.37015 25.4779 8.37601 25.567 8.365 25.6548C8.35399 25.7426 8.32635 25.8272 8.28365 25.9039C8.24096 25.9806 8.18406 26.0477 8.11622 26.1015C8.04839 26.1553 7.97098 26.1946 7.88842 26.2172C7.80587 26.2398 7.71982 26.2453 7.63522 26.2333C7.55061 26.2213 7.46914 26.1921 7.39547 26.1473C6.1631 25.4096 5.25429 24.2057 4.85977 22.7883C4.46525 21.3709 4.6157 19.8502 5.27953 18.5453C5.31816 18.4654 5.37178 18.3943 5.43725 18.3362C5.50272 18.2781 5.57872 18.2341 5.6608 18.2069C5.74288 18.1796 5.82939 18.1696 5.91524 18.1774C6.0011 18.1853 6.08458 18.2108 6.16079 18.2526C6.237 18.2943 6.3044 18.3514 6.35905 18.4205C6.41369 18.4896 6.45448 18.5693 6.47902 18.6549C6.50356 18.7406 6.51136 18.8305 6.50196 18.9193C6.49255 19.0081 6.46614 19.0941 6.42426 19.1722C5.91688 20.17 5.80204 21.3328 6.10384 22.4166C6.40564 23.5003 7.10062 24.4208 8.04294 24.9848ZM9.33789 22.6597C9.41212 22.7035 9.47727 22.762 9.52958 22.832C9.5819 22.902 9.62035 22.982 9.64272 23.0674C9.6651 23.1528 9.67095 23.242 9.65994 23.3298C9.64894 23.4175 9.62129 23.5022 9.5786 23.5789C9.5359 23.6555 9.479 23.7227 9.41117 23.7764C9.34334 23.8302 9.26592 23.8695 9.18337 23.8922C9.10082 23.9148 9.01476 23.9202 8.93016 23.9083C8.84556 23.8963 8.76408 23.867 8.69042 23.8223C8.058 23.4439 7.58567 22.8332 7.36696 22.111C7.14825 21.3888 7.1991 20.6078 7.50943 19.9226C7.58258 19.7615 7.71447 19.6371 7.87609 19.5768C8.0377 19.5165 8.21581 19.5252 8.37121 19.6011C8.52662 19.6769 8.6466 19.8136 8.70476 19.9812C8.76293 20.1487 8.7545 20.3333 8.68135 20.4944C8.50932 20.875 8.48132 21.3087 8.60289 21.7096C8.72446 22.1106 8.98675 22.4496 9.33789 22.6597ZM15.2247 6.19776C15.5477 6.1073 15.8848 6.08427 16.2164 6.13001C16.548 6.17575 16.8676 6.28935 17.1565 6.46421C17.4454 6.63907 17.6979 6.8717 17.8994 7.14859C18.1008 7.42548 18.2472 7.74111 18.33 8.07714L21.3925 20.1239C21.759 21.5603 20.9445 23.0638 19.5602 23.4545L14.7844 24.8049C14.4615 24.8952 14.1246 24.9181 13.7931 24.8722C13.4616 24.8264 13.1422 24.7127 12.8534 24.5379C12.5647 24.3631 12.3123 24.1305 12.1109 23.8537C11.9096 23.5769 11.7632 23.2614 11.6804 22.9255L8.6179 10.8774C8.25273 9.44103 9.06725 7.93753 10.4515 7.54554L15.2247 6.19776ZM14.5928 21.3777C14.6128 21.4628 14.6491 21.5428 14.6995 21.6131C14.7499 21.6833 14.8134 21.7423 14.8862 21.7867C14.959 21.831 15.0397 21.8597 15.1234 21.8711C15.2071 21.8825 15.2922 21.8763 15.3736 21.853L17.6812 21.2005C17.8475 21.1527 17.9892 21.0396 18.0765 20.8852C18.1637 20.7309 18.1896 20.5474 18.1487 20.3736C18.1287 20.2886 18.0924 20.2086 18.042 20.1383C17.9916 20.0681 17.9281 20.009 17.8553 19.9647C17.7824 19.9204 17.7018 19.8917 17.618 19.8803C17.5343 19.8689 17.4492 19.8751 17.3678 19.8984L15.0615 20.5495C14.8948 20.5971 14.7525 20.7103 14.6649 20.8649C14.5774 21.0196 14.5515 21.2036 14.5928 21.3777Z" fill={darkHeader ? '#34446D' : "#34C759"} />
                    </svg>
                    <span className={`transition-transform block ${darkHeader ? '' : 'group-hover:!text-[#34C759]'} group-hover:translate-x-[16px]`}>Заказать звонок</span>
                  </div>
              }} isActive={false} />
            <AppMenuItem
              item={{
                href: filterPhone('8 495 777-11-97'), label: '8 495 777-11-97'
              }} isActive={false} />
          </div>
          <button
            type="button"
            className={`btn-mobile js-burger-btn ${burgerMenuActive && 'active'}`}
            onClick={() => {
              burgerHandler();
            }}
          >
            Меню
            <span className="burger-btn">
              <span></span>
            </span>
          </button>

        </div>
      </header>
      <div className={`services-menu menu-headers js-services-menu relative ${servicesMenuActive && 'active'}`}>

        <div className="services-menu__wrapper select-none">
          <div className="grid grid-cols-6 h-[60px] w-full">
            <div className="flex items-center">
              <p className="text-[20px] text-[#FFF]">Сертификация ГОСТ Р</p>
            </div>
            <div className="flex items-center">
              <p className="text-[20px] text-[#FFF]">Таможенный союз</p>
            </div>
            <div className="flex items-center">
              <p className="text-[20px] text-[#FFF]">Сертификация</p>
            </div>
            <div className="flex items-center">
              <p className="text-[20px] text-[#FFF]">ИСО (СМК)</p>
            </div>
            <div className="flex items-center">
              <p className="text-[20px] text-[#FFF]">Роспотребнадзор</p>
            </div>
            <div className="flex items-center">
              <p className="text-[20px] text-[#FFF]">Тех. документация</p>
            </div>
          </div>
        </div>

      </div>
      <div className={`services-menu pt-[20px] h-[50vw] js-services-menu relative ${servicesMenuActive && 'active'}`}>

        <div className="services-menu__wrapper select-none">
          <AppNavigation active={servicesMenuActive} />
        </div>

      </div>
    </>
  );
};

export default AppHeader;