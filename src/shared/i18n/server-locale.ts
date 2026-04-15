/**
 * Чтение текущей локали в Server Components и Route Handlers.
 *
 * GUARD на NEXT_PHASE: во время `next build` / статического prerender нет
 * request-контекста — cookies() представлен как "hanging promise" или бросает.
 * Guard возвращает DEFAULT_LOCALE на этапе сборки, не ломая SSG-страницы.
 *
 * Локаль попадает в cookie `nvsert_locale` через middleware (см. middleware.ts).
 * Используйте getRequestLocale() в Server Components вместо прямого вызова cookies().
 */
import 'server-only';

import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, normalizeLocale } from 'shared/config/env';

export async function getRequestLocale() {
  // During `next build` / prerender there is no request context.
  // `cookies()` may be represented as a hanging promise that rejects after prerender completes,
  // so we must avoid calling it in that phase.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return DEFAULT_LOCALE;
  }

  try {
    const cks = await cookies();
    return normalizeLocale(cks.get('nvsert_locale')?.value);
  } catch {
    return DEFAULT_LOCALE;
  }
}

