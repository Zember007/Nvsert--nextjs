import Link from 'next/link';
import { filterPrepositions } from 'shared/lib';
import { tStatic } from 'shared/i18n/static';
import type { SupportedLocale } from 'shared/config/env';
import stylesBreadcrumbs from '@/assets/styles/blocks/breadcrumbs.module.scss';
import { ReactNode } from 'react';

function localePrefix(path: string, locale: SupportedLocale): string {
  const p = path === '/' ? '' : path;
  return locale === 'en' ? `/en${p}` : p || '/';
}

interface ServicePageShellProps {
  title: string;
  slug: string;
  locale: SupportedLocale;
  children: ReactNode;
}

/**
 * Серверная оболочка: крошки + один wrapper с h1 (LCP) и слотом для клиентского контента.
 * Структура не ломается — один wrapper, внутри h1 и затем children (галерея + две колонки).
 */
export default function ServicePageShell({ title, slug, locale, children }: ServicePageShellProps) {
  const mainLabel = tStatic(locale, 'navigation.main');
  const allServicesLabel = tStatic(locale, 'services.breadcrumbs.allServices');

  return (
    <>
      <ul className={stylesBreadcrumbs.breadcrumbs}>
        <li className={stylesBreadcrumbs.breadcrumbs__item}>
          <Link
            className={stylesBreadcrumbs.breadcrumbs__link}
            href={localePrefix('/', locale)}
          >
            {mainLabel}
          </Link>
        </li>
        <li className={stylesBreadcrumbs.breadcrumbs__item}>
          <Link
            href={localePrefix('/services', locale)}
            className={stylesBreadcrumbs.breadcrumbs__link}
          >
            {allServicesLabel}
          </Link>
        </li>
        <li className={stylesBreadcrumbs.breadcrumbs__item}>
          <Link
            href={localePrefix(`/services/${slug}`, locale)}
            className={stylesBreadcrumbs.breadcrumbs__link}
          >
            {title}
          </Link>
        </li>
      </ul>

      <div className="wrapper pt-[50px]">
        <div className="flex gap-[40px]">
          <div className="flex flex-col m:gap-[50px] gap-[40px] flex-1">
            <h1 className="!m-0 m:text-left text-center">
              {filterPrepositions(title)}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
