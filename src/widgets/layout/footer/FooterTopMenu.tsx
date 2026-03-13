import React from "react";
import { useTranslation } from "react-i18next";
import footerStyles from "@/assets/styles/base/base.module.scss";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocalePrefix } from "shared/i18n/client-locale";
import Link from "next/link";

const FooterTopMenu: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const localizePath = (path: string) => withLocalePrefix(path, locale);

  const columns = [
    {
      title: "Документы",
      items: [
        { label: "Сертификат соответствия ГОСТ Р", href: "#" },
        { label: "Декларация Таможенного союза", href: "#" },
        { label: "Сертификат Таможенного союза", href: "#" },
        { label: "Свидетельство о гос. регистрации (СГР)", href: "#" },
        { label: "Экспертное заключение (ЭЗ)", href: "#" },
        { label: "Технические условия", href: "#" },
        { label: "ГОСТ Р ИСО 9001–2015 из облака", href: "#" },
        { label: "Информационное отказное письмо", href: "#" },
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
        { label: "О компании", href: "#" },
        { label: t("navigation.contacts"), href: "#" },
        { label: "Политика", href: "#" },
        { label: "Оферта", href: "#" },
      ],
    },
  ];

  return (
    <div
      className={`${footerStyles.footer__white} !rounded-[2px] !items-start !relative !px-[20px] !py-[20px] xl:!px-[25px] xl:!py-[25px]`}
    >
      <div className="flex w-full flex-col gap-[20px] xl:flex-row xl:gap-[32px]">
        {columns.map((column) => (
          <div key={column.title} className="flex min-w-0 flex-1 flex-col items-start gap-[8px]">
            <p className="text-[24px] leading-[1.1] tracking-[-1px] font-normal text-black px-[15px] pb-[6px] border-b border-[#93969D]">
              {column.title}
            </p>
            {column.items.map((item) => (
              item.href === "#" ? (
                <button
                  key={`${column.title}-${item.label}`}
                  type="button"
                  className="h-[35px] px-[15px] text-[18px] leading-[1.2] font-light text-black whitespace-nowrap text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={`${column.title}-${item.label}`}
                  href={item.href}
                  prefetch={false}
                  className="h-[35px] px-[15px] text-[18px] leading-[1.2] font-light text-black whitespace-nowrap text-left"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        ))}
      </div>
      <span className="hidden xl:block absolute bottom-[20px] right-[20px] text-[18px] leading-[1.2] font-light text-black">
        RU
      </span>
    </div>
  );
};

export default FooterTopMenu;


