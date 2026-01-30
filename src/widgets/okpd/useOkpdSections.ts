import * as React from 'react';
import { useTranslation } from 'react-i18next';
import type { OkpdPageData } from 'widgets/okpd/types';

export type DotNavItem = {
  id: number;
  title: string;
  active?: boolean;
  href: string;
};

export function useOkpdSections(pageData: OkpdPageData | null) {
  const { t } = useTranslation();
  const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);

  const toggleSection = React.useCallback((id: number) => {
    setSectionsOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const dotNavItems = React.useMemo<DotNavItem[]>(() => {
    const base: DotNavItem[] = [
      { id: 1, title: t('okpd.sections.search'), href: `#block-search` },
      { id: 2, title: t('okpd.sections.classifier'), href: `#block-classifier` },
    ];

    const content = pageData?.content?.map((block, _) => ({
      id: block.id,
      title: block.heading,
      href: `#block-${block.id}`,
    })) || [];

    return [...base, ...content];
  }, [pageData, t]);

  return { sectionsOpen, toggleSection, dotNavItems };
}


