// app/services/[slug]/page.tsx
import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';

// Оптимизация: кеширование данных на более длительный срок для ускорения навигации
export const revalidate = 3600; // ISR: перевалидация каждые 60 минут

async function getNavigationDataBySlug(slug: string): Promise<NavigationItem | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/services/slug/${slug}`,
    {
      next: { revalidate: 3600 }, // Кешируем на 1 час для лучшей производительности
    }
  );

  if (!res.ok) return null;
  return res.json();
}

// Генерация статических путей
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/services`,
    {
      next: { revalidate: 3600 }, // Кешируем на 1 час
    }
  );

  const items = await res.json();
  return items.data.map((item: { slug: string }) => ({ slug: item.slug }));
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

  return <ClientPage initialNavigation={navigation} initialSlug={slug} />;
}
