import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['ru', 'en'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: SupportedLocale = 'ru';
const LOCALE_COOKIE = 'nvsert_locale';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (req.headers.get("x-nextjs-data")) {
    return NextResponse.next();
  }

  // --- Locale prefix handling (/ru/*, /en/*) ---
  // NOTE: Strapi is mounted under /cp at nginx level, so we never redirect /cp.
  const shouldSkipLocaleRedirect =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/media/') ||
    pathname.startsWith('/cp') ||
    pathname === '/favicon.ico';

  if (!shouldSkipLocaleRedirect) {
    const seg0 = pathname.split('/').filter(Boolean)[0] || '';
    const isLocalePrefixed = (SUPPORTED_LOCALES as readonly string[]).includes(seg0);

    if (!isLocalePrefixed) {
      const url = req.nextUrl.clone();
      url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(url);
    }

    // Persist locale for server-rendered html lang / metadata
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-nvsert-locale', seg0);
    const res = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    res.cookies.set(LOCALE_COOKIE, seg0 as SupportedLocale, { path: '/', sameSite: 'lax' });
    return res;
  }

  // --- API proxying (/api/* -> Strapi) ---
  let targetUrl: string | null = null; // Определяем целевой URL

  // Backward-compatible env names (VPS/PM2 configs may vary)
  const apiTarget = process.env.apiTarget || process.env.API_TARGET;

  // Если не задан apiTarget, то ничего не проксируем
  if (!apiTarget) {
    return NextResponse.next();
  }

  // Убираем завершающий слэш, чтобы не получить /apiservices и т.п.
  const normalizedTarget = apiTarget.replace(/\/$/, '');

  // Проверяем, начинается ли путь с /api/
  if (pathname.startsWith('/api/')) {
    // /api/services -> /services
    const apiPath = pathname.replace(/^\/api/, '');
    // http://localhost:1337/api + /services -> http://localhost:1337/api/services
    targetUrl = `${normalizedTarget}${apiPath}${req.nextUrl.search || ''}`;
  }

  // Если targetUrl определен (путь начинается с /api/)
  if (targetUrl) {
    const requestHeaders = new Headers(req.headers);

    // Добавляем заголовки
    const accessToken = process.env.apiToken || process.env.API_TOKEN || '';
    if (accessToken) requestHeaders.set('X-Access-Token', accessToken);

    // Avoid hardcoding credentials in the repository.
    // If nginx/Strapi requires Basic auth for API, provide it via env (already including "Basic ...").
    const basicAuth = process.env.API_BASIC_AUTH || process.env.apiBasicAuth;
    if (basicAuth) requestHeaders.set('Authorization', basicAuth);

    // Перезаписываем запрос с новыми заголовками
    return NextResponse.rewrite(new URL(targetUrl, req.url), {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Если путь не начинается с /api/ или /media/, пропускаем запрос дальше
  return NextResponse.next();
}

export const config = {
  // Run for all routes except static assets (we need locale redirects and /api proxying)
  matcher: ['/((?!_next|.*\\..*).*)'],
};