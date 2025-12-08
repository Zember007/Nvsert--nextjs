


export interface NavigationItem {
  id: number;
  cta: any;
  documentId: string;
  title: string;
  slug: string;
  duration: string;
  price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documents: any[];
  img: any;
  category: any;
  content?: ContentBlock[];
}

export interface ContentBlock {
  id: number;
  order: number;
  blockType: string;
  heading: string;
  headingLevel: string;
  text?: string | null;
  richText?: string;
  imageCaption?: string;
  image: any;

}

export interface Image {
  id: number;
  name: string;
  formats: {
    thumbnail: ImageTypeFormat;
    small: ImageTypeFormat;
    medium: ImageTypeFormat;
  }
}


export interface ImageTypeFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}


export interface Services {
  items: NavigationItem[];
  id: number;
  name: string;
  title: string;
  description: string;
}



interface NavigationState {
  navigation: NavigationItem[];
  services: Services[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}









