// app/okpd/page.tsx
import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { OkpdPageData } from 'widgets/okpd/types';
import { BASE_URL, STRAPI_PUBLIC_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

type Okpd2Item = {
    id: number;
    documentId: string | null;
    code: string;
    name: string;
    level: number;
    hasChildren: boolean;
    parentCode: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
};

async function fetchOkpd2Data(): Promise<{ items: Okpd2Item[]; pageData: OkpdPageData | null }> {
    const locale = await getRequestLocale();
    const res = await fetch(`${STRAPI_PUBLIC_URL}/api/okpd2s/with-page?pagination[pageSize]=21000&locale=${locale}`, {
        cache: 'force-cache',
    });

    if (!res.ok) {
        return { items: [], pageData: null };
    }

    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const pageData = json?.page || null;

    return {
        items: data as Okpd2Item[],
        pageData: pageData as OkpdPageData | null,
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const { pageData } = await fetchOkpd2Data();
    const locale = await getRequestLocale();

    if (!pageData?.seo) {
        return {
            title: tStatic(locale, 'meta.pages.okpd.title'),
            description: tStatic(locale, 'meta.pages.okpd.description'),
        };
    }

    return {
        title: pageData.seo.metaTitle || pageData.title || tStatic(locale, 'meta.pages.okpd.title'),
        description:
            pageData.seo.metaDescription || pageData.description || tStatic(locale, 'meta.pages.okpd.description'),
        alternates: {
            canonical: `${BASE_URL}/okpd`,
        },
    };
}

export default async function Page() {
    const { items, pageData } = await fetchOkpd2Data();
    return <ClientPage initialItems={items} pageData={pageData} />;
}


