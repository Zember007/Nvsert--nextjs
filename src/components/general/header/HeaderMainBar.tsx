import React from "react";
import AppLogo from "../AppLogo";
import AppMenuItem from "../AppMenuItem";
import { useTranslation } from "react-i18next";

interface HeaderMainBarProps {
  pathname: string;
  servicesMenuActive: boolean;
  burgerMenuActive: boolean;
  onServicesToggle: () => void;
  onOpenOrder: () => void;
  onBurgerToggle: () => void;
}

const HeaderMainBar: React.FC<HeaderMainBarProps> = ({
  pathname,
  servicesMenuActive,
  burgerMenuActive,
  onServicesToggle,
  onOpenOrder,
  onBurgerToggle,
}) => {
  return (
    <header
      className={`header ${
        servicesMenuActive || burgerMenuActive ? "active" : ""
      }`}
    >
      <InlineLogo burgerMenuActive={burgerMenuActive} />

      <div className="header__menu header__bg ">
        <HeaderNav
          pathname={pathname}
          servicesMenuActive={servicesMenuActive}
          onServicesToggle={onServicesToggle}
        />
      </div>

      <DesktopOrderButton onOpenOrder={onOpenOrder} />

      <MobileBurgerButton
        burgerMenuActive={burgerMenuActive}
        onBurgerToggle={onBurgerToggle}
      />
    </header>
  );
};

export default HeaderMainBar;

interface InlineLogoProps {
  burgerMenuActive: boolean;
}

const InlineLogo: React.FC<InlineLogoProps> = ({ burgerMenuActive }) => {
  return (
    <div className="header__bg min-w-[192px] xl:grow-0 grow xl:opacity-0 !px-[20px]">
      <AppLogo
        className={`xl:mx-auto ${burgerMenuActive ? "!text-[#000]" : ""}`}
      />
    </div>
  );
};

interface HeaderNavProps {
  pathname: string;
  servicesMenuActive: boolean;
  onServicesToggle: () => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({
  pathname,
  servicesMenuActive,
  onServicesToggle,
}) => {
  const { t } = useTranslation();

  return (
    <nav className="header-nav">
      <ul className="header-nav__list">
        <li>
          <AppMenuItem
            isActive={pathname === "/"}
            item={{ href: "/", label: t("navigation.main") }}
          />
        </li>
        <li className="group">
          <AppMenuItem
            isActive={servicesMenuActive}
            onClick={(e) => {
              e.preventDefault();
              onServicesToggle();
            }}
            item={{
              href: "#",
              label: (
                <span className="gap-[4px] flex items-center ">
                  {t("navigation.services")}

                  <svg
                    className={`transition-all duration-300 ${
                      servicesMenuActive ? " rotate-[180deg]" : ""
                    }`}
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.29564 0.25L6.76422 5.5135L5.75422 6.48562L0.285645 1.22213L1.29564 0.25ZM10.5438 0.25L11.5538 1.22213L8.54084 4.02093L7.53084 3.04812L10.5438 0.25Z"
                      fill="white"
                    />
                  </svg>
                </span>
              ),
            }}
          />
        </li>
        <li>
          <AppMenuItem
            isActive={pathname.includes("/about")}
            item={{ href: "/about/", label: t("navigation.about") }}
          />
        </li>
        <li>
          <AppMenuItem
            isActive={pathname.includes("/contacts")}
            item={{ href: "/contacts/", label: t("navigation.contacts") }}
          />
        </li>
      </ul>
    </nav>
  );
};

interface DesktopOrderButtonProps {
  onOpenOrder: () => void;
}

const DesktopOrderButton: React.FC<DesktopOrderButtonProps> = ({
  onOpenOrder,
}) => {
  const { t } = useTranslation();

  return (
    <div className=" hidden xl:flex gap-[2px]">
      <div className="w-[368px]"></div>
      <div className="header__bg w-[192px] !backdrop-filter-none  mix-blend-difference  h-full">
        <AppMenuItem
          className="mx-auto w-[170px] "
          onClick={onOpenOrder}
          item={{
            href: "#",
            label: t("navigation.order"),
          }}
          isActive={false}
        />
      </div>
    </div>
  );
};

interface MobileBurgerButtonProps {
  burgerMenuActive: boolean;
  onBurgerToggle: () => void;
}

const MobileBurgerButton: React.FC<MobileBurgerButtonProps> = ({
  burgerMenuActive,
  onBurgerToggle,
}) => {
  return (
    <div className=" xl:hidden flex gap-[2px]">
      <div className="w-[50px]"></div>
      <div className="header__bg !p-0 w-[50px] justify-center">
        <button
          type="button"
          className={`relative ${
            burgerMenuActive ? "w-[34px]" : "w-[30px]"
          }  h-[30px] py-[3px] flex items-center justify-center z-50`}
          onClick={onBurgerToggle}
          aria-label="Toggle menu"
        >
          <span
            className={`${
              burgerMenuActive ? "*:bg-black w-[34px]" : "*:bg-white w-[30px]"
            } relative  h-[24px] flex  flex-col justify-between items-center pointer-events-none`}
          >
            <span
              className={`rounded-[8px] block h-[4px] w-full  transition-transform duration-300 ease-in-out ${
                burgerMenuActive ? "rotate-45 translate-y-[10px]" : ""
              }`}
            ></span>
            <span
              className={`rounded-[8px] block h-[4px] w-full  transition-all duration-300 ease-in-out ${
                burgerMenuActive ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`rounded-[8px] block h-[4px] w-full  transition-transform duration-300 ease-in-out ${
                burgerMenuActive ? "-rotate-45 -translate-y-[10px]" : ""
              }`}
            ></span>
          </span>
        </button>
      </div>
    </div>
  );
};


