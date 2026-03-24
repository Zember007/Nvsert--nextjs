import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import footerStyles from "@/assets/styles/base/base.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { SupportedLocale } from "shared/config/env";
import {
  getLocaleFromI18n,
  getLocaleFromPathname,
  stripLocalePrefix,
  withLocalePrefix,
} from "shared/i18n/client-locale";
import Link from "next/link";

const LOCALE_COOKIE = "nvsert_locale";

const FooterTopMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const i18nLocale = getLocaleFromI18n(i18n.language);
  const [currentLang, setCurrentLang] = useState<SupportedLocale>(() =>
    getLocaleFromPathname(pathname, i18nLocale)
  );

  useEffect(() => {
    setCurrentLang(getLocaleFromPathname(pathname, i18nLocale));
  }, [pathname, i18nLocale]);

  const switchLang: SupportedLocale = currentLang === "ru" ? "en" : "ru";
  const langLabel = switchLang.toUpperCase();
  const isEn = switchLang === "en";

  const handleLangClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentLang(switchLang);
    document.cookie = `${LOCALE_COOKIE}=${switchLang}; path=/; sameSite=lax; max-age=31536000`;
    i18n.changeLanguage(switchLang);

    const pathWithoutLocale = stripLocalePrefix(pathname);
    const newPath = withLocalePrefix(pathWithoutLocale, switchLang);
    router.push(newPath);
  };

  const locale = getLocaleFromPathname(pathname, i18nLocale);
  const localizePath = (path: string) => withLocalePrefix(path, locale);

  const columns = [
    {
      title: "Документы",
      items: [
        {
          label: "Сертификат соответствия ГОСТ Р",
          href: localizePath("/services/certificate-gost-r"),
        },
        {
          label: "Декларация Таможенного союза",
          href: localizePath("/services/customs-union-declaration"),
        },
        {
          label: "Сертификат Таможенного союза",
          href: localizePath("/services/customs-union-certificate"),
        },
        {
          label: "Свидетельство о гос. регистрации (СГР)",
          href: localizePath("/services/state-registration-certificate"),
        },
        {
          label: "Экспертное заключение (ЭЗ)",
          href: localizePath("/services/expert-opinion"),
        },
        {
          label: "Технические условия",
          href: localizePath("/services/technical-conditions"),
        },
        {
          label: "ГОСТ Р ИСО 9001–2015",
          href: localizePath("/services/gost-r-iso-9001-2015-standart-organizaczii"),
        },
        {
          label: "Информационное отказное письмо",
          href: localizePath("/services/informational-refusal-letter"),
        },
      ],
    },
    {
      title: "Ресурсы",
      items: [
        { label: "Блог", href: "#" },
        { label: "FAQ", href: "#" },
        { label: t("navigation.tnved"), href: localizePath("/tnved/") },
        { label: t("navigation.okp"), href: localizePath("/okpd/") },
        { label: t("navigation.reviews"), href: localizePath("/feedback") },
      ],
    },
    {
      title: "Компания",
      items: [
        { label: "О компании", href: localizePath("/about/") },
        { label: t("navigation.contacts"), href: localizePath("/contacts/") },
        { label: "Политика", href: "#" },
        { label: "Оферта", href: "#" },
      ],
    },
  ];

  return (
    <div
      className={`${footerStyles.footer__white} !rounded-[2px] !items-start !relative !px-[20px] !py-[20px] xl:!px-[25px] xl:!py-[25px]`}
    >
      <div className="flex w-full flex-col gap-[20px] xl:flex-row xl:flex-wrap xl:gap-x-[32px] xl:gap-y-[20px]">
        {columns.map((column) => (
          <div
            key={column.title}
            className="flex w-full min-w-0 flex-1 flex-col items-start gap-[8px] xl:min-w-[260px] xl:flex-[1_1_260px]"
          >
            <p className="w-full text-[24px] leading-[1.1] tracking-[-1px] font-normal text-black px-[15px] pb-[6px] border-b border-[#93969D]">
              {column.title}
            </p>
            {column.items.map((item) => (
              item.href === "#" ? (
                <button
                  key={`${column.title}-${item.label}`}
                  type="button"
                  className={`h-[35px] px-[15px] text-[18px] leading-[1.2] font-light text-black whitespace-nowrap text-left ${footerStyles.lineAfterBox}`}
                >
                  <span
                  className={`${footerStyles.lineAfter}`}
                  >{item.label}</span>
                </button>
              ) : (
                <Link
                  key={`${column.title}-${item.label}`}
                  href={item.href}
                  prefetch={false}
                  className={`h-[35px] px-[15px] text-[18px] leading-[1.2] font-light text-black whitespace-nowrap text-left ${footerStyles.lineAfterBox}`}
                >
                  <span className={`${footerStyles.lineAfter}`}>{item.label}</span>
                </Link>
              )
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleLangClick}
        className={`hidden xl:block !absolute bottom-[20px] right-[20px] text-[18px] leading-[1.2] font-light text-black cursor-pointer ${footerStyles.lineAfter}`}
      >
        <span className="inline-flex items-center gap-[4px]">
          <span
            aria-hidden
            className="inline-flex h-[14px] w-[20px]"
          >
            {isEn ? (
              <svg viewBox="0 0 20 14" className="h-full w-full">
                <rect width="20" height="14" fill="#B22234" />
                <rect y="1" width="20" height="1" fill="#FFFFFF" />
                <rect y="3" width="20" height="1" fill="#FFFFFF" />
                <rect y="5" width="20" height="1" fill="#FFFFFF" />
                <rect y="7" width="20" height="1" fill="#FFFFFF" />
                <rect y="9" width="20" height="1" fill="#FFFFFF" />
                <rect y="11" width="20" height="1" fill="#FFFFFF" />
                <rect width="9" height="7" fill="#3C3B6E" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 14" className="h-full w-full">
                <rect width="20" height="14" fill="#FFFFFF" />
                <rect y="4.67" width="20" height="4.67" fill="#224C9C" />
                <rect y="9.34" width="20" height="4.66" fill="#D52B1E" />
              </svg>
            )}
          </span>
          <span>{langLabel}</span>
        </span>
      </button>
    </div>
  );
};

export default FooterTopMenu;


