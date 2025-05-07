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





const AppHeader = () => {
  const { makeDefaultHeader, makeTransparentHeader, openDefaultModal } = useHeaderContext();

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
                      item={{
                        href: '#',
                        label: <button
                          type="button"
                          className={`gap-[4px] flex items-center `}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavMenu();
                          }}
                        >
                          Услуги

                          <div>
                            <svg className={`*:stroke-[#878787] transition-all duration-200 group-hover:*:!stroke-[var(--color-item-menu-active)] ${servicesMenuActive ? 'duration-[0.6s] *:!stroke-[var(--color-item-menu-active)]' : 'rotate-[180deg]'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 16L12 9L19 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>
                        </button>
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

          <div >
            <AppMenuItem
              isActive={false}
              item={{
                href: '#',
                label:
                  <button
                    onClick={() => { openDefaultModal('introForm') }}
                    className="header-phone">

                    <span
                      className="header-phone__link">
                      8 495 777-11-97
                    </span>
                  </button>
              }}
            />
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
      <div className={`services-menu js-services-menu relative ${servicesMenuActive && 'active'}`}>

        <div className="services-menu__wrapper select-none">
          <AppNavigation />
        </div>


        <button
          onClick={(e) => {
            e.preventDefault();
            handleNavMenu();
          }}
          className="close !top-[10px] !right-[30px]">
          <div className="in">
            <div className="close-button-block"></div>
            <div className="close-button-block"></div>
          </div>
          <div className="out">
            <div className="close-button-block"></div>
            <div className="close-button-block"></div>
          </div>
        </button>

      </div>
    </>
  );
};

export default AppHeader;