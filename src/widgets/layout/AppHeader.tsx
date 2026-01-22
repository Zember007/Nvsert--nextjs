'use client';

import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useHeaderContext } from "shared/contexts";
import { Services } from "@/types/navigation";
import HeaderTopContacts from "./header/HeaderTopContacts";
import HeaderLeftLogo from "./header/HeaderLeftLogo";
import HeaderMobilePhoneLink from "./header/HeaderMobilePhoneLink";
import HeaderMainBar from "./header/HeaderMainBar";
import ServicesQuickLinks from "./header/ServicesQuickLinks";

const DynamicHeaderMenu = dynamic(() => import("./header/HeaderMenu"), {
  ssr: false,
});

const DynamicServicesDropdown = dynamic(() => import("./header/ServicesDropdown"), {
  ssr: false,
});

interface AppHeaderProps {
  services: Services[];
}

const AppHeader: React.FC<AppHeaderProps> = ({ services }) => {
  const { openDefaultModal, handleCopy } = useHeaderContext();
  const pathname = usePathname();

  const [servicesMenuActive, setServicesMenuActive] = useState(false);
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  let scrollY = 0;

  function handleNavMenu() {
    setServicesMenuActive((prev) => !prev);
  }

  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  }

  function unlockScroll() {
    scrollY = document.body.style.top
      ? parseInt(document.body.style.top) * -1
      : 0;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, scrollY);
  }

  function closeNavMenues() {
    setServicesMenuActive(false);
    setBurgerMenuActive(false);
    document.body.style.overflow = "";
    unlockScroll();
  }

  function burgerHandler() {
    if (!burgerMenuActive) {
      setBurgerMenuActive(true);
      lockScroll();
    } else {
      setBurgerMenuActive(false);
      unlockScroll();
    }
  }

  useEffect(() => {
    closeNavMenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <HeaderTopContacts onCopyEmail={handleCopy} />

      <HeaderLeftLogo />

      <HeaderMobilePhoneLink burgerMenuActive={burgerMenuActive} />

      <HeaderMainBar
        pathname={pathname}
        servicesMenuActive={servicesMenuActive}
        burgerMenuActive={burgerMenuActive}
        onServicesToggle={handleNavMenu}
        onOpenOrder={() => openDefaultModal("introForm")}
        onBurgerToggle={burgerHandler}
      />

      <DynamicHeaderMenu
        services={services}
        active={burgerMenuActive}
        closeMenu={closeNavMenues}
      />

      <ServicesQuickLinks
        services={services}
        active={servicesMenuActive}
        onLinkClick={handleNavMenu}
      />

      <DynamicServicesDropdown services={services} active={servicesMenuActive} />
    </>
  );
};

export default memo(AppHeader);


