// app/services/[slug]/page.tsx
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { NavigationItem } from '@/types/navigation';
import { getNavigationDataBySlug, resolveServiceOgImageUrl } from './seo-helpers';
import { BASE_URL, SITE_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';


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
  const locale = await getRequestLocale();
  const ogLocale = locale === 'en' ? 'en_US' : 'ru_RU';
  const navigation = await getNavigationDataBySlug(slug);

  if (!navigation) {
    const fallbackTitle = tStatic(locale, 'meta.pages.serviceDetail.fallbackTitle');
    const fallbackDescription = tStatic(locale, 'meta.pages.serviceDetail.fallbackDescription');

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        type: 'article',
        locale: ogLocale,
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
    tStatic(locale, 'meta.pages.serviceDetail.fallbackTitle');

  const description =
    navigation.seo?.metaDescription ||
    navigation.seo_description ||
    tStatic(locale, 'meta.pages.serviceDetail.fallbackDescription');

  const keywords =
    navigation.seo?.metaKeywords ||
    navigation.seo_keywords ||
    tStatic(locale, 'meta.pages.serviceDetail.fallbackKeywords');

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
      locale: ogLocale,
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
  const locale = await getRequestLocale();
  const navigation = await getNavigationDataBySlug(slug);

  if (!navigation) {
    return <div>{tStatic(locale, 'services.notFound')}</div>;
  }

  return <ClientPage initialNavigation={navigation as NavigationItem} />;
}
