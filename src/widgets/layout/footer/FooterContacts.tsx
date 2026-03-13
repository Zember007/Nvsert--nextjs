import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useHeaderContext } from "shared/contexts";
import { useTranslation } from "react-i18next";
import footerStyles from "@/assets/styles/base/base.module.scss";
import FooterMarquee from "./FooterMarquee";
import { SupportedLocale } from "shared/config/env";
import {
  getLocaleFromI18n,
  getLocaleFromPathname,
  stripLocalePrefix,
  withLocalePrefix,
} from "shared/i18n/client-locale";

const LOCALE_COOKIE = "nvsert_locale";

const FooterContacts: React.FC = () => {
  const { handleCopy, openDefaultModal } = useHeaderContext();
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const i18nLocale = getLocaleFromI18n(i18n.language);
  const [currentLang, setCurrentLang] = useState<SupportedLocale>(
    () => getLocaleFromPathname(pathname, i18nLocale)
  );

  useEffect(() => {
    setCurrentLang(getLocaleFromPathname(pathname, i18nLocale));
  }, [pathname, i18nLocale]);

  const switchLang: SupportedLocale = currentLang === "ru" ? "en" : "ru";
  const langLabel = switchLang.toUpperCase();

  const handleLangClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCurrentLang(switchLang);
    document.cookie = `${LOCALE_COOKIE}=${switchLang}; path=/; sameSite=lax; max-age=31536000`;
    i18n.changeLanguage(switchLang);
    const pathWithoutLocale = stripLocalePrefix(pathname);
    const newPath = withLocalePrefix(pathWithoutLocale, switchLang);
    router.push(newPath);
  };

  return (
    <div
      className={`${footerStyles.footer__white} !rounded-[2px] !justify-between !px-[9px] !py-[25px] xl:!px-[15px]`}
    >
      <div className="hidden xl:flex w-full items-center justify-between gap-[20px]">
        <div className={`flex items-center gap-[20px] ${footerStyles.lineAfterBox}`}>
          <button
            type="button"
            onClick={(e) => handleCopy("info@nvsert.ru", e)}
            className={`h-[35px] text-[18px] leading-[1.2] font-light text-black ${footerStyles.lineAfter}`}
          >
            info@nvsert.ru
          </button>
          <button
            type="button"
            onClick={(e) => handleCopy("@nvsert", e)}
            className={`h-[35px] text-[18px] leading-[1.2] font-light text-black ${footerStyles.lineAfter}`}
          >
            Telegram
          </button>
          <button
            type="button"
            onClick={(e) => handleCopy("@nvsert", e)}
            className={`h-[35px] text-[18px] leading-[1.2] font-light text-black ${footerStyles.lineAfter}`}
          >
            Max
          </button>
        </div>
        <FooterMarquee className="shrink-0" />
      </div>

      <div className="xl:hidden relative m:grid grid-cols-2 place-items-center flex gap-[10px] m:flex-row flex-col w-full">
        <button
          onClick={() => {
            openDefaultModal("introForm");
          }}
          className={`border border-solid text-[18px] flex items-center justify-between px-[15px] text-[#FFF] border-[#93969D] h-[50px] xss:w-[280px] w-[260px] mx-auto rounded-[3px] bg-[#34446D] ${footerStyles.lineAfter} ${footerStyles.stopColor}`}
        >
          <span>{t("navigation.order")}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.03597 2C7.61151 2 9.91367 7.17986 9.91367 7.7554C9.91367 8.90648 8.18705 10.0576 7.61151 11.2086C7.03597 12.3597 8.18705 13.5108 9.33813 14.6619C9.78705 15.1108 11.6403 16.964 12.7914 16.3885C13.9424 15.813 15.0935 14.0863 16.2446 14.0863C16.8201 14.0863 22 16.3885 22 16.964C22 19.2662 20.2734 20.9928 18.5468 21.5683C16.8201 22.1439 15.6691 22.1439 13.3669 21.5683C11.0647 20.9928 9.33813 20.4173 6.46043 17.5396C3.58273 14.6619 3.00719 12.9353 2.43165 10.6331C1.85612 8.33094 1.85612 7.17986 2.43165 5.45324C3.00719 3.72662 4.73381 2 7.03597 2Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M14 7C14.6689 7.31419 15.277 7.73986 15.7838 8.25676C16.2804 8.75338 16.6959 9.35135 17 10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M15 2C16.7165 2.45043 18.2504 3.33913 19.4678 4.55652C20.673 5.77391 21.5617 7.29565 22 9"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => handleCopy("info@nvsert.ru", e)}
          className={`h-[50px] xss:w-[280px] w-[260px] text-[18px] leading-[1.2] font-light text-black ${footerStyles.lineAfter}`}
        >
          info@nvsert.ru
        </button>
        <button
          type="button"
          onClick={(e) => handleCopy("@nvsert", e)}
          className={`h-[50px] xss:w-[280px] w-[260px] text-[18px] leading-[1.2] font-light text-black ${footerStyles.lineAfter}`}
        >
          Telegram
        </button>
        <button
          type="button"
          onClick={(e) => handleCopy("@nvsert", e)}
          className={`h-[50px] xss:w-[280px] w-[260px] text-[18px] leading-[1.2] font-light text-black ${footerStyles.lineAfter}`}
        >
          Max
        </button>
        <div className="col-span-2 mt-[4px] w-full flex justify-center overflow-hidden">
          <FooterMarquee className="w-full justify-center" />
        </div>
        <button
          type="button"
          onClick={handleLangClick}
          className={`absolute m:bottom-[-53px] m:right-[34px] bottom-[-80px] right-1/2 m:translate-x-0 translate-x-[140px] btn-lang m:!h-[35px] !h-[50px] cursor-pointer ${footerStyles.lineAfter}`}
        >
          {langLabel}
        </button>
      </div>
    </div>
  );
};

export default FooterContacts;


