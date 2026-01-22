import type { Metadata } from 'next';

import ServicesPage, { generateMetadata as baseGenerateMetadata } from '../../services/page';
import { BASE_URL, normalizeLocale } from 'shared/config/env';

export default ServicesPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);
  const meta = await baseGenerateMetadata();
  return {
    ...meta,
    openGraph: meta.openGraph
      ? { ...meta.openGraph, locale: locale === 'en' ? 'en_US' : 'ru_RU' }
      : meta.openGraph,
    alternates: {
      ...meta.alternates,
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        ru: `${BASE_URL}/ru/services`,
        en: `${BASE_URL}/en/services`,
      },
    },
  };
}

