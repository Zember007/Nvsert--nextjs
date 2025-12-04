import React from "react";
import { useTranslation } from "react-i18next";
import AppMenuItem from "../AppMenuItem";
import footerStyles from "@/assets/styles/sections/footer.module.scss";
import textSize from "@/assets/styles/base/base.module.scss";

const FooterTopMenu: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    { label: "FAQ", href: "#" },
    { label: t("navigation.blog"), href: "#" },
    { label: t("navigation.reviews"), href: "/feedback" },
    { label: t("navigation.tnved"), href: "/class/tnved/" },
    { label: t("navigation.okp"), href: "/class/okp/" },
  ];

  return (
    <div
      className={`${footerStyles.footer__white} change-style xl:row-start-auto row-start-2   xl:justify-between m:gap-[62px]   xl:gap-[0px]`}
    >
      <p className={`m:block hidden xl:relative absolute xl:left-0 left-[34px] xl:top-0 top-1/2 xl:-translate-y-0 -translate-y-1/2 ${textSize.text1} font-light col-start-1 col-end-3 whitespace-nowrap`}>
        © 2025&nbsp;NVSERT
      </p>

      <div className=" m:w-auto w-full xl:mx-0 mx-auto m:max-w-full max-w-[280px]  flex gap-[10px] items-start m:flex-row flex-col ">
        {menuItems.map((item, i) => (
          <AppMenuItem
            className="m:!h-[35px] !h-[50px]"
            key={i}
            item={item}
            isActive={false}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterTopMenu;


