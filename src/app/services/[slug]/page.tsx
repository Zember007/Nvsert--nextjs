// app/services/[slug]/page.tsx
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';
import { getNavigationDataBySlug, resolveServiceOgImageUrl } from './seo-helpers';

export const dynamic = 'force-static';

// Генерация статических путей
export async function generateStaticParams() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nvsert.ru').replace(/\/$/, '');

  const res = await fetch(`${base}/api/services`, {
    cache: 'force-cache',
  });

  const items = await res.json();
  return items.data.map((item: { slug: string }) => ({ slug: item.slug }));
}

type GenerateMetadataParams = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = params;
  const navigation = await getNavigationDataBySlug(slug);

  if (!navigation) {
    const fallbackTitle = 'Услуга - NVSERT';
    const fallbackDescription =
      'Подробная информация об услуге по декларированию, сертификации и лицензированию продукции.';

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        type: 'article',
        locale: 'ru_RU',
      },
      alternates: {
        canonical: `${(process.env.NEXT_PUBLIC_BASE_URL || 'https://nvsert.ru').replace(
          /\/$/,
          ''
        )}/services/${slug}`,
      },
    };
  }

  const base = (process.env.NEXT_PUBLIC_BASE_URL || 'https://nvsert.ru').replace(/\/$/, '');

  const title =
    navigation.seo?.metaTitle ||
    navigation.seo_title ||
    navigation.title ||
    'Услуга - NVSERT';

  const description =
    navigation.seo?.metaDescription ||
    navigation.seo_description ||
    'Подробная информация об услуге по декларированию, сертификации и лицензированию продукции.';

  const keywords =
    navigation.seo?.metaKeywords ||
    navigation.seo_keywords ||
    'услуги сертификации, декларирование, лицензирование, NVSERT';

  const ogImageUrl = resolveServiceOgImageUrl(navigation);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: navigation.og_title || navigation.seo_title || title,
      description: navigation.og_description || navigation.seo_description || description,
      images: ogImageUrl ? [ogImageUrl] : [],
      type: 'article',
      locale: 'ru_RU',
    },
    alternates: {
      canonical: `${base}/services/${slug}`,
    },
  };
}

// Страница
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const navigation = await getNavigationDataBySlug(slug);

  if (!navigation) {
    return <div>Service not found</div>;
  }

  return <ClientPage initialNavigation={navigation as NavigationItem} />;
}
