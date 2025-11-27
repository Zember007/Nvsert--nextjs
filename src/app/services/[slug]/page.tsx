// app/services/[slug]/page.tsx
import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';

export const dynamic = "force-static";

async function getNavigationDataBySlug(slug: string): Promise<NavigationItem | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/services/slug/${slug}`,
    {
      cache: "force-cache",
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
      cache: "force-cache",
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
