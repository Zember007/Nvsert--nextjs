'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { StandardPageLayout } from 'widgets/layout';
import { useHeaderContext } from 'shared/contexts';
import { OkpdQuickSearchSection } from 'widgets/okpd/OkpdQuickSearchSection';
import type { Okpd2Item } from 'widgets/okpd/OkpdHierarchy';
import type { OkpdPageData } from 'widgets/okpd/types';
import { useOkpdSections } from 'widgets/okpd/useOkpdSections';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

const FilesList = dynamic(() => import('widgets/okpd/FilesList'));
const OkpdClassifierSection = dynamic(
    () => import('widgets/okpd/OkpdClassifierSection').then(mod => mod.OkpdClassifierSection),
    {
        loading: () => <div className="h-[420px] rounded bg-[#93969d14]" />,
    },
);
const OkpdInfoSections = dynamic(
    () => import('widgets/okpd/OkpdInfoSections').then(mod => mod.OkpdInfoSections),
    {
        loading: () => <div className="h-[320px] rounded bg-[#93969d14]" />,
    },
);

const ClientPage = ({ initialItems, pageData }: { initialItems: Okpd2Item[]; pageData: OkpdPageData | null }) => {
    const { openDefaultModal } = useHeaderContext();
    const { t } = useTranslation();
    const { sectionsOpen, toggleSection, dotNavItems } = useOkpdSections(pageData);

    const [hierarchyItems, setHierarchyItems] = React.useState<Okpd2Item[]>(() => initialItems || []);

    const [loadedSections, setLoadedSections] = React.useState<Set<string>>(
        () => new Set(initialItems.length ? ['01'] : []),
    );
    const [loadingSections, setLoadingSections] = React.useState<Set<string>>(() => new Set());
    const loadingRef = React.useRef<Set<string>>(new Set());
    const [showDeferredSections, setShowDeferredSections] = React.useState(false);

    const mergeByCode = React.useCallback((prev: Okpd2Item[], next: Okpd2Item[]) => {
        const map = new Map<string, Okpd2Item>();
        for (const it of prev) {
            const code = (it?.code ?? '').trim();
            if (!code) continue;
            map.set(code, { ...it, code });
        }
        for (const it of next) {
            const code = (it?.code ?? '').trim();
            if (!code) continue;
            const existing = map.get(code);
            map.set(code, existing ? ({ ...existing, ...it, code } as Okpd2Item) : ({ ...it, code } as Okpd2Item));
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
                const res = await fetch(`${STRAPI_PUBLIC_URL}/api/okpd2s/section/${s}?locale=${locale}`);
                if (!res.ok) return;
                const json = await res.json();
                const data = Array.isArray(json?.data) ? (json.data as Okpd2Item[]) : Array.isArray(json) ? (json as Okpd2Item[]) : [];

                setHierarchyItems(prev => mergeByCode(prev, data));
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
        [loadedSections, mergeByCode],
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
            title={pageData?.title || t('okpd.page.title')}
            breadcrumbs={[{ id: 2, title: t('okpd.page.title'), full_slug: '/okpd' }]}
            dotNavItems={dotNavItems}
            contentColumn={<FilesList />}
            showButton={true}
        >
            <OkpdQuickSearchSection />

            {showDeferredSections ? (
                <>
                    <OkpdClassifierSection
                        items={hierarchyItems}
                        onSectionVisible={onSectionVisible}
                        isSectionLoaded={isSectionLoaded}
                        isSectionLoading={isSectionLoading}
                    />

                    <OkpdInfoSections
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


