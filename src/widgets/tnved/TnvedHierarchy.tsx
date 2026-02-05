'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CollapseSection } from 'widgets/layout';
import textSize from '@/assets/styles/base/base.module.scss';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import OkpdPrefix from 'widgets/okpd/OkpdPrefix';
import OkpdUnderlineText from 'widgets/okpd/OkpdUnderlineText';
import { VirtualizedList } from 'widgets/home/utils/VirtualizedList';

export type TnvedItem = {
  id: number;
  nodeId: number;
  parentNodeId: number | null;
  path: string;
  code: string | null;
  codeNorm: string | null;
  name: string;
  level: number;
  chapter: string | null;
  hasChildren: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

function formatNodeTitle(node: Pick<TnvedItem, 'code' | 'codeNorm' | 'name'>) {
  const code = (node.code || node.codeNorm || '').trim();
  return code ? `${code} ${node.name}` : node.name;
}

type RowKind = 'h5' | 'h6' | 'text';
type TnvedRow = { kind: RowKind; item: TnvedItem; depth: number };

export default function TnvedHierarchy({
  items,
  onSectionVisible,
  isSectionLoaded,
  isSectionLoading,
}: {
  items: TnvedItem[];
  onSectionVisible?: (chapter: string) => void;
  isSectionLoaded?: (chapter: string) => boolean;
  isSectionLoading?: (chapter: string) => boolean;
}) {
  const { t } = useTranslation();
  const model = React.useMemo(() => {
    const filtered = (items || []).filter(Boolean);

    const byNodeId = new Map<number, TnvedItem>();
    for (const it of filtered) {
      if (!it || typeof it.nodeId !== 'number') continue;
      byNodeId.set(it.nodeId, it);
    }

    const childrenByParent = new Map<number, TnvedItem[]>();
    for (const it of byNodeId.values()) {
      const p = it.parentNodeId;
      if (typeof p !== 'number') continue;
      const arr = childrenByParent.get(p);
      if (arr) arr.push(it);
      else childrenByParent.set(p, [it]);
    }
    for (const [p, arr] of childrenByParent.entries()) {
      childrenByParent.set(p, [...arr].sort((a, b) => String(a.path).localeCompare(String(b.path))));
    }

    // Находим разделы (level: 1, пустой код или название содержит "РАЗДЕЛ")
    const sections = [...byNodeId.values()]
      .filter((it) => {
        if (it.level !== 1) return false;
        const hasNoCode = (!it.code || !it.code.trim()) && (!it.codeNorm || !it.codeNorm.trim());
        const isSectionName = it.name.toUpperCase().includes('РАЗДЕЛ');
        return hasNoCode || isSectionName;
      })
      .sort((a, b) => String(a.path).localeCompare(String(b.path)));

    // Находим главы (level: 2, есть код)
    const chapters = [...byNodeId.values()]
      .filter((it) => it.level === 2 && (it.codeNorm || it.code))
      .sort((a, b) => String(a.codeNorm || a.code || '').localeCompare(String(b.codeNorm || b.code || '')));

    // Функция для поиска раздела главы (поднимаемся по parentNodeId до level: 1)
    const getSectionForChapter = (chapter: TnvedItem): TnvedItem | null => {
      let current: TnvedItem | undefined = chapter;
      while (current && current.parentNodeId !== null) {
        const parent = byNodeId.get(current.parentNodeId);
        if (!parent) break;
        if (parent.level === 1) {
          const hasNoCode = (!parent.code || !parent.code.trim()) && (!parent.codeNorm || !parent.codeNorm.trim());
          const isSectionName = parent.name.toUpperCase().includes('РАЗДЕЛ');
          if (hasNoCode || isSectionName) {
            return parent;
          }
        }
        current = parent;
      }
      return null;
    };

    // Группируем главы по разделам
    const chaptersBySection = new Map<number, TnvedItem[]>();
    for (const chapter of chapters) {
      const section = getSectionForChapter(chapter);
      if (section) {
        const arr = chaptersBySection.get(section.nodeId);
        if (arr) arr.push(chapter);
        else chaptersBySection.set(section.nodeId, [chapter]);
      }
    }

    return { byNodeId, childrenByParent, chapters, sections, chaptersBySection, getSectionForChapter };
  }, [items]);

  const sectionsWithChapters = React.useMemo(() => {
    return model.sections.map((sectionNode) => {
      const chapters = model.chaptersBySection.get(sectionNode.nodeId) ?? [];
      return { section: sectionNode, chapters };
    });
  }, [model.sections, model.chaptersBySection]);

  const chapterElsRef = React.useRef<Map<string, HTMLDivElement | null>>(new Map());

  const setChapterEl = React.useCallback(
    (chapter: string) => (el: HTMLDivElement | null) => {
      chapterElsRef.current.set(chapter, el);
    },
    [],
  );

  React.useEffect(() => {
    if (!onSectionVisible) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (!model.chapters.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const chapter = (e.target as HTMLElement).dataset.chapter;
          if (!chapter) continue;
          onSectionVisible(chapter);
        }
      },
      { root: null, rootMargin: '200px 0px', threshold: 0.01 },
    );

    for (const ch of model.chapters) {
      const chapterCode = String(ch.codeNorm || ch.code || '').slice(0, 2);
      if (!/^\d{2}$/.test(chapterCode)) continue;
      const el = chapterElsRef.current.get(chapterCode);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [onSectionVisible, model.chapters]);

  const [openChapters, setOpenChapters] = React.useState<string[]>([]);
  const [openSections, setOpenSections] = React.useState<number[]>([]);

  // Внутреннее раскрытие внутри главы (мульти-раскрытие: старые пункты не сворачиваются).
  const [expandedByChapter, setExpandedByChapter] = React.useState<Record<string, number[]>>({});
  const [selectedNodeIdByChapter, setSelectedNodeIdByChapter] = React.useState<Record<string, number | null>>({});

  const toggleChapter = React.useCallback((chapter: string) => {
    setOpenChapters((prev) => (prev.includes(chapter) ? prev.filter((x) => x !== chapter) : [...prev, chapter]));
  }, []);

  const toggleSection = React.useCallback((sectionNodeId: number) => {
    setOpenSections((prev) => (prev.includes(sectionNodeId) ? prev.filter((x) => x !== sectionNodeId) : [...prev, sectionNodeId]));
  }, []);

  const handleToggleChapter = React.useCallback(
    (chapter: string) => {
      const willOpen = !openChapters.includes(chapter);
      if (willOpen && onSectionVisible) {
        const loaded = isSectionLoaded ? isSectionLoaded(chapter) : true;
        if (!loaded) onSectionVisible(chapter);
      }
      toggleChapter(chapter);
    },
    [openChapters, onSectionVisible, isSectionLoaded, toggleChapter],
  );

  const buildVisibleChapterRows = React.useCallback(
    (rootNodeId: number, expandedSet: Set<number>): TnvedRow[] => {
      const root = model.byNodeId.get(rootNodeId);
      if (!root) return [];
      const rows: TnvedRow[] = [];

      const walk = (parentNodeId: number) => {
        const children = model.childrenByParent.get(parentNodeId) ?? [];
        for (const child of children) {
          const relDepth = Math.max(0, child.level - root.level - 1);
          // Первый уровень (relDepth=0) пропускаем: показываем сразу со второго уровня
          // и считаем этот уровень "всегда раскрытым" для прохода дальше.
          if (relDepth === 0) {
            walk(child.nodeId);
            continue;
          }

          const shiftedDepth = relDepth - 1; // relDepth=1 -> 0
          const kind: RowKind = shiftedDepth === 0 ? 'h6' : 'text';
          rows.push({ kind, item: child, depth: shiftedDepth });

          if (expandedSet.has(child.nodeId)) {
            walk(child.nodeId);
          }
        }
      };

      walk(rootNodeId);
      return rows;
    },
    [model],
  );

  const RowContainer = React.useCallback(({ row, children }: { row: TnvedRow; children: React.ReactNode }) => {
    const inSection = row.kind !== 'h5';
    const levelLinesCount = Math.max(0, row.depth - 1);

    return (
      <div className="relative pb-[20px]">
        {inSection && <span aria-hidden className="absolute left-0 top-0 bottom-0 border-l border-[#93969d]" />}
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
  }, []);

  if (!items?.length) {
    return <div className={`${textSize.text2} font-light text-[#93969d]`}>{t('tnved.hierarchy.noData')}</div>;
  }

  return (
    <div className="flex flex-col gap-[50px]">
      {sectionsWithChapters.map(({ section, chapters }) => {
        const sectionId = section.nodeId;
        return (
          <div key={sectionId}>
            <CollapseSection title={section.name} isOpen={openSections.includes(sectionId)} onToggle={() => toggleSection(sectionId)}>
              {chapters.map((chapterNode) => {
                const chapter = String(chapterNode.codeNorm || chapterNode.code || '').slice(0, 2);
                if (!/^\d{2}$/.test(chapter)) return null;

                const expandedCodes = expandedByChapter[chapter] ?? [];
                const expandedSet = new Set(expandedCodes);
                const selectedNodeId = selectedNodeIdByChapter[chapter] ?? null;

                // Активная цепочка для подсветки (синий "переезжает" по последнему выбранному пункту).
                const activeChain = new Set<number>();
                const activeChildByParent = new Map<number, number>();
                if (selectedNodeId !== null) {
                  let cur: number | null = selectedNodeId;
                  while (cur !== null) {
                    activeChain.add(cur);
                    const parentNodeId: number | null = model.byNodeId.get(cur)?.parentNodeId ?? null;
                    if (parentNodeId === null) break;
                    activeChildByParent.set(parentNodeId, cur);
                    if (parentNodeId === chapterNode.nodeId) {
                      activeChain.add(parentNodeId);
                      break;
                    }
                    cur = parentNodeId;
                  }
                }

                const rows = buildVisibleChapterRows(chapterNode.nodeId, expandedSet);
                const loaded = isSectionLoaded ? isSectionLoaded(chapter) : true;
                const loading = isSectionLoading ? isSectionLoading(chapter) : false;
                const chapterOpen = openChapters.includes(chapter);

                return (
                  <div key={chapterNode.nodeId} ref={setChapterEl(chapter)} data-chapter={chapter}>
                    <button
                      type="button"
                      className={`text-left active:translate-y-[1px] mb-[10px] ${stylesBtn.lineAfterBox}`}
                      aria-expanded={chapterOpen}
                      onClick={() => handleToggleChapter(chapter)}
                    >
                      <OkpdUnderlineText
                        text={formatNodeTitle(chapterNode)}
                        className={`${textSize.headerH6} text-black font-semibold`}
                        active={false}
                      />
                    </button>

                    {chapterOpen && (
                      <>
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
                            getItemKey={(row) => String(row.item.nodeId)}
                            renderItem={(row) => {
                              const item = row.item;
                              const title = formatNodeTitle(item);
                              const actualHasChildren =
                                (model.childrenByParent.get(item.nodeId)?.length ?? 0) > 0 || item.hasChildren;
                              const isExpanded = expandedSet.has(item.nodeId);
                              const isActive = selectedNodeId === item.nodeId;
                              const hasActiveChild = Boolean(activeChildByParent.get(item.nodeId));
                              const prefixState: 'default' | 'active' | 'ancestor' =
                                isActive ? 'active' : hasActiveChild && activeChain.has(item.nodeId) ? 'ancestor' : 'default';

                              // h5 больше не используем (первый уровень пропущен), но оставим безопасный fallback
                              if (row.kind === 'h5') {
                                return (
                                  <RowContainer row={row}>
                                    <h5 className={`${textSize.headerH6}`}>{title}</h5>
                                  </RowContainer>
                                );
                              }

                              if (row.kind === 'h6') {
                                return (
                                  <RowContainer row={row}>
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
                                          setSelectedNodeIdByChapter((prev) => ({ ...prev, [chapter]: item.nodeId }));
                                          if (!actualHasChildren) return;
                                          setExpandedByChapter((prev) => {
                                            const curr = prev[chapter] ?? [];
                                            const next = new Set(curr);
                                            if (next.has(item.nodeId)) next.delete(item.nodeId);
                                            else next.add(item.nodeId);
                                            return { ...prev, [chapter]: [...next] };
                                          });
                                        }}
                                      >
                                        <OkpdUnderlineText
                                          text={title}
                                          className={`${textSize.text1} font-light`}
                                          active={isActive}
                                        />
                                      </button>
                                    </div>
                                  </RowContainer>
                                );
                              }

                              const textClass = item.hasChildren ? `${textSize.text2} font-normal` : `${textSize.text2} font-light`;

                              return (
                                <RowContainer row={row}>
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
                                          setSelectedNodeIdByChapter((prev) => ({ ...prev, [chapter]: item.nodeId }));
                                          if (!actualHasChildren) return;

                                          setExpandedByChapter((prev) => {
                                            const curr = prev[chapter] ?? [];
                                            const next = new Set(curr);
                                            if (next.has(item.nodeId)) next.delete(item.nodeId);
                                            else next.add(item.nodeId);
                                            return { ...prev, [chapter]: [...next] };
                                          });
                                        }}
                                      >
                                        <OkpdUnderlineText
                                          text={title}
                                          className={textClass}
                                          active={isActive}
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </RowContainer>
                              );
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </CollapseSection>
          </div>
        );
      })}
    </div>
  );
}

