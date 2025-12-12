export type FeedbackPhoto = {
    url?: string;
    formats?: { thumbnail?: { url?: string } };
    width?: number;
    height?: number;
    name?: string;
    alternativeText?: string;
};

export type FeedbackCategory = {
    id: number;
    title?: string;
    slug?: string;
    order?: number;
};

export type FeedbackItem = {
    id: number;
    title: string;
    slug?: string;
    order?: number;
    photo?: FeedbackPhoto;
    content?: { body?: string };
    category?: FeedbackCategory;
};

export type FeedbackCategoryGroup = {
    id: number;
    title: string;
    slug: string;
    order: number;
    items: FeedbackItem[];
};