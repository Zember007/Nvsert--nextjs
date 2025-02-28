import { useEffect, useState } from "react";
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

  return (
    <div className={`${burgerMenuActive && 'transparent-header'}`}>
      <header className="header">
        <div className="wrapper header__wrapper">
          <AppLogo />
          <div className={`header__menu js-header-menu ${burgerMenuActive && 'active'}`}>
            <nav className="header-nav">
              <ul className="header-nav__list">
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
          <Link
            href="/find-out-cost/"
            className="btn btn--primary btn--m header__calc-link"
          >
            {t('calculation.name')}
          </Link>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;