// app/okpd/page.tsx
import ClientPage from './ClientPage';

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

async function fetchOkpd2Items(): Promise<Okpd2Item[]> {
    const base = (
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        'https://nvsert.ru'
    ).replace(/\/$/, '');

    const res = await fetch(`${base}/api/okpd2s/with-page?pagination[pageSize]=21000`, {
        cache: 'force-cache',
    });

    if (!res.ok) {
        return [];
    }

    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    console.log(data);
    return data as Okpd2Item[];
}

export default async function Page() {
    const items = await fetchOkpd2Items();
    return <ClientPage initialItems={items} />;
}


