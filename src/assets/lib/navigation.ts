import { NavigationItem, Services } from '@/store/navigation';

export async function getNavigationData(): Promise<NavigationItem[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://nvsert.ru';
    const res = await fetch(`${baseUrl}/api/services`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error('Failed to fetch navigation:', res.statusText);
      return [];
    }

    const data = await res.json();
    const navigationItems: NavigationItem[] = data.data || [];

    // Sort by category order to ensure stable UI
    const sortedData = navigationItems.sort(
      (a, b) => (a?.category?.order || 0) - (b?.category?.order || 0)
    );

    return sortedData;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
}

export function groupServices(navigation: NavigationItem[]): Services[] {
  return navigation.reduce<Services[]>((acc, item) => {
    const catId = item.category.id;
    let accFind = acc.find((entry) => entry.id === catId);
    if (!accFind) {
      accFind = {
        id: item.category.id,
        name: item.category.name,
        title: item.category.title,
        description: item.category.description,
        items: [],
      };
      acc.push(accFind);
    }
    accFind.items.push(item);
    return acc;
  }, []);
}


