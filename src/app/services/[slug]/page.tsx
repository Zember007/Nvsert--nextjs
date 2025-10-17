import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';


async function getNavigationData(): Promise<any[]> {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    const res = await fetch(`${base}/api/services?populate=*&`, { next: { revalidate: false } });
    if (!res.ok) return [];

    const json = await res.json();
    console.log('sortedData',json);

    const data: NavigationItem[] = json?.data || [];
    // Apply the same ordering logic as in navigation slice
    const sortedData = data.sort(
        (a, b) => (a?.category?.order || 0) - (b?.category?.order || 0)
    );
    return sortedData;
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
    const navigation = await getNavigationData();
    return <ClientPage initialNavigation={navigation} initialSlug={slug || ''} />;
};

export default Page;

