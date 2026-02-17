import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { TnvedPageData } from 'widgets/tnved/types';
import { BASE_URL, STRAPI_PUBLIC_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

// Тяжёлые данные с Strapi — рендерим по запросу, не блокируем билд
export const dynamic = 'force-dynamic';

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
    try {
        const locale = await getRequestLocale();
        const res = await fetch(`${STRAPI_PUBLIC_URL}/api/tnveds/with-page?locale=${locale}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return { items: [], pageData: null };

        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
        const pageData = json?.page || null;
        return { items: data as TnvedItem[], pageData: pageData as TnvedPageData | null };
    } catch {
        return { items: [], pageData: null };
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const { pageData } = await fetchTnvedData();
    const locale = await getRequestLocale();

    if (!pageData?.seo) {
        return {
            title: tStatic(locale, 'meta.pages.tnved.title'),
            description: tStatic(locale, 'meta.pages.tnved.description'),
        };
    }

    return {
        title: pageData.seo.metaTitle || pageData.title || tStatic(locale, 'meta.pages.tnved.title'),
        description:
            pageData.seo.metaDescription || pageData.description || tStatic(locale, 'meta.pages.tnved.description'),
        alternates: {
            canonical: `${BASE_URL}/tnved`,
        },
    };
}

export default async function Page() {
    const { items, pageData } = await fetchTnvedData();
    return <ClientPage initialItems={items} pageData={pageData} />;
}


