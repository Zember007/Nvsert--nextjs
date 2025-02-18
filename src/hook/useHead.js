export function generateMetadata(configs, SEO) {
  const headMetadata = {
    title: SEO?.seo_title || SEO?.seo_h1 || SEO?.title || '',
    description: SEO?.seo_description || '',
    keywords: SEO?.seo_keywords || '',
    openGraph: {
      title: SEO?.og_title || SEO?.seo_title || '',
      description: SEO?.og_description || SEO?.seo_description || '',
      images: SEO?.og_image ? [`${process.env.NEXT_PUBLIC_BASE_URL}${SEO.og_image}`] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${configs?.routePath || ''}`,
    },
    // Можете добавить другие метаданные, если нужно
  };

  // Возвращаем объект метаданных
  return {
    title: headMetadata.title,
    description: headMetadata.description,
    keywords: headMetadata.keywords,
    openGraph: headMetadata.openGraph,
    alternates: headMetadata.alternates,
    // Дополнительно можно возвращать другие теги, если нужно
    additionalMeta: [
      { hid: 'keywords', name: 'keywords', content: headMetadata.keywords },
      { hid: 'description', name: 'description', content: headMetadata.description },
      { hid: 'og:title', name: 'og:title', content: headMetadata.openGraph.title },
      { hid: 'og:description', name: 'og:description', content: headMetadata.openGraph.description },
      { hid: 'og:image', name: 'og:image', content: headMetadata.openGraph.images[0] }
    ]
  };
}
