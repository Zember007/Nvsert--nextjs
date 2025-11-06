import ClientPage from './ClientPage';
import { NavigationItem } from '@/store/navigation';


async function getNavigationData(slug: string): Promise<NavigationItem | null> {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

    const res = await fetch(`${base}/api/services/slug/${slug}`, { next: { revalidate: 60 } });

    if (!res.ok) return null;


    const json = await res.json();

    console.log('json', json);


    const data: NavigationItem | null = json || null;

    return data;
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
    const navigation = await getNavigationData(slug);
    console.log('navigation', navigation, slug);

    if (!navigation) {
        return <div>Service not found</div>;
    }

    return <ClientPage initialNavigation={navigation} initialSlug={slug || ''} />;
};

export default Page;

