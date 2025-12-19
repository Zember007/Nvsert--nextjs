import React, { useCallback } from 'react';

import textSize from '@/assets/styles/base/base.module.scss';
import { filterPrepositions } from 'shared/lib';

export const useRichTextRenderer = () => {
  const processContent = useCallback(
    (text: string, small?: boolean): React.ReactNode[] => {
      text = text.trim();

      const lines = text.split('\n');
      const elements: React.ReactNode[] = [];
      let currentListItems: Array<{ text: string; number?: number }> = [];
      let listType: 'ordered' | 'unordered' | null = null;
      let listKey = 0;

      let lastElementWasList = false;

      const flushList = (forceType?: 'ordered' | 'unordered') => {
        if (currentListItems.length > 0) {
          const typeToUse = forceType || listType || 'unordered';
          const ListTag = typeToUse === 'ordered' ? 'ol' : 'ul';
          const listClassName =
            typeToUse === 'ordered'
              ? 'list-decimal list-inside my-[10px]'
              : ' list-disc my-[10px]';

          const isSingleOrdered = typeToUse === 'ordered' && currentListItems.length === 1;
          const liClassName = `font-light ${
            small ? `${textSize.text2}` : `${textSize.textBasePost}`
          }`;

          elements.push(
            React.createElement(
              ListTag,
              { key: `list-${listKey++}`, className: `${listClassName} space-y-[5px]` },
              currentListItems.map((item, idx) => (
                <li
                  key={idx}
                  className={liClassName}
                  style={{ ...(isSingleOrdered ? {} : { marginLeft: '18px' }) }}
                  {...(typeToUse === 'ordered' && item.number !== undefined
                    ? { value: item.number }
                    : {})}
                >
                  {filterPrepositions(item.text)}
                </li>
              )),
            ),
          );
          lastElementWasList = true;
          currentListItems = [];
          listType = null;
        }
      };

      lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          flushList();
          const nextLine = index + 1 < lines.length ? lines[index + 1].trim() : '';
          const willBeList = nextLine.match(/^(\d+)\.\s+(.+)$/) || nextLine.startsWith('- ');

          if (!lastElementWasList && !willBeList) {
            elements.push(
              <div
                key={`br-${index}`}
                className={`${small ? 'h-[20px]' : 'h-[15px]'}`}
              />,
            );
          }
          lastElementWasList = false;
          return;
        }

        if (/^!\[(.*?)\]\((.*?)\)/.test(trimmedLine)) {
          const match = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)/);
          if (match) {
            return;
          }
        }

        const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
        if (numberedMatch) {
          if (listType !== null && listType !== 'ordered') {
            flushList();
          }
          listType = 'ordered';
          const number = Number.parseInt(numberedMatch[1], 10);
          currentListItems.push({ text: numberedMatch[2].trim(), number });
          return;
        }

        if (trimmedLine.startsWith('- ')) {
          if (listType !== null && listType !== 'unordered') {
            flushList();
          }
          listType = 'unordered';
          currentListItems.push({ text: trimmedLine.substring(2).trim() });
          return;
        }

        if (trimmedLine.startsWith('# ')) {
          flushList();
          elements.push(
            <h3
              key={`subheading-${index}`}
              className={`${textSize.headerH6} mt-[9px] font-normal text-black`}
            >
              {filterPrepositions(trimmedLine.substring(2).trim())}
            </h3>,
          );
          lastElementWasList = false;
          return;
        }

        flushList();
        elements.push(
          <p
            key={`p-${index}`}
            className={`-my-[5px] ${
              small ? `${textSize.text2}` : `${textSize.textBasePost}`
            }`}
          >
            {filterPrepositions(trimmedLine)}
          </p>,
        );
        lastElementWasList = false;
      });

      flushList();
      return elements;
    },
    [],
  );

  return { processContent };
};


