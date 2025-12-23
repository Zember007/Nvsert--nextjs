'use client';

import React from 'react';
import { CollapseSection } from 'widgets/layout';
import textSize from '@/assets/styles/base/base.module.scss';
import OkpdPrefix from '@/widgets/okpd/OkpdPrefix';

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

function formatNodeTitle(node: Pick<Okpd2Item, 'code' | 'name'>) {
    return `${node.code} ${node.name}`;
}

export default function OkpdHierarchy({ items }: { items: Okpd2Item[] }) {
    const normalized = React.useMemo(() => {
        const filtered = (items || []).filter(Boolean);
        return [...filtered].sort((a, b) => compareOkpdCodes(a.code, b.code));
    }, [items]);

    const byParent = React.useMemo(() => {
        const map = new Map<string | null, Okpd2Item[]>();
        for (const item of normalized) {
            const key = item.parentCode ?? null;
            const arr = map.get(key);
            if (arr) arr.push(item);
            else map.set(key, [item]);
        }
        // ensure children are sorted
        for (const [k, arr] of map.entries()) {
            map.set(k, [...arr].sort((a, b) => compareOkpdCodes(a.code, b.code)));
        }
        return map;
    }, [normalized]);

    const roots = React.useMemo(() => byParent.get(null) ?? [], [byParent]);
    const [openRoots, setOpenRoots] = React.useState<string[]>(
        roots.map(c => c.code)
    );

    React.useEffect(() => {
        // If data loads/changes, keep at least first root open.
        if (roots.length === 0) return;
        setOpenRoots(prev => (prev.length ? prev : [roots[0].code]));
    }, [roots]);

    const toggleRoot = (code: string) => {
        setOpenRoots(prev =>
            prev.includes(code) ? prev.filter(x => x !== code) : [...prev, code]
        );
    };

    const renderChildRows = (parentCode: string, nestedDepth: number) => {
        const children = byParent.get(parentCode) ?? [];
        if (!children.length) return null;

        return (
            <>
                {children.map((child, idx) => {
                    const position = 'middle';
                    const textClass =
                        child.hasChildren || child.level >= 4
                            ? `${textSize.text2} font-light`
                            : `${textSize.text2} font-normal`;

                    return (
                        <React.Fragment key={child.id ?? child.code}>
                            <div className="pl-[12px] relative">
                                <OkpdPrefix position={position} hasChild={child.hasChildren} />
                                <span className={textClass}>{formatNodeTitle(child)}</span>
                            </div>
                            {child.hasChildren ? (
                                <div className="border-l border-[#34446D] ml-[12px] relative flex flex-col gap-[15px]">
                                    {renderChildRows(child.code, nestedDepth + 1)}
                                </div>
                            ) : null}
                        </React.Fragment>
                    );
                })}
            </>
        );
    };

    if (!items?.length) {
        return (
            <div className={`${textSize.text2} font-light text-[#93969d]`}>
                Нет данных ОКПД 2
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[20px]">
            {roots.map((root, index) => {
                const level2 = byParent.get(root.code) ?? [];

                return (
                    <CollapseSection
                        key={root.code}
                        title={formatNodeTitle(root)}
                        isOpen={openRoots.includes(root.code)}
                        onToggle={() => toggleRoot(root.code)}
                    >
                        <div className="flex flex-col gap-[10px]">
                            {level2.map((child) => {
                                if (!child.hasChildren) {
                                    return (
                                        <h5 key={child.code} className={`${textSize.headerH6}`}>
                                            {formatNodeTitle(child)}
                                        </h5>
                                    );
                                }

                                return (
                                    <div
                                        key={child.code}
                                        className="border-l border-[#93969d] relative py-[5px] flex flex-col gap-[15px]"
                                    >
                                        <OkpdPrefix position={index === 0 ? "bottom" : "middle"} hasChild={true} />
                                        <h6 className={`${textSize.text1} pl-[12px]`}>
                                            {formatNodeTitle(child)}
                                        </h6>

                                        {renderChildRows(child.code, 1)}
                                    </div>
                                );
                            })}
                        </div>
                    </CollapseSection>
                );
            })}
        </div>
    );
}


