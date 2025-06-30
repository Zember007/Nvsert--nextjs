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
import { filterPhone } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useAnimation, motion } from "framer-motion";
import NavSvg from "./elements/NavSvg";
import { RootState } from "@/config/store";
import HeaderMenu from "./elements/HeaderMenu";




const AppHeader = () => {
  const { makeDefaultHeader, makeTransparentHeader, openDefaultModal, darkHeader } = useHeaderContext();
  const { navigation } = useSelector((state: RootState) => state.navigation);

  const pathname = usePathname();
  const [servicesMenuActive, setServicesMenuActive] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);


  const { setButtonRef, setWrapperRef } = useButton()

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const controls = useAnimation();
  const defaultSettings = {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [-50, 0, -20, 0, 0],
  };

  const animation = () => {
    controls.start({
      y: defaultSettings.openY, // Используем openY для отскока
      transition: {
        duration: defaultSettings.duration,
        ease: defaultSettings.ease,
        times: defaultSettings.times,
        delay: 0.2
      }
    });
  }

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






  useEffect(() => {
    if (servicesMenuActive) {
      animation()
    }
  }, [servicesMenuActive])




  return (
    <>
      <header className={`header xl:py-[5px] ${(servicesMenuActive || burgerMenuActive) ? 'active' : ''}`}>

        <AppLogo />

        <div className={`header__menu`}>
          <nav className="header-nav">
            <ul className="header-nav__list">
              <li >
                <AppMenuItem
                  isActive={pathname === '/'} item={{ href: "/", label: t('navigation.main') }} />
              </li>
              <li className="group">
                <AppMenuItem
                  isActive={servicesMenuActive}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavMenu();
                  }}
                  item={{
                    href: '#',
                    label: <span className={`gap-[4px] flex items-center `}>
                      {t('navigation.services')}

                      <svg className={`transition-all duration-300 easy *:*:transition-all *:*:duration-300 *:*:easy *:*:stroke-[var(--color-item-menu)] group-hover:*:*:!stroke-[var(--color-item-menu-active)] ${servicesMenuActive ? '*:!stroke-[var(--color-item-menu-active)] rotate-[180deg]' : ''}`} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3424_2610)">
                          <path d="M1 11L8 4L15 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_3424_2610">
                            <rect width="16" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                    </span>
                  }}
                />
              </li>
              <li >
                <AppMenuItem
                  isActive={pathname.includes('/o-kompanii')} item={{ href: "/about/o-kompanii/", label: t('navigation.about') }} />

              </li>
              <li >
                <AppMenuItem
                  isActive={pathname.includes('/contacts')} item={{ href: "/contacts/", label: t('navigation.contacts') }} />

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

        <div className="header__bg hidden xl:flex gap-[8px]">
          <AppMenuItem
            className="!px-[31px] group"
            onClick={() => {
              openDefaultModal('introForm')
            }}
            item={{
              href: '#', label:
                <>
                  <svg className="absolute top-1/2 transition-all  ease -translate-y-1/2 left-[-1px] -translate-x-full group-hover:translate-x-0 group-hover:left-[15px]" width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3131 2.2547C17.2388 2.21095 17.1737 2.15241 17.1214 2.08245C17.0691 2.01249 17.0306 1.93249 17.0082 1.84707C16.9859 1.76164 16.98 1.67247 16.991 1.58469C17.002 1.49691 17.0297 1.41225 17.0724 1.3356C17.1151 1.25894 17.172 1.19179 17.2398 1.13802C17.3076 1.08425 17.385 1.04492 17.4676 1.0223C17.5502 0.99967 17.6362 0.994196 17.7208 1.00619C17.8054 1.01818 17.8869 1.0474 17.9606 1.09217C18.1401 1.19956 18.3115 1.3159 18.4746 1.44119C19.5346 2.25147 20.2792 3.42893 20.5731 4.75977C20.867 6.09061 20.6908 7.48659 20.0765 8.69424C19.9942 8.84767 19.8572 8.96158 19.6949 9.01155C19.5326 9.06153 19.3579 9.0436 19.2081 8.96161C19.0584 8.87962 18.9456 8.74008 18.894 8.57292C18.8423 8.40575 18.8559 8.22426 18.9318 8.06734C19.4391 7.06947 19.554 5.90667 19.2522 4.82292C18.9504 3.73917 18.2554 2.81872 17.3131 2.2547ZM16.0181 4.57975C15.9439 4.536 15.8788 4.47746 15.8264 4.4075C15.7741 4.33754 15.7357 4.25755 15.7133 4.17212C15.6909 4.0867 15.6851 3.99753 15.6961 3.90975C15.7071 3.82197 15.7347 3.73731 15.7774 3.66065C15.8201 3.58399 15.877 3.51685 15.9449 3.46308C16.0127 3.40931 16.0901 3.36998 16.1727 3.34735C16.2552 3.32473 16.3413 3.31925 16.4259 3.33124C16.5105 3.34324 16.5919 3.37246 16.6656 3.41722C17.298 3.79559 17.7703 4.40634 17.9891 5.12853C18.2078 5.85073 18.1569 6.63174 17.8466 7.31693C17.7734 7.47803 17.6416 7.60241 17.4799 7.66271C17.3183 7.723 17.1402 7.71427 16.9848 7.63844C16.8294 7.5626 16.7094 7.42588 16.6513 7.25834C16.5931 7.0908 16.6015 6.90616 16.6747 6.74506C16.8467 6.36448 16.8747 5.93083 16.7531 5.52988C16.6316 5.12892 16.3693 4.78986 16.0181 4.57975ZM3.3989 21.2243C3.47313 21.2681 3.53828 21.3266 3.5906 21.3966C3.64291 21.4665 3.68137 21.5465 3.70374 21.6319C3.72611 21.7174 3.73196 21.8065 3.72096 21.8943C3.70995 21.9821 3.6823 22.0667 3.63961 22.1434C3.59691 22.2201 3.54001 22.2872 3.47218 22.341C3.40435 22.3948 3.32693 22.4341 3.24438 22.4567C3.16183 22.4793 3.07577 22.4848 2.99117 22.4728C2.90657 22.4608 2.82509 22.4316 2.75143 22.3868C1.51906 21.6491 0.610246 20.4452 0.215726 19.0278C-0.178793 17.6104 -0.0283471 16.0897 0.635491 14.7848C0.674116 14.7049 0.727735 14.6338 0.793206 14.5757C0.858676 14.5176 0.93468 14.4736 1.01676 14.4464C1.09884 14.4191 1.18534 14.4091 1.2712 14.4169C1.35706 14.4248 1.44054 14.4503 1.51675 14.4921C1.59295 14.5338 1.66036 14.5909 1.715 14.66C1.76965 14.7291 1.81044 14.8088 1.83498 14.8944C1.85952 14.9801 1.86732 15.07 1.85791 15.1588C1.84851 15.2476 1.8221 15.3336 1.78022 15.4117C1.27284 16.4095 1.158 17.5723 1.4598 18.6561C1.7616 19.7398 2.45657 20.6603 3.3989 21.2243ZM4.69385 18.8993C4.76808 18.943 4.83322 19.0015 4.88554 19.0715C4.93786 19.1415 4.97631 19.2215 4.99868 19.3069C5.02105 19.3923 5.02691 19.4815 5.0159 19.5693C5.00489 19.657 4.97725 19.7417 4.93455 19.8184C4.89186 19.895 4.83496 19.9622 4.76713 20.0159C4.6993 20.0697 4.62188 20.109 4.53932 20.1317C4.45677 20.1543 4.37072 20.1598 4.28612 20.1478C4.20152 20.1358 4.12004 20.1065 4.04637 20.0618C3.41395 19.6834 2.94163 19.0727 2.72292 18.3505C2.50421 17.6283 2.55505 16.8473 2.86538 16.1621C2.93854 16.001 3.07043 15.8766 3.23205 15.8163C3.39366 15.756 3.57176 15.7647 3.72717 15.8406C3.88258 15.9164 4.00256 16.0531 4.06072 16.2207C4.11888 16.3882 4.11046 16.5728 4.03731 16.7339C3.86527 17.1145 3.83727 17.5482 3.95885 17.9491C4.08042 18.3501 4.34271 18.6891 4.69385 18.8993ZM10.5807 2.43726C10.9036 2.3468 11.2407 2.32377 11.5724 2.36951C11.904 2.41525 12.2235 2.52885 12.5125 2.70371C12.8014 2.87857 13.0539 3.1112 13.2553 3.38809C13.4568 3.66498 13.6032 3.98061 13.6859 4.31664L16.7485 16.3634C17.115 17.7998 16.3004 19.3033 14.9161 19.694L10.1404 21.0444C9.8175 21.1347 9.48053 21.1576 9.14905 21.1117C8.81757 21.0659 8.49818 20.9522 8.20941 20.7774C7.92063 20.6026 7.66824 20.37 7.46688 20.0932C7.26551 19.8164 7.11919 19.5009 7.0364 19.165L3.97386 7.11691C3.60868 5.68053 4.4232 4.17703 5.8075 3.78504L10.5807 2.43726ZM9.94873 17.6172C9.96873 17.7023 10.005 17.7823 10.0554 17.8526C10.1058 17.9228 10.1693 17.9818 10.2421 18.0262C10.315 18.0705 10.3956 18.0992 10.4794 18.1106C10.5631 18.122 10.6482 18.1158 10.7296 18.0925L13.0372 17.4401C13.2034 17.3922 13.3452 17.2791 13.4325 17.1247C13.5197 16.9704 13.5456 16.7869 13.5046 16.6131C13.4846 16.5281 13.4484 16.4481 13.398 16.3778C13.3476 16.3076 13.2841 16.2485 13.2112 16.2042C13.1384 16.1599 13.0577 16.1312 12.974 16.1198C12.8903 16.1084 12.8052 16.1146 12.7238 16.1379L10.4175 16.789C10.2507 16.8366 10.1084 16.9498 10.0209 17.1044C9.93334 17.2591 9.90745 17.4431 9.94873 17.6172Z" fill={darkHeader ? '#000' : "#fff"} />
                  </svg>
                  <span className={`transition-transform block group-hover:translate-x-[15px]`}>
                    {t('navigation.order')}
                  </span>
                </>
            }} isActive={false} />
          <AppMenuItem
            item={{
              href: filterPhone('8 495 777-11-97'), label: '8 495 777-11-97'
            }} isActive={false} />
        </div>
        <div className=" xl:hidden flex gap-[24px] items-center">
          <Link
            href={filterPhone('8 495 777-11-97')}
          >

            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.82667 13.3867C9.74667 17.16 12.84 20.24 16.6133 22.1733L19.5467 19.24C19.9067 18.88 20.44 18.76 20.9067 18.92C22.4 19.4133 24.0133 19.68 25.6667 19.68C26.4 19.68 27 20.28 27 21.0133V25.6667C27 26.4 26.4 27 25.6667 27C13.1467 27 3 16.8533 3 4.33333C3 3.6 3.6 3 4.33333 3H9C9.73333 3 10.3333 3.6 10.3333 4.33333C10.3333 6 10.6 7.6 11.0933 9.09333C11.24 9.56 11.1333 10.08 10.76 10.4533L7.82667 13.3867Z" fill="white" />
            </svg>


          </Link>

          <button
            type="button"
            className="relative w-[34px] h-[30px] py-[3px] flex items-center justify-center z-50"
            onClick={burgerHandler}
            aria-label="Toggle menu"
          >
            <div className="relative w-[34px] h-[24px] flex flex-col justify-between items-center pointer-events-none">
              <span
                className={`rounded-[8px] block h-[4px] w-full bg-white transition-transform duration-300 ease-in-out ${burgerMenuActive ? 'rotate-45 translate-y-[10px]' : ''
                  }`}
              ></span>
              <span
                className={`rounded-[8px] block h-[4px] w-full bg-white transition-all duration-300 ease-in-out ${burgerMenuActive ? 'opacity-0' : ''
                  }`}
              ></span>
              <span
                className={`rounded-[8px] block h-[4px] w-full bg-white transition-transform duration-300 ease-in-out ${burgerMenuActive ? '-rotate-45 -translate-y-[10px]' : ''
                  }`}
              ></span>
            </div>
          </button>
        </div>

      </header>
      <HeaderMenu
        active={burgerMenuActive}
      />
      <div className={`services-menu-box menu-headers  ${servicesMenuActive && 'active'} ${darkHeader && 'dark'}`}>
        <div className={`services-menu !py-[12px] js-services-menu relative `}>

          <div className="services-menu__wrapper select-none">
            <div className="grid grid-cols-6 h-[50px] w-full gap-[30px]">
              {navigation.map((item, i) => (
                <div ref={setWrapperRef} key={i} className="tariff-wrap border border-solid hover:border-[#000] border-[transparent]">
                  <Link ref={setButtonRef} href={item.full_slug} className={`tariff tariff-inset not-backdrop rounded-[4px] group bdark  `}>
                    <div className={`relative z-[-2] transition-all h-full   overflow-hidden`}>
                      <p className={`transition-all whitespace-nowrap left-1/2 -translate-x-1/2 absolute top-1/2 -translate-y-1/2 group-hover:translate-x-0 group-hover:left-[13px] text-[18px] ${darkHeader ? 'text-[#000]' : 'text-[#FFF]'}`}>{t(`navigation.${item.title}.title`)}</p>
                      <div className="absolute z-[10] top-1/2 -translate-y-1/2 right-0 group-hover:translate-x-0 transition-all p-[13px] translate-x-full">
                        <NavSvg />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className={`services-menu-box ${servicesMenuActive && 'active'} ${darkHeader && 'dark'}`}>
        <motion.div
          animate={controls}
          className=" relative"
        >
          <div
            className={`services-menu !backdrop-blur-[20px] py-[20px] pt-[30px] js-services-menu relative ${servicesMenuActive && 'active'}`}>
            <div className="services-menu__wrapper select-none">
              <AppNavigation active={servicesMenuActive} />
            </div>


          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AppHeader;