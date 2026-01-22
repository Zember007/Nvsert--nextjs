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

