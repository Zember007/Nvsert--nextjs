'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CollapseSection } from 'widgets/layout';
import textSize from '@/assets/styles/base/base.module.scss';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import OkpdPrefix from 'widgets/okpd/OkpdPrefix';
import OkpdUnderlineText from 'widgets/okpd/OkpdUnderlineText';
import { VirtualizedList } from 'widgets/home/utils/VirtualizedList';

export type Okpd2Item = {
    id: number;
    documentId: string | null;
    code: string;
    name: string;
    level: number;
    hasChildren: boolean;
    parentCode: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
};

type OkpdSection = { letter: string; name: string; codePrefix: string };

// функция для сравнения кодов
function compareOkpdCodes(a: string, b: string) {
    const aParts = a.split('.').map(x => Number(x));
    const bParts = b.split('.').map(x => Number(x));
    const len = Math.max(aParts.length, bParts.length);
    for (let i = 0; i < len; i++) {
        const av = aParts[i] ?? -1;
        const bv = bParts[i] ?? -1;
        if (av !== bv) return av - bv;
    }
    return 0;
}

/**
 * Автовычисление родителя по логике ОКПД2.
 *
 * Важный нюанс: родитель не всегда получается простым "отрезать сегмент по '.'".
 * Пример:
 * - 01.11 → родитель 01.1 (отрезаем последний символ внутри сегмента "11")
 * - 01.11.1 → родитель 01.11 (убираем сегмент ".1")
 */
function inferOkpdParentCandidate(code: string): string | null {
    const trimmed = code.trim();
    if (!trimmed.includes('.')) return null;

    const parts = trimmed.split('.');
    if (parts.length === 0) return null;

    const lastIdx = parts.length - 1;
    const last = parts[lastIdx] ?? '';

    // если последний сегмент длиннее 1 символа — укорачиваем сегмент на 1 символ
    if (last.length > 1) {
        parts[lastIdx] = last.slice(0, -1);
        return parts.join('.');
    }

    // иначе убираем сегмент целиком
    parts.pop();
    return parts.length ? parts.join('.') : null;
}

function inferExistingParentCode(code: string, codesSet: Set<string>): string | null {
    let parent = inferOkpdParentCandidate(code);
    while (parent && !codesSet.has(parent)) {
        parent = inferOkpdParentCandidate(parent);
    }
    return parent;
}

function formatNodeTitle(node: Pick<Okpd2Item, 'code' | 'name'>) {
    return `${node.code} ${node.name}`;
}

type OkpdRow =
    | { kind: 'h5'; item: Okpd2Item; depth: number }
    | { kind: 'h6'; item: Okpd2Item; depth: number; sectionCode: string }
    | { kind: 'text'; item: Okpd2Item; depth: number; sectionCode: string };

export default function OkpdHierarchy({
    items,
    onSectionVisible,
    isSectionLoaded,
    isSectionLoading,
}: {
    items: Okpd2Item[];
    onSectionVisible?: (section: string) => void;
    isSectionLoaded?: (section: string) => boolean;
    isSectionLoading?: (section: string) => boolean;
}) {
    const { t } = useTranslation();
    const OKPD_SECTIONS = React.useMemo(
        () => (t('okpd.hierarchy.sections', { returnObjects: true }) as OkpdSection[]),
        [t],
    );
    const model = React.useMemo(() => {
        const filtered = (items || []).filter(Boolean);

        // нормализуем код (trim) и убираем дубликаты по code
        const byCode = new Map<string, Okpd2Item>();
        for (const it of filtered) {
            const code = (it.code ?? '').trim();
            if (!code) continue;
            if (!byCode.has(code)) {
                byCode.set(code, { ...it, code });
            }
        }

        const codes = [...byCode.keys()].sort(compareOkpdCodes);
        const codesSet = new Set(codes);

        // вычисляем parent по логике ОКПД (игнорируем item.parentCode — он может быть неверным)
        const parentByCode = new Map<string, string | null>();
        for (const code of codes) {
            parentByCode.set(code, inferExistingParentCode(code, codesSet));
        }

        // собираем дерево: parent -> children[]
        const childrenByParent = new Map<string | null, string[]>();
        for (const code of codes) {
            const parent = parentByCode.get(code) ?? null;
            const arr = childrenByParent.get(parent);
            if (arr) arr.push(code);
            else childrenByParent.set(parent, [code]);
        }
        for (const [k, arr] of childrenByParent.entries()) {
            childrenByParent.set(k, [...arr].sort(compareOkpdCodes));
        }

        return {
            byCode,
            codes,
            parentByCode,
            childrenByParent,
        };
    }, [items]);

    const byParent = React.useMemo(() => {
        const map = new Map<string | null, Okpd2Item[]>();
        for (const [parent, childCodes] of model.childrenByParent.entries()) {
            map.set(
                parent,
                childCodes.map(code => model.byCode.get(code)!).filter(Boolean),
            );
        }
        return map;
    }, [model]);


    const roots = React.useMemo(() => byParent.get(null) ?? [], [byParent]);

    // Observe root section headers (CollapseSection wrappers) and prefetch section data when visible.
    const rootElsRef = React.useRef<Map<string, HTMLDivElement | null>>(new Map());

    const setRootEl = React.useCallback(
        (code: string) => (el: HTMLDivElement | null) => {
            rootElsRef.current.set(code, el);
        },
        [],
    );

    React.useEffect(() => {
        if (!onSectionVisible) return;
        if (typeof IntersectionObserver === 'undefined') return;
        if (!roots.length) return;

        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    const section = (e.target as HTMLElement).dataset.section;
                    if (!section) continue;
                    onSectionVisible(section);
                }
            },
            { root: null, rootMargin: '200px 0px', threshold: 0.01 },
        );

        for (const r of roots) {
            const el = rootElsRef.current.get(r.code);
            if (el) io.observe(el);
        }

        return () => io.disconnect();
    }, [onSectionVisible, roots]);

    const [openRoots, setOpenRoots] = React.useState<string[]>(['01']);

    // Внутреннее раскрытие внутри раздела (мульти-раскрытие: старые пункты не сворачиваются).
    const [expandedByRoot, setExpandedByRoot] = React.useState<Record<string, string[]>>({});
    const [selectedCodeByRoot, setSelectedCodeByRoot] = React.useState<Record<string, string | null>>({});

    const toggleRoot = (code: string) => {
        setOpenRoots(prev =>
            prev.includes(code) ? prev.filter(x => x !== code) : [...prev, code]
        );
    };

    const handleToggleRoot = React.useCallback(
        (code: string) => {
            const currentlyOpen = openRoots.includes(code);
            const willOpen = !currentlyOpen;
            if (willOpen && onSectionVisible) {
                const loaded = isSectionLoaded ? isSectionLoaded(code) : true;
                if (!loaded) onSectionVisible(code);
            }
            toggleRoot(code);
        },
        [openRoots, onSectionVisible, isSectionLoaded],
    );

    const buildVisibleRows = React.useCallback(
        (rootCode: string, expandedSet: Set<string>): OkpdRow[] => {
            const rows: OkpdRow[] = [];

            // depth=0 (после корня) — заголовки h5
            const h5Items = byParent.get(rootCode) ?? [];
            for (const h5 of h5Items) {
                rows.push({ kind: 'h5', item: h5, depth: 0 });

                // depth=1 — список h6 под этим h5 (видим всегда)
                const h6Items = byParent.get(h5.code) ?? [];
                for (const h6 of h6Items) {
                    rows.push({ kind: 'h6', item: h6, depth: 1, sectionCode: h5.code });

                    // дальнейшие уровни показываем по раскрытым узлам
                    const walk = (parentCode: string, depth: number, sectionCode: string) => {
                        const children = byParent.get(parentCode) ?? [];
                        for (const child of children) {
                            rows.push({ kind: 'text', item: child, depth, sectionCode });
                            if (expandedSet.has(child.code)) {
                                walk(child.code, depth + 1, sectionCode);
                            }
                        }
                    };

                    if (expandedSet.has(h6.code)) {
                        walk(h6.code, 2, h5.code);
                    }
                }
            }

            return rows;
        },
        [byParent],
    );


    const OkpdRowContainer = React.useCallback(
        ({ row, children }: { row: OkpdRow; children: React.ReactNode }) => {
            const inSection = row.kind !== 'h5';
            const levelLinesCount = Math.max(0, row.depth - 1);

            return (
                <div className="relative pb-[20px]">
                    {inSection && (
                        <span
                            aria-hidden
                            className="absolute left-0 top-0 bottom-0 border-l border-[#93969d]"
                        />
                    )}

                    {inSection &&
                        Array.from({ length: levelLinesCount }).map((_, idx) => {
                            const level = idx + 1;
                            return (
                                <span
                                    key={level}
                                    aria-hidden
                                    className="absolute top-0 bottom-0 border-l border-[#93969d]"
                                    style={{ left: `${level * 12}px` }}
                                />
                            );
                        })}

                    {children}
                </div>
            );
        },
        [],
    );

    // Функция для определения раздела по коду
    const getSectionForCode = React.useCallback((code: string) => {
        const codeStart = code.split('.')[0]?.trim();
        if (!codeStart) return null;
        
        // Ищем раздел, префикс которого точно совпадает с началом кода
        // Сортируем по длине префикса в убывающем порядке, чтобы сначала проверять более длинные префиксы
        const sortedSections = [...OKPD_SECTIONS].sort((a, b) => b.codePrefix.length - a.codePrefix.length);
        
        return sortedSections.find(section => {
            // Точное совпадение или код начинается с префикса раздела
            return codeStart === section.codePrefix || codeStart.startsWith(section.codePrefix);
        }) || null;
    }, [OKPD_SECTIONS]);

    if (!items?.length) {
        return (
            <div className={`${textSize.text2} font-light text-[#93969d]`}>
                {t('okpd.hierarchy.noData')}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[50px]">
            {roots.map((root, index) => {
                const section = getSectionForCode(root.code);
                const prevRoot = index > 0 ? roots[index - 1] : null;
                const prevSection = prevRoot ? getSectionForCode(prevRoot.code) : null;
                
                // Показываем раздел только если он отличается от предыдущего
                const shouldShowSection = section && section !== prevSection;
                
                const selectedCode = selectedCodeByRoot[root.code] ?? null;
                const expandedCodes = expandedByRoot[root.code] ?? [];
                const expandedSet = new Set(expandedCodes);

                // Активная цепочка для подсветки (синий "переезжает" по последнему выбранному пункту).
                const activeChain = new Set<string>();
                const activeChildByParent = new Map<string, string>();
                if (selectedCode) {
                    let cur: string | null = selectedCode;
                    while (cur) {
                        activeChain.add(cur);
                        const parent: string | null = model.parentByCode.get(cur) ?? null;
                        if (!parent) break;
                        activeChildByParent.set(parent, cur);
                        cur = parent;
                    }
                }

                const rows = buildVisibleRows(root.code, expandedSet);
                const loaded = isSectionLoaded ? isSectionLoaded(root.code) : true;
                const loading = isSectionLoading ? isSectionLoading(root.code) : false;
                
                return (
                    <React.Fragment key={root.code}>
                        {shouldShowSection && (
                            <p className={`${textSize.text2} font-normal text-[#93969D]`}>
                                {t('okpd.hierarchy.sectionLabel', { letter: section.letter, name: section.name })}
                            </p>
                        )}
                        <div
                            ref={setRootEl(root.code)}
                            data-section={root.code}
                        >
                            <CollapseSection
                                title={formatNodeTitle(root)}
                                isOpen={openRoots.includes(root.code)}
                                onToggle={() => handleToggleRoot(root.code)}
                            >
                                {!loaded && (
                                    <div className={`${textSize.text2} font-light text-[#93969d]`}>
                                        {loading ? t('common.loading') : t('common.noDataExpected')}
                                    </div>
                                )}

                                {loaded && (
                                    <VirtualizedList
                                        items={rows}
                                        estimatedItemSize={40}
                                        overscan={20}
                                        useWindowScroll
                                        getItemKey={row => row.item.code}
                                        renderItem={row => {
                                            const item = row.item;
                                            const actualHasChildren = (byParent.get(item.code)?.length ?? 0) > 0 || item.hasChildren;

                                            const isExpanded = expandedSet.has(item.code);
                                            const isActive = selectedCode === item.code;
                                            const hasActiveChild = Boolean(activeChildByParent.get(item.code));
                                            const prefixState: 'default' | 'active' | 'ancestor' =
                                                isActive ? 'active' : hasActiveChild && activeChain.has(item.code) ? 'ancestor' : 'default';

                                            if (row.kind === 'h5') {
                                                return (
                                                    <OkpdRowContainer row={row}>
                                                        <h5 className={`${textSize.headerH6}`}>
                                                            {formatNodeTitle(item)}
                                                        </h5>
                                                    </OkpdRowContainer>
                                                );
                                            }

                                            if (row.kind === 'h6') {
                                                return (
                                                    <OkpdRowContainer row={row}>
                                                        <div className="relative py-[5px]">
                                                            <OkpdPrefix
                                                                position="middle"
                                                                hasChild={actualHasChildren}
                                                                expanded={isExpanded}
                                                                state={prefixState}
                                                            />

                                                            <button
                                                                type="button"
                                                                className={`pl-[12px] text-left active:translate-y-[1px] ${stylesBtn.lineAfterBox}`}
                                                                aria-expanded={actualHasChildren ? isExpanded : undefined}
                                                                onClick={() => {
                                                                    setSelectedCodeByRoot(prev => ({ ...prev, [root.code]: item.code }));
                                                                    if (!actualHasChildren) return;
                                                                    setExpandedByRoot(prev => {
                                                                        const curr = prev[root.code] ?? [];
                                                                        const next = new Set(curr);
                                                                        if (next.has(item.code)) next.delete(item.code);
                                                                        else next.add(item.code);
                                                                        return { ...prev, [root.code]: [...next] };
                                                                    });
                                                                }}
                                                            >
                                                                <OkpdUnderlineText
                                                                    text={formatNodeTitle(item)}
                                                                    className={`${textSize.text1} font-light`}
                                                                    active={isActive}
                                                                />
                                                            </button>
                                                        </div>
                                                    </OkpdRowContainer>
                                                );
                                            }

                                            const textClass =
                                                item.hasChildren || item.level >= 4
                                                    ? `${textSize.text2} font-light`
                                                    : `${textSize.text2} font-normal`;

                                            return (
                                                <OkpdRowContainer row={row}>
                                                    <div style={{ paddingLeft: `${Math.max(0, row.depth - 1) * 12}px` }}>
                                                        <div className="pl-[12px] relative">
                                                            <OkpdPrefix
                                                                position="middle"
                                                                hasChild={actualHasChildren}
                                                                expanded={isExpanded}
                                                                state={prefixState}
                                                            />
                                                            <button
                                                                type="button"
                                                                className={`text-left active:translate-y-[1px] ${stylesBtn.lineAfterBox}`}
                                                                aria-expanded={actualHasChildren ? isExpanded : undefined}
                                                                onClick={() => {
                                                                    setSelectedCodeByRoot(prev => ({ ...prev, [root.code]: item.code }));
                                                                    if (!actualHasChildren) return;

                                                                    setExpandedByRoot(prev => {
                                                                        const curr = prev[root.code] ?? [];
                                                                        const next = new Set(curr);
                                                                        if (next.has(item.code)) next.delete(item.code);
                                                                        else next.add(item.code);
                                                                        return { ...prev, [root.code]: [...next] };
                                                                    });
                                                                }}
                                                            >
                                                                <OkpdUnderlineText
                                                                    text={formatNodeTitle(item)}
                                                                    className={textClass}
                                                                    active={isActive}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </OkpdRowContainer>
                                            );
                                        }}
                                    />
                                )}
                            </CollapseSection>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
}
