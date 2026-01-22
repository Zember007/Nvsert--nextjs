// Вспомогательные функции для страницы услуг (SEO и данные)
import { SITE_URL, STRAPI_PUBLIC_URL } from 'shared/config/env';

export async function getNavigationDataBySlug(slug: string): Promise<any | null> {
  const res = await fetch(`${SITE_URL}/api/services/slug/${slug}`, {
    cache: 'force-cache',
  });

  if (!res.ok) return null;
  return res.json();
}

// Единое вычисление основного URL картинки услуги (OG / главная фотка)
export function resolveServiceOgImageUrl(navigation: any): string | undefined {
  const cmsBase = STRAPI_PUBLIC_URL;

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


