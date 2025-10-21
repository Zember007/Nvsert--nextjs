import ClientPage from './ClientPage';
import { Metadata } from 'next';

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
        const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
        const response = await fetch(`${base}/api/about?populate=*`, { next: { revalidate: false } });
        
        if (!response.ok) {
            throw new Error('Failed to fetch about data');
        }

        
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching about data:', error);
        // Возвращаем fallback данные вместо null
        return {
            id: 1,
            title: 'О компании',
            content: [],
            seo: {
                metaTitle: 'О компании - NVSERT',
                metaDescription: 'Информация о нашей компании, принципах работы и команде профессионалов',
                metaKeywords: 'о компании, веб-разработка, команда, принципы',
            },
            seo_title: 'О компании - NVSERT',
            seo_description: 'Информация о нашей компании, принципах работы и команде профессионалов',
            seo_keywords: 'о компании, веб-разработка, команда, принципы',
            og_title: 'О компании - NVSERT',
            og_description: 'Информация о нашей компании, принципах работы и команде профессионалов'
        };
    }
}



// Функция для генерации метаданных
export async function generateMetadata(): Promise<Metadata> {
    const aboutData = await getAboutData();
    
    if (!aboutData) {
        return {
            title: 'О компании',
            description: 'Информация о нашей компании',
        };
    }

    return {
        title: aboutData.seo.metaTitle || aboutData.title || 'О компании',
        description: aboutData.seo.metaDescription || 'Информация о нашей компании',
        keywords: aboutData.seo.metaKeywords || '',
        openGraph: {
            title: aboutData.og_title || aboutData.seo_title || aboutData.title || 'О компании',
            description: aboutData.og_description || aboutData.seo_description || 'Информация о нашей компании',
            images: aboutData.og_image ? [`${process.env.NEXT_PUBLIC_BASE_URL}${aboutData.og_image}`] : [],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
        },
    };
}

const AboutCompany = async () => {
    const aboutData = await getAboutData();
    
    return <ClientPage aboutData={aboutData} />;
};

export default AboutCompany;