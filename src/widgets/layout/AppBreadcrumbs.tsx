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
            href={localizePath('/')}
            prefetch={false}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 6V10H9V9V5H10V4H9V3H8V2H7V1H6V0L4 0V1H3V2H2V3H1V4H0V5H1V10H4V6H6Z" fill="#93969D" />
            </svg>
          </Link>
        </li>

        {breadcrumbs.map(item => (
          <li className={stylesBreadcrumbs.breadcrumbs__item} key={item.id}>
            <Link
              href={localizePath(item.full_slug ? `${item.full_slug}/` : `/${item.id}`)}
              prefetch={false}
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