'use client';

import React, { memo, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useHeaderContext } from "shared/contexts";
import { Services } from "@/types/navigation";
import HeaderTopContacts from "./header/HeaderTopContacts";
import HeaderLeftLogo from "./header/HeaderLeftLogo";
import HeaderMobilePhoneLink from "./header/HeaderMobilePhoneLink";
import HeaderMainBar from "./header/HeaderMainBar";
import ServicesQuickLinks from "./header/ServicesQuickLinks";
import ServicesDropdown from "./header/ServicesDropdown";

// Mobile menu stays lazy: most desktop sessions never open it.
const DynamicHeaderMenu = dynamic(() => import("./header/HeaderMenu"), {
  ssr: false,
});

/** After removing `.active`, panels slide with max ~0.2s (0.1s delay + 0.1s on .menu-headers). */
const SERVICES_MENU_UNMOUNT_MS = 280;

interface AppHeaderProps {
  services: Services[];
}

const AppHeader: React.FC<AppHeaderProps> = ({ services }) => {
  const { openDefaultModal, handleCopy } = useHeaderContext();
  const pathname = usePathname();

  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  /** Keeps service panels in the DOM while the close transition runs. */
  const [servicesMenuMounted, setServicesMenuMounted] = useState(false);
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  let scrollY = 0;

  function clearServicesCloseTimer() {
    if (servicesCloseTimeoutRef.current) {
      clearTimeout(servicesCloseTimeoutRef.current);
      servicesCloseTimeoutRef.current = null;
    }
  }

  useEffect(
    () => () => {
      clearServicesCloseTimer();
    },
    []
  );

  function handleNavMenu() {
    if (servicesMenuOpen) {
      setServicesMenuOpen(false);
      clearServicesCloseTimer();
      servicesCloseTimeoutRef.current = setTimeout(() => {
        setServicesMenuMounted(false);
        servicesCloseTimeoutRef.current = null;
      }, SERVICES_MENU_UNMOUNT_MS);
      return;
    }
    if (servicesMenuMounted && !servicesMenuOpen) {
      // Exit transition in progress — ignore (avoids second click reopening)
      return;
    }
    setServicesMenuMounted(true);
    setServicesMenuOpen(true);
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
    clearServicesCloseTimer();
    setServicesMenuOpen(false);
    setServicesMenuMounted(false);
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
        servicesMenuStaged={servicesMenuMounted}
        servicesMenuOpen={servicesMenuOpen}
        burgerMenuActive={burgerMenuActive}
        onServicesToggle={handleNavMenu}
        onOpenOrder={() => openDefaultModal("introForm")}
        onBurgerToggle={burgerHandler}
      />

      {burgerMenuActive && (
        <DynamicHeaderMenu
          services={services}
          active={burgerMenuActive}
          closeMenu={closeNavMenues}
        />
      )}

      {servicesMenuMounted && (
        <ServicesQuickLinks
          services={services}
          active={servicesMenuOpen}
          onLinkClick={handleNavMenu}
        />
      )}

      {servicesMenuMounted && (
        <ServicesDropdown services={services} active={servicesMenuOpen} />
      )}
    </>
  );
};

export default memo(AppHeader);


