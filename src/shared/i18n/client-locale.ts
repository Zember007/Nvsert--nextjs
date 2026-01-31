import { DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale, normalizeLocale } from 'shared/config/env';

export function getLocaleFromPathname(
  pathname?: string,
  fallback?: SupportedLocale
): SupportedLocale {
  const seg0 = pathname?.split('/').filter(Boolean)[0];
  if (seg0 && (SUPPORTED_LOCALES as readonly string[]).includes(seg0)) {
    return seg0 as SupportedLocale;
  }
  return fallback ?? DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if ((SUPPORTED_LOCALES as readonly string[]).includes(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return normalized;
}

export function withLocalePrefix(path: string, locale: SupportedLocale): string {
  if (!path) return `/${locale}`;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length > 0 && (SUPPORTED_LOCALES as readonly string[]).includes(segments[0])) {
    return normalized;
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

export function getLocaleFromI18n(lang?: string | null): SupportedLocale {
  return normalizeLocale(lang?.slice(0, 2));
}
