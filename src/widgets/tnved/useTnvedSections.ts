import * as React from 'react';
import { useTranslation } from 'react-i18next';
import type { TnvedPageData } from 'widgets/tnved/types';

export type DotNavItem = {
  id: number;
  title: string;
  active?: boolean;
  href: string;
};

export function useTnvedSections(pageData: TnvedPageData | null) {
  const { t } = useTranslation();
  const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);

  const toggleSection = React.useCallback((id: number) => {
    setSectionsOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const dotNavItems = React.useMemo<DotNavItem[]>(() => {
    const base: DotNavItem[] = [
      { id: 1, title: t('tnved.sections.search'), href: `#block-search` },
      { id: 2, title: t('tnved.sections.classifier'), href: `#block-classifier` },
    ];

    const content =
      pageData?.content?.map((block) => ({
        id: block.id,
        title: block.heading,
        href: `#block-${block.id}`,
      })) || [];

    return [...base, ...content];
  }, [pageData, sectionsOpen, t]);

  return { sectionsOpen, toggleSection, dotNavItems };
}

