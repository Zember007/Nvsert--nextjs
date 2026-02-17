import { cache } from 'react';
import { NavigationItem, Services } from '@/types/navigation';
import { STRAPI_API_URL } from 'shared/config/env';

// Кэшируем результат на уровне модуля и используем build‑time fetch,
// чтобы навигация подгружалась один раз при билде и не дергала API на каждой странице.
export const getNavigationData = cache(async (): Promise<NavigationItem[]> => {
  try {
    const res = await fetch(`${STRAPI_API_URL}/services`, {
      cache: 'force-cache',
    });


    if (!res.ok) {
      console.error('Failed to fetch navigation:', res.statusText);
      return [];
    }

    const data = await res.json();
    console.log('data', data);

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
});

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


