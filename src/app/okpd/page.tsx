// app/okpd/page.tsx
import ClientPage from './ClientPage';
import { Metadata } from 'next';
import type { OkpdPageData } from '@/widgets/okpd/types';

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
    const base = (
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        'https://nvsert.ru'
    ).replace(/\/$/, '');

    const res = await fetch(`${base}/api/okpd2s/with-page`, {
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

    if (!pageData?.seo) {
        return {
            title: 'ОКПД 2',
            description: 'Классификатор ОКПД 2',
        };
    }

    return {
        title: pageData.seo.metaTitle || pageData.title || 'ОКПД 2',
        description: pageData.seo.metaDescription || pageData.description || 'Классификатор ОКПД 2',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nvsert.ru'}/okpd`,
        },
    };
}

export default async function Page() {
    const { items, pageData } = await fetchOkpd2Data();
    return <ClientPage initialItems={items} pageData={pageData} />;
}


