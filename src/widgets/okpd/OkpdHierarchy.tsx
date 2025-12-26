'use client';

import React from 'react';
import { CollapseSection } from 'widgets/layout';
import textSize from '@/assets/styles/base/base.module.scss';
import OkpdPrefix from '@/widgets/okpd/OkpdPrefix';
import { VirtualizedList } from '@/widgets/home/utils/VirtualizedList';

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

export default function OkpdHierarchy({ items }: { items: Okpd2Item[] }) {
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

    const [openRoots, setOpenRoots] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (roots.length === 0) return;
        setOpenRoots(prev => (prev.length ? prev : [roots[0].code]));
    }, [roots]);

    const toggleRoot = (code: string) => {
        setOpenRoots(prev =>
            prev.includes(code) ? prev.filter(x => x !== code) : [...prev, code]
        );
    };

    const flattenSubtreeRows = React.useCallback(
        (rootCode: string): OkpdRow[] => {
            const result: OkpdRow[] = [];

            const walk = (code: string, depth: number, sectionCode: string | null) => {
                const children = byParent.get(code) ?? [];

                for (const child of children) {
                    const childHasChildren = (byParent.get(child.code)?.length ?? 0) > 0;
                    if (depth === 0) {
                        // первый уровень после корня — всегда h5 (без префикса)
                        result.push({
                            kind: 'h5',
                            item: child,
                            depth: 0,
                        });
                        if (childHasChildren) {
                            walk(child.code, 1, child.code); // рекурсия
                        }
                    } else if (depth === 1) {
                        // второй уровень — h6
                        result.push({
                            kind: 'h6',
                            item: child,
                            depth: 1,
                            sectionCode: sectionCode!,
                        });
                        if (childHasChildren) {
                            walk(child.code, 2, sectionCode);
                        }
                    } else {
                        // третий уровень и далее — text
                        result.push({
                            kind: 'text',
                            item: child,
                            depth,
                            sectionCode: sectionCode!,
                        });

                        if (childHasChildren) {
                            walk(child.code, depth + 1, sectionCode);
                        }
                    }
                }
            };

            walk(rootCode, 0, null);
            return result;
        },
        [byParent],
    );


    const OkpdRowContainer = React.useCallback(
        ({ row, children }: { row: OkpdRow; children: React.ReactNode }) => {
            const inSection = row.kind !== 'h5';
            const blueLinesCount = Math.max(0, row.depth - 1);

            return (
                <div className="relative pb-[20px]">
                    {inSection && (
                        <span
                            aria-hidden
                            className="absolute left-0 top-0 bottom-0 border-l border-[#93969d]"
                        />
                    )}

                    {inSection &&
                        Array.from({ length: blueLinesCount }).map((_, idx) => {
                            const level = idx + 1;
                            return (
                                <span
                                    key={level}
                                    aria-hidden
                                    className="absolute top-0 bottom-0 border-l border-[#34446D]"
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

    if (!items?.length) {
        return (
            <div className={`${textSize.text2} font-light text-[#93969d]`}>
                Нет данных ОКПД 2
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[20px]">
            {roots.map(root => {
                const rows = flattenSubtreeRows(root.code);
                return (
                    <CollapseSection
                        key={root.code}
                        title={formatNodeTitle(root)}
                        isOpen={openRoots.includes(root.code)}
                        onToggle={() => toggleRoot(root.code)}
                    >
                        <VirtualizedList
                            items={rows}
                            estimatedItemSize={40}
                            overscan={20}
                            useWindowScroll
                            getItemKey={row => row.item.code}
                            renderItem={row => {
                                const item = row.item;

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
                                                <OkpdPrefix position="bottom" hasChild={true} />
                                                <h6 className={`${textSize.text1} pl-[12px]`}>
                                                    {formatNodeTitle(item)}
                                                </h6>
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
                                                <OkpdPrefix position="middle" hasChild={item.hasChildren} />
                                                <span className={textClass}>{formatNodeTitle(item)}</span>
                                            </div>
                                        </div>
                                    </OkpdRowContainer>
                                );
                            }}
                        />
                    </CollapseSection>
                );
            })}
        </div>
    );
}
