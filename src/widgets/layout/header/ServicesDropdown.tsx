import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { AppNavigation } from "../AppNavigation";
import { Services } from "@/types/navigation";
import headerStyles from "@/assets/styles/base/base.module.scss";
import { useMenuRevealAnimation } from "shared/hooks";

interface ServicesDropdownProps {
  services: Services[];
  active: boolean;
}

const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
  services,
  active,
}) => {
  const menuRevealed = useMenuRevealAnimation(active);
  const panelOpen = active && menuRevealed;
  const controls = useAnimation();

  useEffect(() => {
    if (panelOpen) {
      controls.start({
        y: [-50, 0, -20, 0, 0],
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
          times: [0, 0.2, 0.5, 0.8, 1],
          delay: 0.2,
        },
      });
    }
  }, [panelOpen, controls]);

  return (
    <div
      className={`${headerStyles["services-menu-box"]} ${
        panelOpen ? headerStyles.active : ""
      }`}
    >
      <motion.div animate={controls} className=" relative">
        <div
          className={`${headerStyles["services-menu"]} !backdrop-blur-[20px] py-[20px]  js-services-menu relative ${
            panelOpen ? headerStyles.active : ""
          }`}
        >
          <div className={headerStyles["services-menu__wrapper"]}>
            <AppNavigation active={panelOpen} services={services} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesDropdown;


