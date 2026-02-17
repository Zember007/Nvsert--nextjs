'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardPageLayout } from 'widgets/layout';
import { useHeaderContext } from 'shared/contexts';
import FilesList from 'widgets/tnved/FilesList';
import { TnvedQuickSearchSection } from 'widgets/tnved/TnvedQuickSearchSection';
import { TnvedClassifierSection } from 'widgets/tnved/TnvedClassifierSection';
import type { TnvedItem } from 'widgets/tnved/TnvedHierarchy';
import type { TnvedPageData } from 'widgets/tnved/types';
import { useTnvedSections } from 'widgets/tnved/useTnvedSections';
import { TnvedInfoSections } from 'widgets/tnved/TnvedInfoSections';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

const ClientPage = ({ initialItems, pageData }: { initialItems: TnvedItem[]; pageData: TnvedPageData | null }) => {
    const { openDefaultModal } = useHeaderContext();
    const { t } = useTranslation();
    const { sectionsOpen, toggleSection, dotNavItems } = useTnvedSections(pageData);

    const [hierarchyItems, setHierarchyItems] = React.useState<TnvedItem[]>(() => initialItems || []);

    const [loadedSections, setLoadedSections] = React.useState<Set<string>>(() => new Set(['01']));
    const [loadingSections, setLoadingSections] = React.useState<Set<string>>(() => new Set());
    const loadingRef = React.useRef<Set<string>>(new Set());

    const mergeByNodeId = React.useCallback((prev: TnvedItem[], next: TnvedItem[]) => {
        const map = new Map<number, TnvedItem>();
        for (const it of prev) {
            if (!it || typeof it.nodeId !== 'number') continue;
            map.set(it.nodeId, it);
        }
        for (const it of next) {
            if (!it || typeof it.nodeId !== 'number') continue;
            const existing = map.get(it.nodeId);
            map.set(it.nodeId, existing ? ({ ...existing, ...it } as TnvedItem) : (it as TnvedItem));
        }
        return [...map.values()];
    }, []);

    const ensureSectionLoaded = React.useCallback(
        async (section: string) => {
            const s = (section || '').trim();
            if (!/^\d{2}$/.test(s)) return;
            if (loadedSections.has(s)) return;
            if (loadingRef.current.has(s)) return;

            loadingRef.current.add(s);
            setLoadingSections(prev => {
                const next = new Set(prev);
                next.add(s);
                return next;
            });

            try {
                const locale = document?.documentElement?.lang === 'en' ? 'en' : 'ru';
                const res = await fetch(`${STRAPI_PUBLIC_URL}/api/tnveds/chapter/${s}?locale=${locale}`);
                if (!res.ok) return;
                const json = await res.json();
                const data = Array.isArray(json?.data)
                    ? (json.data as TnvedItem[])
                    : Array.isArray(json)
                      ? (json as TnvedItem[])
                      : [];

                setHierarchyItems(prev => mergeByNodeId(prev, data));
                setLoadedSections(prev => {
                    const next = new Set(prev);
                    next.add(s);
                    return next;
                });
            } finally {
                loadingRef.current.delete(s);
                setLoadingSections(prev => {
                    const next = new Set(prev);
                    next.delete(s);
                    return next;
                });
            }
        },
        [loadedSections, mergeByNodeId],
    );

    const onSectionVisible = React.useCallback(
        (section: string) => {
            void ensureSectionLoaded(section);
        },
        [ensureSectionLoaded],
    );

    const isSectionLoaded = React.useCallback((section: string) => loadedSections.has(section), [loadedSections]);
    const isSectionLoading = React.useCallback((section: string) => loadingSections.has(section), [loadingSections]);

    return (

        <StandardPageLayout
            title={pageData?.title || t('tnved.page.title')}
            breadcrumbs={[{ id: 2, title: t('tnved.page.title'), full_slug: '/tnved' }]}
            dotNavItems={dotNavItems}
            contentColumn={<FilesList />}
            showButton={true}
        >
            <TnvedQuickSearchSection />
            <TnvedClassifierSection
                items={hierarchyItems}
                onSectionVisible={onSectionVisible}
                isSectionLoaded={isSectionLoaded}
                isSectionLoading={isSectionLoading}
            />

            <TnvedInfoSections
                pageData={pageData}
                sectionsOpen={sectionsOpen}
                onToggleSection={toggleSection}
                onCtaClick={() => openDefaultModal('introForm')}
            />
            
        </StandardPageLayout>

    );
};

export default ClientPage;


