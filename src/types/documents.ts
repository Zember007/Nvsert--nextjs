import type { DotNavItemProps } from 'widgets/layout';



export interface documentsList {
    id: number;
    value: string;
}

export interface MainDocumentItemProps {
    navigationList: DotNavItemProps[];
    img?: any;
    title: string;
    link: string;
    content: string;
    documentsList: documentsList[];
    price: string;
    duration: string;
    active: boolean;
    setActive: (value: boolean) => void;
    totalItems?: number;
    index?: number;
} 