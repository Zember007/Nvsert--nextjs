'use client';

import React from 'react';
import { CollapseSection } from 'widgets/layout';
import textSize from '@/assets/styles/base/base.module.scss';
import OkpdPrefix from '@/widgets/okpd/OkpdPrefix';
import { VirtualizedList } from '@/widgets/home/utils/VirtualizedList';

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

  const toggleChapter = React.useCallback((chapter: string) => {
    setOpenChapters((prev) => (prev.includes(chapter) ? prev.filter((x) => x !== chapter) : [...prev, chapter]));
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

  const flattenChapterRows = React.useCallback(
    (rootNodeId: number): TnvedRow[] => {
      const root = model.byNodeId.get(rootNodeId);
      if (!root) return [];
      const rows: TnvedRow[] = [];

      const walk = (parentNodeId: number) => {
        const children = model.childrenByParent.get(parentNodeId) ?? [];
        for (const child of children) {
          const relDepth = Math.max(0, child.level - root.level - 1);
          const kind: RowKind = relDepth === 0 ? 'h5' : relDepth === 1 ? 'h6' : 'text';
          rows.push({ kind, item: child, depth: relDepth });
          walk(child.nodeId);
        }
      };

      walk(rootNodeId);
      return rows;
    },
    [model],
  );

  const RowContainer = React.useCallback(({ row, children }: { row: TnvedRow; children: React.ReactNode }) => {
    const inSection = row.kind !== 'h5';
    const blueLinesCount = Math.max(0, row.depth - 1);

    return (
      <div className="relative pb-[20px]">
        {inSection && <span aria-hidden className="absolute left-0 top-0 bottom-0 border-l border-[#93969d]" />}
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
  }, []);

  if (!items?.length) {
    return <div className={`${textSize.text2} font-light text-[#93969d]`}>Нет данных ТН ВЭД</div>;
  }

  // Собираем плоский список глав с их разделами для рендеринга
  const chaptersWithSections = React.useMemo(() => {
    const result: Array<{ chapter: TnvedItem; section: TnvedItem | null; isFirstInSection: boolean }> = [];
    const sectionFirstChapter = new Set<number>();

    for (const chapterNode of model.chapters) {
      const section = model.getSectionForChapter(chapterNode);
      const isFirst = section && !sectionFirstChapter.has(section.nodeId);
      if (isFirst && section) {
        sectionFirstChapter.add(section.nodeId);
      }
      result.push({ chapter: chapterNode, section, isFirstInSection: isFirst || false });
    }

    return result;
  }, [model.chapters, model.getSectionForChapter]);

  return (
    <div className="flex flex-col gap-[50px]">
      {chaptersWithSections.map(({ chapter: chapterNode, section, isFirstInSection }) => {
        const chapter = String(chapterNode.codeNorm || chapterNode.code || '').slice(0, 2);
        if (!/^\d{2}$/.test(chapter)) return null;

        const rows = flattenChapterRows(chapterNode.nodeId);
        const loaded = isSectionLoaded ? isSectionLoaded(chapter) : true;
        const loading = isSectionLoading ? isSectionLoading(chapter) : false;

        return (
          <React.Fragment key={chapterNode.nodeId}>
            {isFirstInSection && section && (
              <p className={`${textSize.text2} font-normal text-[#93969D]`}>{section.name}</p>
            )}
            <div ref={setChapterEl(chapter)} data-chapter={chapter}>
              <CollapseSection
                title={formatNodeTitle(chapterNode)}
                isOpen={openChapters.includes(chapter)}
                onToggle={() => handleToggleChapter(chapter)}
              >
                {!loaded && (
                  <div className={`${textSize.text2} font-light text-[#93969d]`}>
                    {loading ? 'Загрузка…' : 'Нет данных (ожидаем подгрузку)'}
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
                              <OkpdPrefix position="bottom" hasChild={true} />
                              <h6 className={`${textSize.text1} pl-[12px]`}>{title}</h6>
                            </div>
                          </RowContainer>
                        );
                      }

                      const textClass = item.hasChildren ? `${textSize.text2} font-normal` : `${textSize.text2} font-light`;

                      return (
                        <RowContainer row={row}>
                          <div style={{ paddingLeft: `${Math.max(0, row.depth - 1) * 12}px` }}>
                            <div className="pl-[12px] relative">
                              <OkpdPrefix position="middle" hasChild={item.hasChildren} />
                              <span className={textClass}>{title}</span>
                            </div>
                          </div>
                        </RowContainer>
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

