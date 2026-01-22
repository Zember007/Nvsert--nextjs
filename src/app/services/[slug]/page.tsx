// app/services/[slug]/page.tsx
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { NavigationItem } from '@/types/navigation';
import { getNavigationDataBySlug, resolveServiceOgImageUrl } from './seo-helpers';
import { BASE_URL, SITE_URL } from 'shared/config/env';


// Генерация статических путей
export async function generateStaticParams() {
  try {
    const res = await fetch(`${SITE_URL}/api/services`, {
      cache: 'force-cache',
    });

    if (!res.ok) {
      console.error(
        `[services][slug] generateStaticParams: failed to fetch services list (${res.status} ${res.statusText})`,
      );
      return [];
    }

    const items = await res.json();
    if (!items?.data || !Array.isArray(items.data)) return [];

    return items.data
      .map((item: { slug?: string }) => (item?.slug ? { slug: item.slug } : null))
      .filter(Boolean) as Array<{ slug: string }>;
  } catch (error) {
    console.error('[services][slug] generateStaticParams failed:', error);
    return [];
  }
}

type GenerateMetadataParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = await params;
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
        canonical: `${BASE_URL}/services/${slug}`,
      },
    };
  }

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
      canonical: `${BASE_URL}/services/${slug}`,
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
