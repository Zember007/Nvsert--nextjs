export function generateMetadata(configs, fileConfigs) {  
  return {
    title: configs?.SITE_NAME || 'Декларирование, сертификация, лицензирование.',
    description: configs?.SITE_DESCRIPTION || '',
    keywords: configs?.SITE_KEYWORDS || '',
    openGraph: {
      title: configs?.SITE_NAME || '',
      description: configs?.SITE_DESCRIPTION || '',
      images: fileConfigs?.SITE_IMAGE ? [`${process.env.NEXT_PUBLIC_BASE_URL}${fileConfigs.SITE_IMAGE}`] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${configs?.routePath || ''}`,
    },

  };
}