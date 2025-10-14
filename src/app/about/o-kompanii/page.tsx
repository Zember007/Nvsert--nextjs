import ClientPage from './ClientPage';
import { Metadata } from 'next';

// Интерфейсы для типизации данных
interface ContentBlock {
    id: number;
    blockType: string;
    heading: string;
    headingLevel: string;
    richText: string;
    order: number;
}

interface AboutData {
    id: number;
    title: string;
    content: ContentBlock[];
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
}

// Функция для получения данных о компании
async function getAboutData(): Promise<AboutData | null> {
    try {
        const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
        const response = await fetch(`${base}/api/services`, { next: { revalidate: 60 } });
        
        if (!response.ok) {
            throw new Error('Failed to fetch about data');
        }
        
        const result = await response.json();
        return result.data || null;
    } catch (error) {
        console.error('Error fetching about data:', error);
        return null;
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
        title: aboutData.seo_title || aboutData.title || 'О компании',
        description: aboutData.seo_description || 'Информация о нашей компании',
        keywords: aboutData.seo_keywords || '',
        openGraph: {
            title: aboutData.og_title || aboutData.seo_title || aboutData.title || 'О компании',
            description: aboutData.og_description || aboutData.seo_description || 'Информация о нашей компании',
            images: aboutData.og_image ? [`${process.env.NEXT_PUBLIC_BASE_URL}${aboutData.og_image}`] : [],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about/o-kompanii`,
        },
    };
}

const AboutCompany = async () => {
    const aboutData = await getAboutData();
    
    return <ClientPage aboutData={aboutData} />;
};

export default AboutCompany;