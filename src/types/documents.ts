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

export interface MainDocumentItemProps {
    setPhoto: () => void;
    img: StaticImageData;
    index: number;
    title: string;
    content: ContentItem;
    content1: Content1Item[];
    price: string;
    duration: string;
    active: boolean;
    setActive: (value: boolean) => void;
} 