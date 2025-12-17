interface SiteConfigs {
  SITE_NAME?: string;
  SITE_DESCRIPTION?: string;
  SITE_KEYWORDS?: string;
  routePath?: string;
}

interface FileConfigs {
  SITE_IMAGE?: string;
}

interface LayoutMetadata {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
  };
}

export function generateMetadata(
  configs: SiteConfigs,
  fileConfigs: FileConfigs,
): LayoutMetadata {
  return {
    title:
      configs?.SITE_NAME ||
      'Декларирование, сертификация, лицензирование.',
    description: configs?.SITE_DESCRIPTION || '',
    keywords: configs?.SITE_KEYWORDS || '',
    openGraph: {
      title: configs?.SITE_NAME || '',
      description: configs?.SITE_DESCRIPTION || '',
      images: fileConfigs?.SITE_IMAGE
        ? [`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}${fileConfigs.SITE_IMAGE}`]
        : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}${configs?.routePath || ''}`,
    },
  };
}
