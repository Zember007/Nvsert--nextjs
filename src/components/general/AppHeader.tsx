import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '@/assets/styles/sections/_header.scss'
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { filterPhone } from "@/hook/filter";
import AppLogo from "./AppLogo";
import AppNavigation from "./AppNavigation";
import { usePathname } from "next/navigation";
import { disableOverflow, enableOverflow } from "@/store/body";
import { useHeaderContext } from "../contexts/HeaderContext";
import { RootState } from "@/config/store"; // Импортируйте RootState из вашего хранилища

const AppHeader = () => {
  const { makeDefaultHeader, makeTransparentHeader } = useHeaderContext();

  const pathname = usePathname();
  const [servicesMenuActive, setServicesMenuActive] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [showPhonesDropdown, setShowPhonesDropdown] = useState(false);

  const { configs } = useSelector((state: RootState) => state.config);

  const headerPhone = configs?.find((item) => item.key === 'PHONE_RUSSIA');
  const moscowPhone = configs?.find((item) => item.key === 'PHONE_MOSCOW');
  const spbPhone = configs?.find((item) => item.key === 'PHONE_SPB');

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

  const buttonRefs = useRef<HTMLAnchorElement[]>([]);
  const wrapperRefs = useRef<HTMLDivElement[]>([]);

  const setWrapperRef = (el: HTMLDivElement | null) => {
    if (!el) return
    wrapperRefs.current.push(el)
  }

  const setButtonRef = (el: HTMLAnchorElement | null) => {
    if (!el) return
    buttonRefs.current.push(el)
  }

  useEffect(() => {
    const buttons = buttonRefs.current;
    const wrappers = wrapperRefs.current;

    if (!buttons.length || !wrappers.length) return;

    const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const rotateX = (mouseY / rect.height) * 30 - 15;
      const rotateY = (mouseX / rect.width) * -30 + 15;
      element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      element.style.setProperty("--mouse-x", `${mouseX}px`);
      element.style.setProperty("--mouse-y", `${mouseY}px`);
    };


    const resetTransform = (element: HTMLElement) => {
      element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    buttons.forEach((button, index) => {
      const wrapper = wrappers[index];
      if (!button || !wrapper) return;

      wrapper.addEventListener('mousemove', (e) => handleMouseMove(e, button));
      wrapper.addEventListener('mouseleave', () => resetTransform(button));
      button.addEventListener('focus', () => button.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)');
      button.addEventListener('blur', () => resetTransform(button));
    });

    return () => {
      buttons.forEach((button, index) => {
        const wrapper = wrappers[index];
        if (!button || !wrapper) return;

        wrapper.removeEventListener('mousemove', (e) => handleMouseMove(e, button));
        wrapper.removeEventListener('mouseleave', () => resetTransform(button));
        button.removeEventListener('focus', () => button.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)');
        button.removeEventListener('blur', () => resetTransform(button));
      });
    };
  }, []);

  return (
    <div className={`${burgerMenuActive && 'transparent-header'}`}>
      <header className="header">
        <div className="wrapper header__wrapper">
          <AppLogo />
          <div className={`header__menu js-header-menu ${burgerMenuActive && 'active'}`}>
            <nav className="header-nav">
              <ul className="header-nav__list">
                <li className="header-nav__item">
                  <Link href="/" className="header-nav__link">
                    Главная
                  </Link>
                </li>
                <li className="header-nav__item">
                  <button
                    type="button"
                    className={`header-nav__link services-menu__btn js-services-menu__btn ${servicesMenuActive && 'active'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavMenu();
                    }}
                  >
                    <span className="burger-btn">
                      <span></span>
                    </span>
                    Услуги
                  </button>
                </li>
                <li className="header-nav__item">
                  <Link href="/about/o-kompanii/" className="header-nav__link">
                    {t('navigation.about')}
                  </Link>
                </li>
                <li className="header-nav__item">
                  <Link href="/contacts/" className="header-nav__link">
                    {t('navigation.contacts')}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header__menu-content">
              <h4 className="title">
                Зачем искать что-то самому, если можно заказать расчет?
              </h4>
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
            <div className={`services-menu js-services-menu ${servicesMenuActive && 'active'}`}>
              <div className="wrapper">
                <div className=" py-[30px] px-[18px]  services-menu-bg rounded-[8px]">
                  <div className="services-menu__header">
                    <h2 className="services-menu__title">Услуги</h2>
                    <button
                      className={`services-menu__btn-close js-services-menu__btn ${servicesMenuActive && 'active'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavMenu();
                      }}
                      type="button"
                    >
                      <i className="icon icon--close"></i>
                    </button>
                  </div>
                  <div className="services-menu__wrapper">
                    <AppNavigation />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header-phone">
            {headerPhone && (
              <a href={filterPhone(headerPhone.value)} className="header-phone__link">
                {headerPhone.value}
              </a>
            )}
            {(moscowPhone || spbPhone) && (
              <button
                type="button"
                className={`header-phone__burger ${showPhonesDropdown && 'active'}`}
                onClick={() => {
                  setShowPhonesDropdown(!showPhonesDropdown);
                }}
              ></button>
            )}

            {(moscowPhone || spbPhone) && (
              <div
                className="header-phone__dropdown"
                style={{ display: !showPhonesDropdown ? 'none' : 'block' }}
              >
                {moscowPhone && (
                  <a href={filterPhone(moscowPhone.value)}>
                    {moscowPhone.value} (МСК)
                  </a>
                )}
                {spbPhone && (
                  <a href={filterPhone(spbPhone.value)}>
                    {spbPhone.value} (СПБ)
                  </a>
                )}
              </div>
            )}
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


          <div ref={setWrapperRef} className="tariff-wrap">

            <Link
              ref={setButtonRef}
              href="/find-out-cost/"
              className="tariff py-[13px] px-[24px] bg-[#000000] rounded-[4px] border-solid border border-[#727272] ml-[70px] text-[#FFF] text-[20px] font-bold"
            >
              {t('calculation.name')}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;