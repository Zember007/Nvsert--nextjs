import * as React from 'react';
import type { TnvedPageData } from '@/widgets/tnved/types';

export type DotNavItem = {
  id: number;
  title: string;
  active?: boolean;
  href: string;
};

export function useTnvedSections(pageData: TnvedPageData | null) {
  const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);

  const toggleSection = React.useCallback((id: number) => {
    setSectionsOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const dotNavItems = React.useMemo<DotNavItem[]>(() => {
    const base: DotNavItem[] = [
      { id: 1, title: 'Быстрый поиск кода ТН\u00A0ВЭД', href: `#block-search` },
      { id: 2, title: 'Классификатор ТН\u00A0ВЭД', href: `#block-classifier` },
    ];

    const content =
      pageData?.content?.map((block) => ({
        id: block.id,
        title: block.heading,
        href: `#block-${block.id}`,
      })) || [];

    return [...base, ...content];
  }, [pageData, sectionsOpen]);

  return { sectionsOpen, toggleSection, dotNavItems };
}

