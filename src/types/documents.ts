import { StaticImageData } from 'next/image';

export interface ContentItem {
    text: string;
    text1?: string;
}

export interface Content1Item {
    title: string;
    subtitle?: string;
    list: string[];
}

// Интерфейс для изображения из URL
export interface ImageFromUrl {
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
    blurWidth: number;
    blurHeight: number;
}

export interface MainDocumentItemProps {
    setPhoto: () => void;
    img: ImageFromUrl;
    index: number;
    title: string;
    content: ContentItem;
    content1: Content1Item[];
    price: string;
    duration: string;
    active: boolean;
    setActive: (value: boolean) => void;
}

// Новый интерфейс для данных навигации
export interface NavigationDocumentItem {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    duration: string;
    price: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    documents: Array<{
        id: number;
        value: string;
    }>;
    img: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            medium: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            small: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    category: {
        id: number;
        documentId: string;
        name: string;
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
} 