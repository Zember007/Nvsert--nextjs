import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { BASE_URL, SITE_URL, STRAPI_PUBLIC_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

// Оптимизация: кеширование данных на более длительный срок для ускорения навигации

// Интерфейсы для типизации данных
export interface ContentBlock {
    id: number;
    blockType: string;
    heading: string;
    headingLevel: string;
    richText: string;
    order: number;
    imageCaption?: string;
    image: any;
}

export interface AboutData {
    id: number;
    title: string;
    content: ContentBlock[];
    seo: {
        metaTitle: string;
        metaDescription: string;
        metaKeywords: string;
    };
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    cta?: {
        text: string;
        description: string;
    };
}

// Функция для получения данных о компании
async function getAboutData(): Promise<AboutData | null> {
    try {
        const locale = await getRequestLocale();
        const response = await fetch(`${SITE_URL}/api/about?locale=${locale}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch about data');
        }


        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching about data:', error);
        const locale = await getRequestLocale();
        // Возвращаем fallback данные вместо null
        return {
            id: 1,
            title: tStatic(locale, 'meta.pages.about.title'),
            content: [],
            seo: {
                metaTitle: tStatic(locale, 'meta.pages.about.ogTitle'),
                metaDescription: tStatic(locale, 'meta.pages.about.description'),
                metaKeywords: tStatic(locale, 'meta.pages.about.keywords'),
            },
            seo_title: tStatic(locale, 'meta.pages.about.ogTitle'),
            seo_description: tStatic(locale, 'meta.pages.about.description'),
            seo_keywords: tStatic(locale, 'meta.pages.about.keywords'),
            og_title: tStatic(locale, 'meta.pages.about.ogTitle'),
            og_description: tStatic(locale, 'meta.pages.about.ogDescription')
        };
    }
}



// Функция для генерации метаданных
export async function generateMetadata(): Promise<Metadata> {
    const aboutData = await getAboutData();
    const locale = await getRequestLocale();

    if (!aboutData) {
        return {
            title: tStatic(locale, 'meta.pages.about.title'),
            description: tStatic(locale, 'meta.pages.about.descriptionShort'),
        };
    }

    return {
        title: aboutData.seo.metaTitle || aboutData.title || tStatic(locale, 'meta.pages.about.title'),
        description: aboutData.seo.metaDescription || tStatic(locale, 'meta.pages.about.descriptionShort'),
        keywords: aboutData.seo.metaKeywords || '',
        openGraph: {
            title:
                aboutData.og_title ||
                aboutData.seo_title ||
                aboutData.title ||
                tStatic(locale, 'meta.pages.about.ogTitle'),
            description:
                aboutData.og_description ||
                aboutData.seo_description ||
                tStatic(locale, 'meta.pages.about.ogDescription'),
            images: aboutData.og_image ? [`${STRAPI_PUBLIC_URL}${aboutData.og_image}`] : [],
        },
        alternates: {
            canonical: `${BASE_URL}/about`,
        },
        
    };
}

const AboutCompany = async () => {
    const aboutData = await getAboutData();

    return <ClientPage aboutData={aboutData} />;
};

export default AboutCompany;