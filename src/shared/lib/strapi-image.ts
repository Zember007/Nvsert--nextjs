/**
 * Преобразует URL медиа из Strapi (например /uploads/medium_01.webp или https://.../uploads/2024/01/photo.jpg)
 * в путь к локальному API изображений, который читает файлы с диска /var/www/html/strapi/public/uploads.
 * Используется с next/image для оптимизации без unoptimized.
 */
export function getStrapiImageApiPath(strapiUrl: string | undefined | null): string {
  if (!strapiUrl || typeof strapiUrl !== 'string') return '';
  try {
    const pathname = strapiUrl.startsWith('http') ? new URL(strapiUrl).pathname : strapiUrl;
    const normalized = pathname.replace(/^\/+/, '').replace(/^uploads\/?/, '');
    if (!normalized) return '';
    return `/api/image?file=${encodeURIComponent(normalized)}`;
  } catch {
    return '';
  }
}
