import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { TnvedPageData } from '@/widgets/tnved/types';
import { BASE_URL, SITE_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';

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
    const res = await fetch(`${SITE_URL}/api/tnveds/with-page?locale=${locale}`, { cache: 'force-cache' });
    if (!res.ok) return { items: [], pageData: null };

    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const pageData = json?.page || null;

    return { items: data as TnvedItem[], pageData: pageData as TnvedPageData | null };
}

export async function generateMetadata(): Promise<Metadata> {
    const { pageData } = await fetchTnvedData();

    if (!pageData?.seo) {
        return {
            title: 'ТН ВЭД',
            description: 'Классификатор ТН ВЭД',
        };
    }

    return {
        title: pageData.seo.metaTitle || pageData.title || 'ТН ВЭД',
        description: pageData.seo.metaDescription || pageData.description || 'Классификатор ТН ВЭД',
        alternates: {
            canonical: `${BASE_URL}/tnved`,
        },
    };
}

export default async function Page() {
    const { items, pageData } = await fetchTnvedData();
    return <ClientPage initialItems={items} pageData={pageData} />;
}


