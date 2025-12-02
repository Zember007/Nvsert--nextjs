// app/services/[slug]/page.tsx
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';

export const dynamic = 'force-static';

export async function getNavigationDataBySlug(slug: string): Promise<any | null> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nvsert.ru').replace(/\/$/, '');

  const res = await fetch(`${base}/api/services/slug/${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) return null;
  return res.json();
}

// Единое вычисление основного URL картинки услуги (OG / главная фотка)
export function resolveServiceOgImageUrl(navigation: any): string | undefined {
  const cmsBase = 'https://test11.audiosector.ru/cp';

  // 1. Явный og_image
  if (navigation?.og_image && typeof navigation.og_image === 'string') {
    return navigation.og_image.startsWith('http')
      ? navigation.og_image
      : `${cmsBase}${navigation.og_image}`;
  }

  // 2. Картинка в формате medium
  const mediumUrl = navigation?.img?.formats?.medium?.url;
  if (typeof mediumUrl === 'string' && mediumUrl) {
    return mediumUrl.startsWith('http') ? mediumUrl : `${cmsBase}${mediumUrl}`;
  }

  // 3. Обычный URL картинки
  const imgUrl = navigation?.img?.url;
  if (typeof imgUrl === 'string' && imgUrl) {
    return imgUrl.startsWith('http') ? imgUrl : `${cmsBase}${imgUrl}`;
  }

  return undefined;
}

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
  params: { slug: string };
}) {
  const { slug } = params;
  const navigation = await getNavigationDataBySlug(slug);

  if (!navigation) {
    return <div>Service not found</div>;
  }

  return <ClientPage initialNavigation={navigation as NavigationItem} />;
}
