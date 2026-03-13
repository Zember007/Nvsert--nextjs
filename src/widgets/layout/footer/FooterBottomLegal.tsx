import React from "react";
import { useTranslation } from "react-i18next";
import footerStyles from "@/assets/styles/base/base.module.scss";
import textSize from "@/assets/styles/base/base.module.scss";

const FooterBottomLegal: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <>
      <div
        className={`${footerStyles.footer__white} !items-stretch !justify-between !rounded-[2px] xl:!px-[25px] xl:!py-[25px]`}
      >
        <div className="flex h-full min-h-[248px] w-full flex-col justify-between">
          <div className="text-[52px] leading-[1] tracking-[-1px] font-semibold text-black">
            NVSERT
          </div>
          <div className={`flex flex-col gap-[8px] text-black ${textSize.text2}`}>
            <span className="font-light">{t("footer.inn")}</span>
            <span className="font-normal">{t("footer.company")}</span>
            <span className="font-light">{t("footer.copyright", { year })}</span>
            <span className="font-light">Аттестат аккредитации RA.RU.21OE31</span>
            <span className="font-light">Аттестат аккредитации RA.RU.21HO96</span>
          </div>
        </div>
      </div>

      <div
        className={`m:!hidden ${footerStyles.footer__white} flex-col gap-[5.5px] !p-[18px] h-[96px] ${textSize.text2}`}
      >
        <span className="font-normal">{t("footer.company")}</span>
        <span className="font-normal">{t("footer.inn")}</span>
        <span className="font-light">{t("footer.copyright", { year })}</span>
      </div>
    </>
  );
};

export default FooterBottomLegal;


