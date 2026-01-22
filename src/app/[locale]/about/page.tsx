import type { Metadata } from 'next';

import AboutPage, { generateMetadata as baseGenerateMetadata } from '../../about/page';
import { BASE_URL, normalizeLocale } from 'shared/config/env';

export default AboutPage;

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
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        ru: `${BASE_URL}/ru/about`,
        en: `${BASE_URL}/en/about`,
      },
    },
  };
}

