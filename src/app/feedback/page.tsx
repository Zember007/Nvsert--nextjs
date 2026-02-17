import ClientPage from './ClientPage';
import { STRAPI_API_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

// Оптимизация: кеширование данных на более длительный срок для ускорения навигации

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
    try {
        const locale = await getRequestLocale();
        const res = await fetch(`${STRAPI_API_URL}/feedbacks?locale=${locale}`, {
            next: { revalidate: 3600 }, // Кешируем на 1 час для лучшей производительности
        });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json?.data) ? json.data : [];
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        return [];
    }
}

function groupByCategory(items: FeedbackItem[], uncategorizedTitle: string): FeedbackCategoryGroup[] {
    const map = new Map<number, FeedbackCategoryGroup>();
    for (const item of items) {
        const catId = item.category?.id ?? -1;
        const current = map.get(catId);
        if (!current) {
            map.set(catId, {
                id: catId,
                title: item.category?.title || uncategorizedTitle,
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
        g.items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    groups.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    // Группа «другие категории» (без категории) всегда в конце
    const uncategorizedIndex = groups.findIndex((g) => g.id === -1 || g.slug === 'uncategorized');
    if (uncategorizedIndex !== -1) {
        const [uncategorized] = groups.splice(uncategorizedIndex, 1);
        groups.push(uncategorized);
    }
    return groups;
}

const Page = async () => {
    const items = await getFeedbacks();
    const locale = await getRequestLocale();
    const categories = groupByCategory(items, tStatic(locale, 'feedback.uncategorized'));
    return <ClientPage initialCategories={categories} />;
};

export default Page;


