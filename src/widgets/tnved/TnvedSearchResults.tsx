'use client';

import * as React from 'react';
import { VirtualizedList } from '@/widgets/home/utils/VirtualizedList';
import textSize from '@/assets/styles/base/base.module.scss';
import { useCopy } from '@/shared/hooks/useCopy';
import type { TnvedSearchItem } from '@/widgets/tnved/TnvedQuickSearchSection';

function formatTitle(item: Pick<TnvedSearchItem, 'code' | 'codeNorm' | 'name'>) {
  const code = (item.code || item.codeNorm || '').trim();
  return code ? `${code} ${item.name}` : item.name;
}

export function TnvedSearchResults({
  query,
  results,
  isPending,
}: {
  query: string;
  results: TnvedSearchItem[];
  isPending?: boolean;
}) {
  const { showCopyNotification, notificationPosition, handleCopy, hideNotification } = useCopy();

  if (!query.trim()) return null;

  return (
    <div className="mt-[10px]">
      <div className="flex items-center justify-between gap-[12px] mb-[10px]">
        <span className={`${textSize.text3} font-light text-[#93969D]`}>
          {isPending ? 'Поиск…' : `Найдено: ${results.length}`}
        </span>
        <span className={`${textSize.text3} font-light text-[#93969D]`}>
          {results.length >= 200 ? 'Показаны первые 200' : ''}
        </span>
      </div>

      {results.length === 0 && !isPending ? (
        <div className={`${textSize.text2} font-light text-[#93969D]`}>Ничего не найдено</div>
      ) : (
        <div className="border border-[#E7E8EA] rounded-[6px] overflow-hidden">
          <VirtualizedList
            items={results}
            estimatedItemSize={56}
            overscan={12}
            height={420}
            getItemKey={(it) => String(it.nodeId ?? it.id ?? it.path ?? it.codeNorm ?? it.code ?? it.name)}
            renderItem={(item) => {
              const code = (item.code || item.codeNorm || '').trim();
              return (
                <div className="px-[12px] py-[10px] border-b border-[#E7E8EA] last:border-b-0">
                  <div className="flex items-start justify-between gap-[12px]">
                    <div className="min-w-0">
                      <div className={`${textSize.text2} font-normal text-[#34446D] truncate`}>
                        {code || '—'}
                      </div>
                      <div className={`${textSize.text3} font-light text-[#000]`}>{item.name}</div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCopy(code || item.name, e)}
                      className={`${textSize.text3} font-light text-[#34446D] whitespace-nowrap active:scale-[0.98] transition-transform`}
                      aria-label={code ? `Скопировать код ${code}` : `Скопировать: ${item.name}`}
                      title={code ? `Скопировать: ${formatTitle(item)}` : `Скопировать: ${item.name}`}
                    >
                      Скопировать
                    </button>
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}

      {showCopyNotification && notificationPosition && (
        <button
          type="button"
          onClick={hideNotification}
          className="fixed z-[9999] bg-[#34446D] text-white px-[10px] py-[6px] rounded-[6px] shadow"
          style={{ left: notificationPosition.x, top: notificationPosition.y }}
        >
          Скопировано
        </button>
      )}
    </div>
  );
}

