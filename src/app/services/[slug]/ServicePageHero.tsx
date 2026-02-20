// Server-only: LCP (h1) and breadcrumbs for faster First Contentful Paint.
// Критические стили инлайнятся, чтобы не ждать base.scss — быстрый FCP/LCP.
import Link from 'next/link';
import { filterPrepositions } from 'shared/lib';
import { tStatic } from 'shared/i18n/static';
import type { SupportedLocale } from 'shared/config/env';

const CRITICAL_CSS = `
.sh-cr { font-size:12px; color:#000; padding:0 26px; position:absolute; left:0; top:58px; z-index:5; list-style:none; margin:0; display:flex; flex-wrap:wrap; align-items:center; gap:0; }
.sh-cr li { display:flex; align-items:center; }
.sh-cr li:not(:last-child)::after { content:''; display:block; margin:0 9px; width:6px; height:10px; background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10' viewBox='0 0 6 10'%3E%3Cpath fill='%2393969d' d='M1 0L5 5L1 10V0z'/%3E%3C/svg%3E") no-repeat center; background-size:contain; }
.sh-cr li:last-child { color:#34446D; }
.sh-cr a { color:inherit; text-decoration:none; }
.sh-cr a:hover { color:#34446D; }
.sh-w { max-width:1440px; margin:0 auto; padding:50px 26px 0; width:100%; box-sizing:border-box; }
@media (min-width:960px){ .sh-w { padding-left:38px; padding-right:38px; } }
@media (min-width:1280px){ .sh-w { padding-left:122px; padding-right:122px; } }
.sh-h1 { margin:0; font-size:clamp(1.25rem,4vw,1.75rem); font-weight:400; text-align:center; line-height:1.2; }
@media (min-width:960px){ .sh-h1 { text-align:left; } }
`;

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
      <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      <ul className="sh-cr">
        <li>
          <Link href={localePrefix('/', locale)}>{mainLabel}</Link>
        </li>
        <li>
          <Link href={localePrefix('/services', locale)}>{allServicesLabel}</Link>
        </li>
        <li>
          <Link href={localePrefix(`/services/${slug}`, locale)}>{title}</Link>
        </li>
      </ul>
      <div className="sh-w">
        <h1 className="sh-h1">{filterPrepositions(title)}</h1>
      </div>
    </>
  );
}
