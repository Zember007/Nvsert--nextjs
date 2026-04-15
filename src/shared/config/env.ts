/**
 * Единственный источник истины для переменных окружения.
 *
 * ЗАЧЕМ: разбросанные process.env по компонентам невозможно отследить и тестировать.
 * Все env-переменные читаются здесь, нормализуются и экспортируются как константы.
 *
 * STRAPI_PUBLIC_URL vs STRAPI_API_URL:
 * - STRAPI_PUBLIC_URL — публичный URL для медиафайлов (через nginx /cp)
 * - STRAPI_API_URL — внутренний URL REST API (API_TARGET/apiTarget, напрямую на порт Strapi)
 *   Эти адреса могут (и должны) отличаться в продакшне.
 *
 * Файл безопасен для импорта в Server Components, Client Components и Edge Runtime.
 * Не добавляйте сюда server-only импорты (fs, next/headers и т.п.).
 * NEXT_PUBLIC_* переменные видны браузеру; остальные — только серверу/сборке.
 */
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
export const STRAPI_BASE_PATH = process.env.NEXT_PUBLIC_STRAPI_BASE_PATH ;
export const STRAPI_PUBLIC_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL || `${BASE_URL}${STRAPI_BASE_PATH}`,
);

// Base URL for Strapi REST API (server-side usage: build, RSC, route handlers).
// Prefer explicit API_TARGET/apiTarget; fallback to STRAPI_PUBLIC_URL + /api.
const RAW_STRAPI_API_URL =
  process.env.API_TARGET || process.env.apiTarget || `${STRAPI_PUBLIC_URL}/api`;
export const STRAPI_API_URL = trimTrailingSlash(RAW_STRAPI_API_URL);

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

