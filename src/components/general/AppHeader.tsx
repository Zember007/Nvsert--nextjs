import { useEffect, useLayoutEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import '@/assets/styles/sections/_header.scss'
import Link from "next/link";
import { useTranslation } from "react-i18next";

import AppLogo from "./AppLogo";
import { AppNavigation } from "./AppNavigation";
import { usePathname } from "next/navigation";
import { disableOverflow, enableOverflow } from "@/store/body";
import { useHeaderContext } from "../contexts/HeaderContext";
import AppMenuItem from "./AppMenuItem";
import { filterPhone } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useAnimation, motion } from "framer-motion";
import { AppDispatch, RootState } from "@/config/store";
import HeaderMenu from "./elements/HeaderMenu";




const AppHeader = () => {
  const { openDefaultModal, handleCopy } = useHeaderContext();
  const { services } = useSelector((state: RootState) => state.navigation);

  const pathname = usePathname();
  const [servicesMenuActive, setServicesMenuActive] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);


  const { setButtonRef, setWrapperRef } = useButton()

  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();


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
        ease: [0.34, 1.56, 0.64, 1] as const,
        times: defaultSettings.times,
        delay: 0.2
      }
    });
  }

  function handleNavMenu() {
    if (servicesMenuActive) {
      setServicesMenuActive(false);
    } else {
      setServicesMenuActive(true);
    }
  }

  function closeNavMenues() {
    setServicesMenuActive(false);
    setBurgerMenuActive(false);
    document.body.style.overflow = '';
    unlockScroll()
    dispatch(disableOverflow());
  }
  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
  }

  function unlockScroll() {
    scrollY = document.body.style.top ? parseInt(document.body.style.top) * -1 : 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, scrollY);
  }
  function burgerHandler() {
    if (!burgerMenuActive) {
      setBurgerMenuActive(true);
      // document.body.style.overflow = 'hidden';
      lockScroll()
    } else {
      setBurgerMenuActive(false);
      unlockScroll()
      dispatch(disableOverflow());
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

      <div className="xl:flex hidden gap-[2px] fixed h-[60px] top-[2px] right-[196px] z-[51] mix-blend-difference">
        <div
          className={`w-[368px] rubik header__bg !backdrop-filter-none gap-[8px] mix-blend-difference  h-full`}>
          <AppMenuItem
            className="w-[160px] !justify-center"
            onClick={(e) => {
              handleCopy('info@nvsert.ru', e)
            }}
            item={{
              href: '#', label: 'info@nvsert.ru'
            }} isActive={false} />

          <AppMenuItem
            className="flex-1 !justify-center"
            item={{
              href: filterPhone('8 800 700-33-75'), label: '8 800 700-33-75'
            }} isActive={false} />
        </div>
      </div>

      <div
        className="z-[51] min-w-[192px] !backdrop-filter-none header__bg  xl:!flex !hidden fixed mix-blend-difference h-[60px] top-[2px] left-[2px]">
        <AppLogo
          className={`xl:mx-auto`}
        />
      </div>

      <Link
        href={filterPhone('8 495 777-11-97')}
        className={` w-[50px] justify-center rubik !p-0  xl:!hidden !backdrop-filter-none ${burgerMenuActive ? 'active' : 'mix-blend-difference'} header__bg fixed h-[50px] top-[2px] right-[58px] z-[51] `}
        aria-label="8 495 777-11-97"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.82667 13.3867C9.74667 17.16 12.84 20.24 16.6133 22.1733L19.5467 19.24C19.9067 18.88 20.44 18.76 20.9067 18.92C22.4 19.4133 24.0133 19.68 25.6667 19.68C26.4 19.68 27 20.28 27 21.0133V25.6667C27 26.4 26.4 27 25.6667 27C13.1467 27 3 16.8533 3 4.33333C3 3.6 3.6 3 4.33333 3H9C9.73333 3 10.3333 3.6 10.3333 4.33333C10.3333 6 10.6 7.6 11.0933 9.09333C11.24 9.56 11.1333 10.08 10.76 10.4533L7.82667 13.3867Z" fill={burgerMenuActive ? '#000' : "#fff"} />
        </svg>



      </Link>
      <header className={`rubik header ${(servicesMenuActive || burgerMenuActive) ? 'active' : ''}`}>

        <div
          className="header__bg min-w-[192px] xl:grow-0 grow xl:opacity-0 !px-[20px]">
          <AppLogo
            className={`xl:mx-auto ${burgerMenuActive ? '!text-[#000]' : ''}`}
          />
        </div>

        <div className={`header__menu header__bg `}>
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

                      <svg
                        className={`transition-all duration-300 ${servicesMenuActive ? ' rotate-[180deg]' : ''}`}
                        width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.29564 0.25L6.76422 5.5135L5.75422 6.48562L0.285645 1.22213L1.29564 0.25ZM10.5438 0.25L11.5538 1.22213L8.54084 4.02093L7.53084 3.04812L10.5438 0.25Z" fill="white" />
                      </svg>

                    </span>
                  }}
                />
              </li>
              <li >
                <AppMenuItem
                  isActive={pathname.includes('/about')} item={{ href: "/about/", label: t('navigation.about') }} />

              </li>
              <li >
                <AppMenuItem
                  isActive={pathname.includes('/contacts')} item={{ href: "/contacts/", label: t('navigation.contacts') }} />

              </li>
            </ul>
          </nav>

        </div>

        <div className=" hidden xl:flex gap-[2px]">
          <div className="w-[368px]"></div>
        <div
            className="header__bg w-[192px] !backdrop-filter-none  mix-blend-difference  h-full">
            <AppMenuItem
              className="mx-auto w-[170px] "
              onClick={() => {
                openDefaultModal('introForm')
              }}
              item={{
                href: '#', label: t('navigation.order')
              }} isActive={false} />
          </div>
        </div>


        <div className=" xl:hidden flex gap-[2px]">
          <div className="w-[50px]"></div>
          <div className="header__bg !p-0 w-[50px] justify-center">
            <button
              type="button"
              className={`relative ${burgerMenuActive ? 'w-[34px]' : 'w-[30px]'}  h-[30px] py-[3px] flex items-center justify-center z-50`}
              onClick={burgerHandler}
              aria-label="Toggle menu"
            >
              <div className={`${burgerMenuActive ? '*:bg-black w-[34px]' : '*:bg-white w-[30px]'} relative  h-[24px] flex  flex-col justify-between items-center pointer-events-none`}>
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
        closeMenu={closeNavMenues}
      />
      <div className={`services-menu-box menu-headers  ${servicesMenuActive && 'active'}`}>
        <div className={`services-menu !py-[5px] js-services-menu relative `}>

          <div className="services-menu__wrapper ">
            <div className="grid grid-cols-6 h-[50px] w-full xxxl:gap-[30px] gap-[8px]">
              {services.map((item, i) => (
                <div ref={setWrapperRef} key={i} className="tariff-wrap ">
                  <Link
                    onClick={() => {
                      handleNavMenu();
                    }}
                    href={`/services#${item.name}`} ref={setButtonRef} className={`text-[#FFF] line-after__box xxl:pl-[5px] h-full text-center btnIconAn transition-all duration-100 active:scale-95 flex !gap-[9px] translate-y-[1px]`}>
                    <p className="text-[18px]  line-after stop-color font-light">
                      {item.title}
                    </p>
                    <div className=" sendIconLeft">
                      <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.66669 8.00011V6.00011H0.666687V8.00011H3.66669ZM9.63436 0.000106812L8.19576 1.43087L12.7759 5.98724H6.66669V8.01196H12.7759L8.19576 12.5683L9.63436 14.0001L16.6667 7.00011L15.9489 6.28473L15.2301 5.56833L9.63436 0.000106812Z" fill="white" />
                      </svg>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className={`services-menu-box ${servicesMenuActive && 'active'}`}>
        <motion.div
          animate={controls}
          className=" relative"
        >
          <div
            className={`services-menu !backdrop-blur-[20px] py-[20px]  js-services-menu relative ${servicesMenuActive && 'active'}`}>
            <div className="services-menu__wrapper">
              <AppNavigation active={servicesMenuActive} />
            </div>


          </div>
        </motion.div>
      </div>
    </>
  );
};

export default memo(AppHeader);