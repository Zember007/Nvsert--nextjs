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
        <div className="px-[20px] header__wrapper">

          <div className="flex items-center">
            <AppLogo />

            <div className={`header__menu`}>
              <nav className="header-nav">
                <ul className="header-nav__list">
                  <li className="w-full">
                    <AppMenuItem
                      isActive={pathname === '/'} item={{ href: "/", label: t('navigation.main') }} />
                  </li>
                  <li className="w-full group">
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
                  <li className="w-full">
                    <AppMenuItem
                      isActive={pathname.includes('/o-kompanii')} item={{ href: "/about/o-kompanii/", label: t('navigation.about') }} />

                  </li>
                  <li className="w-full">
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
          </div>

          <div className="hidden xl:flex gap-[8px]">
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
            <button
              type="button"
              aria-label="Order phone"
              onClick={() => { openDefaultModal('introForm') }}
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.8975 3.51879C23.8079 3.46583 23.7293 3.39497 23.6661 3.31029C23.603 3.2256 23.5566 3.12877 23.5296 3.02536C23.5026 2.92195 23.4955 2.81402 23.5088 2.70776C23.5221 2.6015 23.5554 2.49903 23.607 2.40623C23.6585 2.31344 23.7272 2.23216 23.8091 2.16707C23.8909 2.10198 23.9844 2.05438 24.084 2.02699C24.1837 1.9996 24.2875 1.99297 24.3896 2.00749C24.4918 2.02201 24.5901 2.05738 24.679 2.11157C24.8958 2.24156 25.1026 2.3824 25.2996 2.53406C26.579 3.51488 27.4777 4.94018 27.8324 6.55114C28.1872 8.1621 27.9745 9.85192 27.233 11.3138C27.1337 11.4995 26.9684 11.6374 26.7725 11.6979C26.5766 11.7584 26.3656 11.7367 26.1849 11.6374C26.0042 11.5382 25.8681 11.3693 25.8057 11.1669C25.7433 10.9645 25.7597 10.7449 25.8513 10.5549C26.4637 9.347 26.6024 7.93944 26.2381 6.62758C25.8738 5.31572 25.0349 4.20153 23.8975 3.51879ZM22.3345 6.33323C22.2449 6.28027 22.1662 6.20941 22.1031 6.12473C22.0399 6.04005 21.9935 5.94321 21.9665 5.83981C21.9395 5.7364 21.9324 5.62846 21.9457 5.5222C21.959 5.41595 21.9924 5.31347 22.0439 5.22068C22.0955 5.12788 22.1641 5.0466 22.246 4.98152C22.3279 4.91643 22.4213 4.86882 22.521 4.84143C22.6206 4.81405 22.7245 4.80742 22.8266 4.82193C22.9287 4.83645 23.0271 4.87182 23.116 4.92601C23.8793 5.38402 24.4494 6.12332 24.7134 6.99753C24.9774 7.87174 24.9161 8.81713 24.5415 9.64654C24.4532 9.84156 24.294 9.99212 24.0989 10.0651C23.9038 10.1381 23.6889 10.1275 23.5013 10.0357C23.3137 9.94393 23.1689 9.77842 23.0987 9.57562C23.0285 9.37281 23.0386 9.14932 23.1269 8.95431C23.3346 8.49362 23.3684 7.96869 23.2216 7.48335C23.0749 6.998 22.7583 6.58757 22.3345 6.33323ZM7.1026 26.4812C7.19219 26.5342 7.27083 26.605 7.33398 26.6897C7.39713 26.7744 7.44354 26.8712 7.47054 26.9746C7.49755 27.078 7.50461 27.186 7.49133 27.2922C7.47804 27.3985 7.44467 27.501 7.39314 27.5938C7.3416 27.6866 7.27292 27.7678 7.19105 27.8329C7.10917 27.898 7.01573 27.9456 6.91608 27.973C6.81644 28.0004 6.71257 28.007 6.61045 27.9925C6.50834 27.978 6.40999 27.9426 6.32107 27.8884C4.83356 26.9954 3.73659 25.5381 3.26039 23.8224C2.78419 22.1066 2.96578 20.2658 3.76706 18.6862C3.81368 18.5896 3.8784 18.5035 3.95743 18.4332C4.03645 18.3628 4.12819 18.3096 4.22727 18.2766C4.32634 18.2436 4.43075 18.2315 4.53438 18.241C4.63802 18.2505 4.73878 18.2814 4.83077 18.3319C4.92275 18.3825 5.00411 18.4516 5.07007 18.5352C5.13603 18.6188 5.18527 18.7153 5.21489 18.819C5.24451 18.9227 5.25392 19.0315 5.24257 19.139C5.23122 19.2465 5.19934 19.3506 5.14879 19.4451C4.53636 20.653 4.39775 22.0606 4.76203 23.3724C5.12631 24.6843 5.96517 25.7985 7.1026 26.4812ZM8.66564 23.6668C8.75524 23.7197 8.83387 23.7906 8.89702 23.8753C8.96017 23.96 9.00658 24.0568 9.03359 24.1602C9.06059 24.2636 9.06766 24.3715 9.05437 24.4778C9.04109 24.5841 9.00772 24.6865 8.95618 24.7793C8.90465 24.8721 8.83597 24.9534 8.75409 25.0185C8.67222 25.0836 8.57877 25.1312 8.47913 25.1586C8.37948 25.186 8.27561 25.1926 8.1735 25.1781C8.07138 25.1635 7.97303 25.1282 7.88412 25.074C7.12076 24.616 6.55065 23.8767 6.28666 23.0025C6.02267 22.1283 6.08404 21.1829 6.45862 20.3535C6.54692 20.1584 6.70612 20.0079 6.90119 19.9349C7.09627 19.8619 7.31125 19.8725 7.49883 19.9643C7.68641 20.0561 7.83123 20.2216 7.90144 20.4244C7.97164 20.6272 7.96147 20.8507 7.87318 21.0457C7.66552 21.5064 7.63173 22.0313 7.77847 22.5167C7.92521 23.002 8.24181 23.4124 8.66564 23.6668ZM15.7712 3.73979C16.1611 3.63028 16.568 3.6024 16.9682 3.65777C17.3685 3.71314 17.7542 3.85065 18.103 4.06231C18.4517 4.27398 18.7565 4.55558 18.9997 4.89075C19.2428 5.22592 19.4195 5.60798 19.5194 6.01474L23.216 20.5972C23.6584 22.3359 22.6752 24.1559 21.0043 24.6287L15.2398 26.2635C14.8501 26.3727 14.4433 26.4004 14.0432 26.3449C13.6431 26.2894 13.2576 26.1519 12.909 25.9402C12.5605 25.7286 12.2558 25.4471 12.0128 25.112C11.7697 24.777 11.5931 24.3951 11.4932 23.9885L7.79659 9.40442C7.35581 7.66571 8.33896 5.84574 10.0099 5.37125L15.7712 3.73979ZM15.0085 22.1149C15.0326 22.2179 15.0764 22.3147 15.1372 22.3998C15.1981 22.4848 15.2747 22.5563 15.3626 22.6099C15.4505 22.6636 15.5479 22.6983 15.649 22.7121C15.75 22.7259 15.8527 22.7184 15.951 22.6902L18.7363 21.9004C18.937 21.8424 19.1081 21.7056 19.2134 21.5187C19.3188 21.3319 19.35 21.1098 19.3006 20.8994C19.2764 20.7965 19.2327 20.6996 19.1718 20.6146C19.111 20.5296 19.0343 20.4581 18.9464 20.4045C18.8585 20.3508 18.7612 20.3161 18.6601 20.3023C18.559 20.2885 18.4563 20.2959 18.3581 20.3242L15.5743 21.1123C15.373 21.1699 15.2012 21.3069 15.0956 21.4942C14.9899 21.6814 14.9586 21.9041 15.0085 22.1149Z" fill="white" />
              </svg>

            </button>

            <button
              type="button"
              className="relative w-[30px] h-[15px] px-[3.5px] flex items-center justify-center z-50"
              onClick={burgerHandler}
              aria-label="Toggle menu"
            >
              <div className="relative w-[24px] h-[15px] flex flex-col justify-between items-center pointer-events-none">
                <span
                  className={`rounded-[4px] block h-[3px] w-full bg-white transition-transform duration-300 ease-in-out ${burgerMenuActive ? 'rotate-45 translate-y-[6px]' : ''
                    }`}
                ></span>
                <span
                  className={`rounded-[4px] block h-[3px] w-full bg-white transition-all duration-300 ease-in-out ${burgerMenuActive ? 'opacity-0' : ''
                    }`}
                ></span>
                <span
                  className={`rounded-[4px] block h-[3px] w-full bg-white transition-transform duration-300 ease-in-out ${burgerMenuActive ? '-rotate-45 -translate-y-[6px]' : ''
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