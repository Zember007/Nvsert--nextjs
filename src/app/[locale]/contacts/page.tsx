import type { Metadata } from 'next';

import ContactsPage, { generateMetadata as baseGenerateMetadata } from '../../contacts/page';
import { BASE_URL, normalizeLocale } from 'shared/config/env';

export default ContactsPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const { locale: localeParam } = await Promise.resolve(params);
  const locale = normalizeLocale(localeParam);
  const meta = await baseGenerateMetadata();
  return {
    ...meta,
    openGraph: meta.openGraph
      ? { ...meta.openGraph, locale: locale === 'en' ? 'en_US' : 'ru_RU' }
      : meta.openGraph,
    alternates: {
      ...meta.alternates,
      canonical: `${BASE_URL}/${locale}/contacts`,
      languages: {
        ru: `${BASE_URL}/ru/contacts`,
        en: `${BASE_URL}/en/contacts`,
      },
    },
  };
}

