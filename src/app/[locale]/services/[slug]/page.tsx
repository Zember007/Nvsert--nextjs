import type { Metadata } from 'next';

import ServicePage, {
  generateMetadata as baseGenerateMetadata,
  generateStaticParams,
} from '../../../services/[slug]/page';
import { BASE_URL, normalizeLocale } from 'shared/config/env';

export default ServicePage;
export { generateStaticParams };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = normalizeLocale(resolvedParams.locale);
  const meta = await baseGenerateMetadata({
    params: Promise.resolve({ slug: resolvedParams.slug }),
  });
  return {
    ...meta,
    openGraph: meta.openGraph
      ? { ...meta.openGraph, locale: locale === 'en' ? 'en_US' : 'ru_RU' }
      : meta.openGraph,
    alternates: {
      ...meta.alternates,
      canonical: `${BASE_URL}/${locale}/services/${resolvedParams.slug}`,
      languages: {
        ru: `${BASE_URL}/ru/services/${resolvedParams.slug}`,
        en: `${BASE_URL}/en/services/${resolvedParams.slug}`,
      },
    },
  };
}

