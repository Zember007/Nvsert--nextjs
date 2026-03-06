import ContactsPageView from './ContactsPageView';
import type { ContactsPageData } from './ClientPage';
import type { Metadata } from 'next';
import { cache } from 'react';
import { BASE_URL, STRAPI_API_URL, normalizeLocale, type SupportedLocale } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

const getContactsPageData = cache(async (locale: SupportedLocale): Promise<ContactsPageData> => {
  try {
    const res = await fetch(`${STRAPI_API_URL}/contacts-page?locale=${locale}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch contacts-page');
    const json = await res.json();
    if (!json?.data) throw new Error('Invalid contacts-page response');
    return json.data as ContactsPageData;
  } catch (e) {
    // Fallback контент, чтобы страница не ломалась до заполнения в Strapi
    return {
      title: tStatic(locale, 'pages.contacts.fallback.title'),
      intro:
        tStatic(locale, 'pages.contacts.fallback.intro'),
      offices: [],
      connectSection: {
        spoilerTitle: tStatic(locale, 'pages.contacts.fallback.connect.spoilerTitle'),
        heading: tStatic(locale, 'pages.contacts.fallback.connect.heading'),
        description:
          tStatic(locale, 'pages.contacts.fallback.connect.description'),
        consultationTitle: tStatic(locale, 'pages.contacts.fallback.connect.consultationTitle'),
        consultationText:
          tStatic(locale, 'pages.contacts.fallback.connect.consultationText'),
        consultationButtonLabel: tStatic(locale, 'navigation.order'),
        featureCards: [],
      },
      requisitesSection: {
        spoilerTitle: tStatic(locale, 'pages.contacts.fallback.requisites.spoilerTitle'),
        heading: tStatic(locale, 'pages.contacts.fallback.requisites.heading'),
        description:
          tStatic(locale, 'pages.contacts.fallback.requisites.description'),
        downloadButtonLabel: tStatic(locale, 'pages.contacts.fallback.requisites.downloadButtonLabel'),
        pdfUrl: '/Реквизиты_ЦЕНТР_СТАНДАРТИЗАЦИИ_ООО.pdf',
        legal: {
          fullName: '',
        },
      },
      seo: {
        metaTitle: tStatic(locale, 'pages.contacts.fallback.seo.metaTitle'),
        metaDescription: tStatic(locale, 'pages.contacts.fallback.seo.metaDescription'),
      },
    };
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = normalizeLocale(await getRequestLocale());
  const data = await getContactsPageData(locale);
  const title = data.seo?.metaTitle || data.title || tStatic(locale, 'meta.pages.contacts.title');
  const description =
    data.seo?.metaDescription || tStatic(locale, 'meta.pages.contacts.description');

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/contacts`,
    },
  };
}

const Page = async () => {
  const locale = normalizeLocale(await getRequestLocale());
  const data = await getContactsPageData(locale);
  return (
    <ContactsPageView
      data={data}
      submitLabel={tStatic(locale, 'form.buttons.submitApplication')}
      homeLabel={tStatic(locale, 'navigation.main')}
      contactsLabel={tStatic(locale, 'navigation.contacts')}
      requisitesLabels={{
        fullName: tStatic(locale, 'contacts.requisites.labels.fullName'),
        legalAddress: tStatic(locale, 'contacts.requisites.labels.legalAddress'),
        inn: tStatic(locale, 'contacts.requisites.labels.inn'),
        ogrn: tStatic(locale, 'contacts.requisites.labels.ogrn'),
        director: tStatic(locale, 'contacts.requisites.labels.director'),
        email: tStatic(locale, 'contacts.requisites.labels.email'),
      }}
    />
  );
};

export default Page;
