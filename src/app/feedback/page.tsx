import ClientPage from './ClientPage';

export const revalidate = 60;

type FeedbackPhoto = {
    url?: string;
    formats?: { thumbnail?: { url?: string } };
    width?: number;
    height?: number;
    name?: string;
    alternativeText?: string;
};

type FeedbackCategory = {
    id: number;
    title?: string;
    slug?: string;
    order?: number;
};

type FeedbackItem = {
    id: number;
    title: string;
    slug?: string;
    order?: number;
    photo?: FeedbackPhoto;
    content?: { body?: string };
    category?: FeedbackCategory;
};

type FeedbackCategoryGroup = {
    id: number;
    title: string;
    slug: string;
    order: number;
    items: FeedbackItem[];
};

async function getFeedbacks(): Promise<FeedbackItem[]> {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    const res = await fetch(`${base}/api/feedbacks`, { next: { revalidate: false } });
    if (!res.ok) return [];
    const json = await res.json();
    console.log(json, 'json');
    return Array.isArray(json?.data) ? json.data : [];
}

function groupByCategory(items: FeedbackItem[]): FeedbackCategoryGroup[] {
    const map = new Map<number, FeedbackCategoryGroup>();
    for (const item of items) {
        const catId = item.category?.id ?? -1;
        const current = map.get(catId);
        if (!current) {
            map.set(catId, {
                id: catId,
                title: item.category?.title || 'Без категории',
                slug: item.category?.slug || 'uncategorized',
                order: item.category?.order ?? 0,
                items: [item]
            });
        } else {
            current.items.push(item);
        }
    }
    const groups = Array.from(map.values());
    for (const g of groups) {
        g.items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title));
    }
    groups.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    return groups;
}

const Page = async () => {
    const items = await getFeedbacks();
    const categories = groupByCategory(items);
    return <ClientPage initialCategories={categories} />;
};

export default Page;


