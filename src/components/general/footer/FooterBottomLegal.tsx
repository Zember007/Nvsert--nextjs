import React from "react";
import { useTranslation } from "react-i18next";
import AppMenuItem from "../AppMenuItem";

const FooterBottomLegal: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="xl:!flex m:!grid footer__dark bottom-top m:justify-between  m:grid-cols-2 m:gap-[10px]  xl:gap-[0px] xl:h-auto m:h-[135px]">
        <div className="m:flex hidden text-[16px] items-start  flex-col gap-[18px] font-ligh whitespace-nowrap">
          <span>{t("footer.inn")}</span>
          <span>{t("footer.company")}</span>
        </div>

        <div className="m:max-w-full m:w-full m:mx-0 mx-auto max-w-[280px]  flex xl:gap-[8px] gap-[10px] flex-col xl:items-end items-start">
          <AppMenuItem
            className="xl:!h-[35px] !h-auto !text-left"
            item={{
              href: "/soglashenie/polzovatelskoe-soglashenie/",
              label: t("footer.policy"),
            }}
            isActive={false}
          />
          <AppMenuItem
            className="xl:!h-[35px] !h-auto !text-left"
            item={{
              href: "/soglashenie/polzovatelskoe-soglashenie/",
              label: "Обработка персональных данных",
            }}
            isActive={false}
          />
        </div>
      </div>

      <div className="m:!hidden footer__white flex-col gap-[5.5px] !p-[18px] h-[96px] text-2">
        <span className="font-normal">«ЦЕНТР СТАНДАРТИЗАЦИИ»</span>
        <span className="font-normal">ИНН 6027189146</span>
        <span className="font-light">© 2025&nbsp;NVSERT</span>
      </div>
    </>
  );
};

export default FooterBottomLegal;


