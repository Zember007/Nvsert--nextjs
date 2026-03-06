'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { StandardPageLayout } from 'widgets/layout';
import { useHeaderContext } from 'shared/contexts';
import { TnvedQuickSearchSection } from 'widgets/tnved/TnvedQuickSearchSection';
import type { TnvedItem } from 'widgets/tnved/TnvedHierarchy';
import type { TnvedPageData } from 'widgets/tnved/types';
import { useTnvedSections } from 'widgets/tnved/useTnvedSections';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

const FilesList = dynamic(() => import('widgets/tnved/FilesList'));
const TnvedClassifierSection = dynamic(
    () => import('widgets/tnved/TnvedClassifierSection').then(mod => mod.TnvedClassifierSection),
    {
        loading: () => <div className="h-[420px] rounded bg-[#93969d14]" />,
    },
);
const TnvedInfoSections = dynamic(
    () => import('widgets/tnved/TnvedInfoSections').then(mod => mod.TnvedInfoSections),
    {
        loading: () => <div className="h-[320px] rounded bg-[#93969d14]" />,
    },
);

const ClientPage = ({ initialItems, pageData }: { initialItems: TnvedItem[]; pageData: TnvedPageData | null }) => {
    const { openDefaultModal } = useHeaderContext();
    const { t } = useTranslation();
    const { sectionsOpen, toggleSection, dotNavItems } = useTnvedSections(pageData);

    const [hierarchyItems, setHierarchyItems] = React.useState<TnvedItem[]>(() => initialItems || []);

    const [loadedSections, setLoadedSections] = React.useState<Set<string>>(
        () => new Set(initialItems.length ? ['01'] : []),
    );
    const [loadingSections, setLoadingSections] = React.useState<Set<string>>(() => new Set());
    const loadingRef = React.useRef<Set<string>>(new Set());
    const [showDeferredSections, setShowDeferredSections] = React.useState(false);

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

    React.useEffect(() => {
        const requestIdle = window.requestIdleCallback;
        const cancelIdle = window.cancelIdleCallback;

        if (requestIdle) {
            const idleId = requestIdle(() => setShowDeferredSections(true), { timeout: 1200 });
            return () => cancelIdle(idleId);
        }

        const timer = window.setTimeout(() => setShowDeferredSections(true), 350);
        return () => window.clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        if (initialItems.length > 0) return;
        void ensureSectionLoaded('01');
    }, [ensureSectionLoaded, initialItems.length]);

    return (

        <StandardPageLayout
            title={pageData?.title || t('tnved.page.title')}
            breadcrumbs={[{ id: 2, title: t('tnved.page.title'), full_slug: '/tnved' }]}
            dotNavItems={dotNavItems}
            contentColumn={<FilesList />}
            showButton={true}
        >
            <TnvedQuickSearchSection />

            {showDeferredSections ? (
                <>
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
                </>
            ) : (
                <>
                    <div className="h-[420px] rounded bg-[#93969d14]" />
                    <div className="h-[320px] rounded bg-[#93969d14]" />
                </>
            )}
            
        </StandardPageLayout>

    );
};

export default ClientPage;


