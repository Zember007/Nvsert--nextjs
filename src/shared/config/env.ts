const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

/**
 * Public runtime config (safe to import in client components).
 * Only uses NEXT_PUBLIC_* vars.
 */
export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost:3000',
);

export const BASE_URL = trimTrailingSlash(process.env.NEXT_PUBLIC_BASE_URL || SITE_URL);

// Where Strapi is reachable from the browser for media files (uploads).
// Typical VPS setup: Strapi is mounted under /cp behind nginx.
export const STRAPI_BASE_PATH = process.env.NEXT_PUBLIC_STRAPI_BASE_PATH || '/cp';
export const STRAPI_PUBLIC_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL || `${BASE_URL}${STRAPI_BASE_PATH}`,
);

export const STRAPI_ORIGIN = (() => {
  try {
    return new URL(STRAPI_PUBLIC_URL).origin;
  } catch {
    return '';
  }
})();

export const DEFAULT_LOCALE = 'ru' as const;
export const SUPPORTED_LOCALES = ['ru', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function normalizeLocale(input?: string | null): SupportedLocale {
  return input === 'en' ? 'en' : 'ru';
}

