export interface ContentBlock {
  id: number;
  blockType: string;
  heading: string;
  headingLevel: string;
  richText: string;
  order: number;
  imageCaption?: string | null;
  image?: any;
}

export interface TnvedPageData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: ContentBlock[];
  cta?: {
    id: number;
    text: string;
    style: string;
    description: string;
  };
  seo?: {
    id: number;
    metaTitle: string;
    metaDescription: string;
  };
}

