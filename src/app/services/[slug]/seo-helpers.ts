// Вспомогательные функции для страницы услуг (SEO и данные)
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

/**
 * Returns a plain serializable copy of the API response.
 * Avoids "Internal Server Error" when passing props to Client Components
 * (Strapi/API may return circular refs or non-JSON-serializable values).
 */
function toSerializable<T>(data: T): T {
  try {
    return JSON.parse(JSON.stringify(data)) as T;
  } catch {
    return data;
  }
}

export async function getNavigationDataBySlug(slug: string): Promise<any | null> {
  try {
    const res = await fetch(`${STRAPI_PUBLIC_URL}/api/services/slug/${slug}`, {
      cache: 'force-cache',
    });

    if (!res.ok) return null;
    const raw = await res.json();
    return toSerializable(raw);
  } catch (error) {
    console.error('[services][slug] getNavigationDataBySlug failed:', error);
    return null;
  }
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


