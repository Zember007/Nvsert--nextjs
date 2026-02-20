import Link from 'next/link';
import Image from 'next/image';
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
  /** Слот для оверлея карточки (клиент) — рендерится поверх серверного изображения в левой колонке */
  leftSlot?: ReactNode;
  /** URL изображения карточки (LCP) — рендерится в левом sticky-столбце */
  lcpImageSrc?: string;
  lcpImageAlt?: string;
}

/**
 * Серверная оболочка: крошки, h1, левый sticky-столбец с одним изображением (LCP) + leftSlot (оверлей),
 * затем children (правая колонка + сайдбар от клиента).
 */
export default function ServicePageShell({
  title,
  slug,
  locale,
  children,
  leftSlot,
  lcpImageSrc,
  lcpImageAlt,
}: ServicePageShellProps) {
  const mainLabel = tStatic(locale, 'navigation.main');
  const allServicesLabel = tStatic(locale, 'services.breadcrumbs.allServices');

  return (
    <>
      {lcpImageSrc && (
        <link rel="preload" as="image" href={lcpImageSrc} />
      )}
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

            <div className="flex gap-[40px] items-stretch m:flex-row flex-col">
              {/* Левый sticky-столбец: одно изображение (LCP) + слот оверлея от клиента */}
              <div className="m:w-[265px] relative">
                <div className="sticky top-[104px] flex flex-col xl:gap-[40px] gap-[20px] no-scrollbar m:overflow-y-auto m:max-h-[calc(100vh-104px)]">
                  <div className="flex gap-[20px] flex-col-reverse">
                    <div className="w-[250px] mx-auto relative">
                      {lcpImageSrc && (
                        <div
                          className="service-lcp-image border border-[#93969d] rounded-[4px] overflow-hidden h-[346px]"
                          aria-hidden
                        >
                          <Image
                            src={lcpImageSrc}
                            alt={lcpImageAlt || title}
                            width={250}
                            height={346}
                            className="h-[346px] w-[250px] object-cover"
                            priority
                            fetchPriority="high"
                            sizes="250px"
                          />
                        </div>
                      )}
                      {leftSlot}
                    </div>
                  </div>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
