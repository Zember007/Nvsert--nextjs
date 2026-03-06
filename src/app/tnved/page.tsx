import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { TnvedPageData } from 'widgets/tnved/types';
import { BASE_URL, STRAPI_API_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

async function fetchTnvedPageData(): Promise<{ pageData: TnvedPageData | null }> {
    const locale = await getRequestLocale();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(`${STRAPI_API_URL}/tnveds/with-page?pagination[pageSize]=1&locale=${locale}`, {
            cache: 'force-cache',
            signal: controller.signal,
        });
        if (!res.ok) {
            console.error('Failed to fetch TN VED page data:', res.status, res.statusText);
            return { pageData: null };
        }

        const json = await res.json();
        const pageData = json?.page || null;

        return { pageData: pageData as TnvedPageData | null };
    } catch (error) {
        console.error('Error fetching TN VED page data:', error);
        return { pageData: null };
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRequestLocale();

    const title = tStatic(locale, 'meta.pages.tnved.title');
    const description = tStatic(locale, 'meta.pages.tnved.description');

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/tnved`,
        },
    };
}

export default async function Page() {
    const { pageData } = await fetchTnvedPageData();
    return <ClientPage initialItems={[]} pageData={pageData} />;
}


