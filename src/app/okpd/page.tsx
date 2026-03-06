// app/okpd/page.tsx
import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { OkpdPageData } from 'widgets/okpd/types';
import { BASE_URL, STRAPI_API_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

async function fetchOkpdPageData(): Promise<{ pageData: OkpdPageData | null }> {
    const locale = await getRequestLocale();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(
            `${STRAPI_API_URL}/okpd2s/with-page?pagination[pageSize]=1&locale=${locale}`,
            {
                cache: 'force-cache',
                signal: controller.signal,
            },
        );

        if (!res.ok) {
            console.error('Failed to fetch OKPD page data:', res.status, res.statusText);
            return { pageData: null };
        }

        const json = await res.json();
        const pageData = json?.page || null;

        return {
            pageData: pageData as OkpdPageData | null,
        };
    } catch (error) {
        console.error('Error fetching OKPD page data:', error);
        return { pageData: null };
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRequestLocale();

    const title = tStatic(locale, 'meta.pages.okpd.title');
    const description = tStatic(locale, 'meta.pages.okpd.description');

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/okpd`,
        },
    };
}

export default async function Page() {
    const { pageData } = await fetchOkpdPageData();
    return <ClientPage initialItems={[]} pageData={pageData} />;
}


