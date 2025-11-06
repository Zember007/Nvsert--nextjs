// app/[slug]/page.tsx
import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';

async function getNavigationData(slug: string): Promise<NavigationItem | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services/slug/${slug}`, {
    // ⛔️ Убираем next: { revalidate } отсюда, он не нужен
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

// Генерация статических путей
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services/list`);
  const items = await res.json();
  return items.map((item: { slug: string }) => ({ slug: item.slug }));
}

// Страница
export default async function Page({ params }: { params: { slug: string } }) {
  const navigation = await getNavigationData(params.slug);
  if (!navigation) return <div>Service not found</div>;

  return <ClientPage initialNavigation={navigation} initialSlug={params.slug} />;
}

