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

      <div className={`border border-solid border-[#FFF] w-[385px] header__bg !backdrop-blur-0 gap-[8px] l:!flex !hidden mix-blend-difference fixed h-[49px] top-[2px] right-[193.5px] z-[51] `}>
        <AppMenuItem
          onClick={() => {
            navigator.clipboard.writeText('info@nvsert.ru')
          }}
          className="!px-[35px] group"
          item={{
            href: '#', label:
              <>
                <span className="transition-all duration-200 ease block xl:group-hover:-translate-x-[16px]">info@nvsert.ru</span>
                <svg
                  className="xl:absolute top-1/2 transition-all duration-200 ease right-[-1px] xl:translate-x-full  xl:-translate-y-1/2 translate-x-0 group-hover:translate-x-0 group-hover:right-[15px]"
                  width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.84615 8.15385C5.84615 7.54181 6.08929 6.95484 6.52206 6.52206C6.95484 6.08929 7.54181 5.84615 8.15385 5.84615H9.53846V10C9.53846 10.3031 9.59815 10.6031 9.71412 10.8831C9.8301 11.1631 10.0001 11.4175 10.2144 11.6318C10.6471 12.0646 11.2341 12.3077 11.8462 12.3077H19.2308C19.5338 12.3077 19.8339 12.248 20.1139 12.132C20.3939 12.0161 20.6483 11.8461 20.8626 11.6318C21.0768 11.4175 21.2468 11.1631 21.3628 10.8831C21.4788 10.6031 21.5385 10.3031 21.5385 10V5.88308C21.9995 5.96752 22.4238 6.19032 22.7551 6.52185L25.4782 9.24492C25.6924 9.45926 25.8624 9.7137 25.9783 9.99372C26.0943 10.2737 26.1539 10.5739 26.1538 10.8769V23.8462C26.154 24.3781 25.9703 24.8938 25.6338 25.306C25.2974 25.7181 24.8289 26.0013 24.3077 26.1077V18.3077C24.3077 17.6957 24.0646 17.1087 23.6318 16.6759C23.199 16.2431 22.612 16 22 16H10C9.38796 16 8.80099 16.2431 8.36822 16.6759C7.93544 17.1087 7.69231 17.6957 7.69231 18.3077V26.1077C7.17106 26.0013 6.70259 25.7181 6.36617 25.306C6.02975 24.8938 5.84605 24.3781 5.84615 23.8462V8.15385ZM9.53846 26.1538V18.3077C9.53846 18.1853 9.58709 18.0679 9.67364 17.9813C9.7602 17.8948 9.87759 17.8462 10 17.8462H22C22.1224 17.8462 22.2398 17.8948 22.3264 17.9813C22.4129 18.0679 22.4615 18.1853 22.4615 18.3077V26.1538H9.53846ZM19.6923 5.84615V10C19.6923 10.1224 19.6437 10.2398 19.5571 10.3264C19.4706 10.4129 19.3532 10.4615 19.2308 10.4615H11.8462C11.7237 10.4615 11.6064 10.4129 11.5198 10.3264C11.4332 10.2398 11.3846 10.1224 11.3846 10V5.84615H19.6923ZM8.15385 4C7.05218 4 5.99563 4.43764 5.21663 5.21663C4.43764 5.99563 4 7.05218 4 8.15385V23.8462C4 24.9478 4.43764 26.0044 5.21663 26.7834C5.99563 27.5624 7.05218 28 8.15385 28H23.8462C24.9478 28 26.0044 27.5624 26.7834 26.7834C27.5624 26.0044 28 24.9478 28 23.8462V10.8769C28 10.3314 27.8926 9.79128 27.6838 9.28731C27.4751 8.78334 27.1691 8.32542 26.7834 7.93969L24.0603 5.21662C23.6746 4.8309 23.2167 4.52493 22.7127 4.31618C22.2087 4.10743 21.6686 4 21.1231 4H8.15385Z" fill="#FFF" />
                </svg>

              </>
          }} isActive={false} />

        <AppMenuItem
          item={{
            href: filterPhone('8 495 777-11-97'), label: '8 495 777-11-97'
          }} isActive={false} />
      </div>

      <div className="z-[51] !backdrop-blur-0 header__bg min-w-[190px] xl:!flex !hidden fixed mix-blend-difference border border-solid border-[#FFF] h-[49px] top-[2px] left-[2px]">
          <AppLogo
            className={`xl:mx-auto ${burgerMenuActive ? '!text-[#000]' : ''}`}
          />
        </div>

      <Link
        href={filterPhone('8 495 777-11-97')}
        className={`border border-solid border-[#FFF] l:!hidden !backdrop-blur-0 ${burgerMenuActive ? 'active' : 'mix-blend-difference'} header__bg fixed h-[49px] top-[2px] right-[60px] z-[51] `}
      >

        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.82667 13.3867C9.74667 17.16 12.84 20.24 16.6133 22.1733L19.5467 19.24C19.9067 18.88 20.44 18.76 20.9067 18.92C22.4 19.4133 24.0133 19.68 25.6667 19.68C26.4 19.68 27 20.28 27 21.0133V25.6667C27 26.4 26.4 27 25.6667 27C13.1467 27 3 16.8533 3 4.33333C3 3.6 3.6 3 4.33333 3H9C9.73333 3 10.3333 3.6 10.3333 4.33333C10.3333 6 10.6 7.6 11.0933 9.09333C11.24 9.56 11.1333 10.08 10.76 10.4533L7.82667 13.3867Z" fill={burgerMenuActive ? "black" : "white"} />
        </svg>


      </Link>
      <header className={`header ${(servicesMenuActive || burgerMenuActive) ? 'active' : ''}`}>

        <div className="header__bg min-w-[190px] xl:grow-0 grow xl:opacity-0">
          <AppLogo
            className={`xl:mx-auto ${burgerMenuActive ? '!text-[#000]' : ''}`}
          />
        </div>

        <div className={`header__menu header__bg`}>
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

        </div>

        <div className="hidden xl:flex gap-[2px]">
          <div className="w-[385px]"></div>
          <div className="header__bg w-[190px]">
            <AppMenuItem
              className="mx-auto"
              onClick={() => {
                openDefaultModal('introForm')
              }}
              item={{
                href: '#', label: t('navigation.order')
              }} isActive={false} />
          </div>
        </div>
        <div className=" xl:hidden flex gap-[2px]">
          <div className="w-[52px]"></div>
          <div className="header__bg">
            <button
              type="button"
              className="relative  w-[34px] h-[30px] py-[3px] flex items-center justify-center z-50"
              onClick={burgerHandler}
              aria-label="Toggle menu"
            >
              <div className={`${burgerMenuActive ? '*:bg-black' : '*:bg-white'} relative w-[34px] h-[24px] flex  flex-col justify-between items-center pointer-events-none`}>
                <span
                  className={`rounded-[8px] block h-[4px] w-full  transition-transform duration-300 ease-in-out ${burgerMenuActive ? 'rotate-45 translate-y-[10px]' : ''
                    }`}
                ></span>
                <span
                  className={`rounded-[8px] block h-[4px] w-full  transition-all duration-300 ease-in-out ${burgerMenuActive ? 'opacity-0' : ''
                    }`}
                ></span>
                <span
                  className={`rounded-[8px] block h-[4px] w-full  transition-transform duration-300 ease-in-out ${burgerMenuActive ? '-rotate-45 -translate-y-[10px]' : ''
                    }`}
                ></span>
              </div>
            </button>
          </div>
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