import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { TnvedPageData } from '@/widgets/tnved/types';

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
    const base = (
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        'https://nvsert.ru'
    ).replace(/\/$/, '');

    const res = await fetch(`${base}/api/tnveds/with-page`, { cache: 'force-cache' });
    if (!res.ok) return { items: [], pageData: null };

    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const pageData = json?.page || null;

    console.log(data);

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
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nvsert.ru'}/tnved`,
        },
    };
}

export default async function Page() {
    const { items, pageData } = await fetchTnvedData();
    return <ClientPage initialItems={items} pageData={pageData} />;
}


