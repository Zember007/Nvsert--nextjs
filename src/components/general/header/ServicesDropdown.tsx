import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { AppNavigation } from "../AppNavigation";
import { Services } from "@/store/navigation";
import headerStyles from "@/assets/styles/sections/header.module.scss";

interface ServicesDropdownProps {
  services: Services[];
  active: boolean;
}

const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
  services,
  active,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (active) {
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
  }, [active, controls]);

  return (
    <div
      className={`${headerStyles["services-menu-box"]} ${
        active ? headerStyles.active : ""
      }`}
    >
      <motion.div animate={controls} className=" relative">
        <div
          className={`${headerStyles["services-menu"]} !backdrop-blur-[20px] py-[20px]  js-services-menu relative ${
            active ? headerStyles.active : ""
          }`}
        >
          <div className={headerStyles["services-menu__wrapper"]}>
            <AppNavigation active={active} services={services} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesDropdown;


