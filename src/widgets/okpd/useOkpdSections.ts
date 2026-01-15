import * as React from 'react';
import type { OkpdPageData } from '@/widgets/okpd/types';

export type DotNavItem = {
  id: number;
  title: string;
  active?: boolean;
  href: string;
};

export function useOkpdSections(pageData: OkpdPageData | null) {
  const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);

  const toggleSection = React.useCallback((id: number) => {
    setSectionsOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const dotNavItems = React.useMemo<DotNavItem[]>(() => {
    const base: DotNavItem[] = [
      { id: 1, title: 'Быстрый поиск кода ОКПД\u00A02', href: `#block-search` },
      { id: 2, title: 'Классификатор ОКПД 2', href: `#block-classifier` },
    ];

    const content = pageData?.content?.map((block, _) => ({
      id: block.id,
      title: block.heading,
      href: `#block-${block.id}`,
    })) || [];

    return [...base, ...content];
  }, [pageData, sectionsOpen]);

  return { sectionsOpen, toggleSection, dotNavItems };
}


