
import React, { Key, useRef } from 'react';
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';

export interface VirtualizedListProps<T> {
  items: T[];
  /** Только начальная оценка, дальше будет измеряться точно */
  estimatedItemSize?: number;
  overscan?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey?: (item: T, index: number) => Key;
  className?: string;
  /** Высота контейнера (по умолчанию 100%) */
  height?: string | number;
  /** Виртуализация по скроллу окна (без внутреннего скролл-контейнера) */
  useWindowScroll?: boolean;
}

export function VirtualizedList<T>({
  items,
  estimatedItemSize = 50,
  overscan = 10,
  renderItem,
  getItemKey,
  className,
  height = '100%',
  useWindowScroll = false,
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useWindowScroll
    ? useWindowVirtualizer({
        count: items.length,
        estimateSize: () => estimatedItemSize, // Начальная оценка
        overscan,
        scrollMargin: parentRef.current?.offsetTop ?? 0,
        // Ключ для динамической высоты: измеряем реальную высоту элементов
        measureElement: (element) =>
          element ? element.getBoundingClientRect().height : 0,
        // Опционально: padding для стабильности при измерении
        paddingStart: 0,
        paddingEnd: 0,
      })
    : useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimatedItemSize, // Начальная оценка
        overscan,
        // Ключ для динамической высоты: измеряем реальную высоту элементов
        measureElement: (element) =>
          element ? element.getBoundingClientRect().height : 0,
        // Опционально: padding для стабильности при измерении
        paddingStart: 0,
        paddingEnd: 0,
      });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <div
      ref={parentRef}
      className={className}
      style={{
        ...(useWindowScroll
          ? null
          : { height: typeof height === 'number' ? `${height}px` : height }),
      }}
    >
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const item = items[virtualRow.index];
          const key = getItemKey ? getItemKey(item, virtualRow.index) : virtualRow.key;
          const y = useWindowScroll
            ? virtualRow.start - (virtualizer.options.scrollMargin ?? 0)
            : virtualRow.start;

          return (
            <div
              key={key}
              data-index={virtualRow.index}
              ref={(el) => el ? virtualizer.measureElement(el) : undefined}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${y}px)`,
                boxSizing: 'border-box',
              }}
            >
              {renderItem(item, virtualRow.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}