'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useHeaderContext } from 'shared/contexts';
import { OkpdQuickSearchSection } from 'widgets/okpd/OkpdQuickSearchSection';
import type { Okpd2Item } from 'widgets/okpd/OkpdHierarchy';
import type { OkpdPageData } from 'widgets/okpd/types';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

const OkpdClassifierSection = dynamic(
    () => import('widgets/okpd/OkpdClassifierSection').then(m => m.OkpdClassifierSection),
    {
        ssr: false,
        loading: () => (
            <div className="w-full">
                <div className="h-8 w-1/3 bg-[#93969d26] rounded mb-[20px]" />
                <div className="h-[420px] bg-[#93969d1a] rounded" />
            </div>
        ),
    },
);

const OkpdInfoSections = dynamic(
    () => import('widgets/okpd/OkpdInfoSections').then(m => m.OkpdInfoSections),
    {
        ssr: false,
        loading: () => (
            <div className="w-full flex flex-col gap-[30px]">
                <div className="h-[180px] bg-[#93969d1a] rounded" />
                <div className="h-[180px] bg-[#93969d1a] rounded" />
            </div>
        ),
    },
);

const ClientPage = ({
    initialItems,
    pageData,
    preloadedSections = [],
}: {
    initialItems: Okpd2Item[];
    pageData: OkpdPageData | null;
    preloadedSections?: string[];
}) => {
    const { openDefaultModal } = useHeaderContext();
    const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);
    const [isDeferredUiReady, setIsDeferredUiReady] = React.useState(false);

    const [hierarchyItems, setHierarchyItems] = React.useState<Okpd2Item[]>(() => initialItems || []);

    const [loadedSections, setLoadedSections] = React.useState<Set<string>>(
        () => new Set((preloadedSections || []).filter(section => /^\d{2}$/.test(section))),
    );
    const [loadingSections, setLoadingSections] = React.useState<Set<string>>(() => new Set());
    const loadingRef = React.useRef<Set<string>>(new Set());

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
    const toggleSection = React.useCallback((id: number) => {
        setSectionsOpen(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    }, []);

    React.useEffect(() => {
        const requestIdle = window.requestIdleCallback;
        const cancelIdle = window.cancelIdleCallback;

        if (requestIdle) {
            const id = requestIdle(() => setIsDeferredUiReady(true), { timeout: 1200 });
            return () => cancelIdle(id);
        }

        const timer = window.setTimeout(() => setIsDeferredUiReady(true), 250);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <>
            <OkpdQuickSearchSection />
            {isDeferredUiReady && (
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
            )}
        </>
    );
};

export default ClientPage;


