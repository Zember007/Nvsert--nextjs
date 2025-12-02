import React from "react";
import AppLogo from "../AppLogo";
import headerStyles from "@/assets/styles/sections/header.module.scss";

const HeaderLeftLogo: React.FC = () => {
  return (
    <div
      className={`z-[51] min-w-[192px] !backdrop-filter-none ${headerStyles.header__bg}  xl:!flex !hidden fixed mix-blend-difference h-[50px] top-[2px] left-[2px]`}
    >
      <AppLogo className="xl:mx-auto" />
    </div>
  );
};

export default HeaderLeftLogo;


