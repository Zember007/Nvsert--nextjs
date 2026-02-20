// Server-only: LCP (h1) and breadcrumbs for faster First Contentful Paint
import Link from 'next/link';
import { filterPrepositions } from 'shared/lib';
import { tStatic } from 'shared/i18n/static';
import type { SupportedLocale } from 'shared/config/env';
import stylesBreadcrumbs from '@/assets/styles/blocks/breadcrumbs.module.scss';

function localePrefix(path: string, locale: SupportedLocale): string {
  if (locale === 'en') return `/en${path === '/' ? '' : path}`;
  return path;
}

interface ServicePageHeroProps {
  title: string;
  slug: string;
  locale: SupportedLocale;
}

export default function ServicePageHero({ title, slug, locale }: ServicePageHeroProps) {
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
          </div>
        </div>
      </div>
    </>
  );
}
