import type { Metadata } from 'next';

import PrivacyPolicyPage, { generateMetadata as baseGenerateMetadata } from '../../privacy-policy/page';
import { BASE_URL, normalizeLocale } from 'shared/config/env';

export default PrivacyPolicyPage;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const meta = await baseGenerateMetadata();
  return {
    ...meta,
    openGraph: meta.openGraph
      ? { ...meta.openGraph, locale: locale === 'en' ? 'en_US' : 'ru_RU' }
      : meta.openGraph,
    alternates: {
      ...meta.alternates,
      canonical: `${BASE_URL}/${locale}/privacy-policy`,
      languages: {
        ru: `${BASE_URL}/ru/privacy-policy`,
        en: `${BASE_URL}/en/privacy-policy`,
      },
    },
  };
}
