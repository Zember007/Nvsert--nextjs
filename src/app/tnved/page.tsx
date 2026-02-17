import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { TnvedPageData } from 'widgets/tnved/types';
import { BASE_URL, STRAPI_API_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

type TnvedItem = {
    id: number;
    nodeId: number;
    parentNodeId: number | null;
    path: string;
    code: string | null;
    codeNorm: string | null;
    name: string;
    level: number;
    chapter: string | null;
    hasChildren: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
    publishedAt?: string | null;
};

async function fetchTnvedData(): Promise<{ items: TnvedItem[]; pageData: TnvedPageData | null }> {
    const locale = await getRequestLocale();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(`${STRAPI_API_URL}/tnveds/with-page?locale=${locale}`, {
            cache: 'force-cache',
            signal: controller.signal,
        });
        if (!res.ok) {
            console.error('Failed to fetch TN VED data:', res.status, res.statusText);
            return { items: [], pageData: null };
        }

        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
        const pageData = json?.page || null;

        return { items: data as TnvedItem[], pageData: pageData as TnvedPageData | null };
    } catch (error) {
        console.error('Error fetching TN VED data:', error);
        return { items: [], pageData: null };
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
    const { items, pageData } = await fetchTnvedData();
    return <ClientPage initialItems={items} pageData={pageData} />;
}


