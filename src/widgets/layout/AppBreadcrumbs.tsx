'use client';
import Link from "next/link";
import stylesBreadcrumbs from '@/assets/styles/blocks/breadcrumbs.module.scss';
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocalePrefix } from "shared/i18n/client-locale";

interface Breadcrumb {
  id: number;
  seo_h1?: string;
  title: string;
  full_slug?: string;
}

interface AppBreadcrumbsProps {
  root: string;
  title?: string;
  breadcrumbs?: Breadcrumb[];
}

const AppBreadcrumbs = ({ root, title = '', breadcrumbs = [] }: AppBreadcrumbsProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const localizePath = (path: string) => withLocalePrefix(path, locale);

  function crumbTitle(item: Breadcrumb): string {
    return item.seo_h1 ? item.seo_h1 : item.title;
  }

  return (
    <>
      <ul className={stylesBreadcrumbs.breadcrumbs}>
        <li className={stylesBreadcrumbs.breadcrumbs__item}>
          <Link
            className={stylesBreadcrumbs.breadcrumbs__link}
            href={localizePath('/')}
          >{t('navigation.main')}</Link>
        </li>

        {breadcrumbs.map(item => (
          <li className={stylesBreadcrumbs.breadcrumbs__item} key={item.id}>
            <Link
              href={localizePath(item.full_slug ? `${item.full_slug}/` : `/${item.id}`)}
              className={stylesBreadcrumbs.breadcrumbs__link}
            >
              {crumbTitle(item)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AppBreadcrumbs;