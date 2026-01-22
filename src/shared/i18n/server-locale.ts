import 'server-only';

import { cookies } from 'next/headers';
import { normalizeLocale } from 'shared/config/env';

export async function getRequestLocale() {
  const cks = await cookies();
  return normalizeLocale(cks.get('nvsert_locale')?.value);
}

