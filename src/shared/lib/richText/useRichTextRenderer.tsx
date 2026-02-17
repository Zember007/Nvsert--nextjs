import React, { useCallback } from 'react';

import textSize from '@/assets/styles/base/base.module.scss';
import { filterPrepositions } from 'shared/lib';

/** Парсит инлайн-разметку в строке: **жирный**, _курсив_, <u>подчёркивание</u>, ~~зачёркивание~~, [текст](url) */
function parseInlineRichText(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    type MatchInfo = { index: number; match: RegExpMatchArray; type: string };
    let earliest: MatchInfo | null = null;

    const tryMatch = (regex: RegExp, type: string): MatchInfo | null => {
      const m = remaining.match(regex);
      return m && m.index !== undefined ? { index: m.index, match: m, type } : null;
    };

    const candidates: MatchInfo[] = [
      tryMatch(/\*\*(.+?)\*\*/, 'bold'),
      tryMatch(/_(.+?)_/, 'italic'),
      tryMatch(/<u>(.+?)<\/u>/i, 'underline'),
      tryMatch(/~~(.+?)~~/, 'strikethrough'),
      tryMatch(/\[(.+?)\]\((.+?)\)/, 'link'),
    ].filter((m): m is MatchInfo => m !== null);

    for (const c of candidates) {
      if (!earliest || c.index < earliest.index) earliest = c;
    }
    

    if (!earliest) {
      nodes.push(filterPrepositions(remaining));
      break;
    }

    if (earliest.index > 0) {
      nodes.push(filterPrepositions(remaining.slice(0, earliest.index)));
    }

    const fullMatch = earliest.match[0];
    const content = earliest.match[1];
    const href = earliest.match[2];

    if (earliest.type === 'bold') {
      nodes.push(
        React.createElement('strong', { key: `inline-${key++}` }, ...parseInlineRichText(content)),
      );
    } else if (earliest.type === 'italic') {
      nodes.push(
        React.createElement('em', { key: `inline-${key++}` }, ...parseInlineRichText(content)),
      );
    } else if (earliest.type === 'underline') {
      nodes.push(
        React.createElement('u', { key: `inline-${key++}` }, ...parseInlineRichText(content)),
      );
    } else if (earliest.type === 'strikethrough') {
      nodes.push(
        React.createElement(
          's',
          { key: `inline-${key++}`, style: { textDecoration: 'line-through' } },
          ...parseInlineRichText(content),
        ),
      );
    } else if (earliest.type === 'link' && href) {
      nodes.push(
        React.createElement(
          'a',
          {
            key: `inline-${key++}`,
            href,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'underline text-inherit hover:opacity-80',
          },
          ...parseInlineRichText(content),
        ),
      );
    }

    remaining = remaining.slice(earliest.index + fullMatch.length);
  }

  return nodes;
}

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
                  {parseInlineRichText(item.text)}
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
              {parseInlineRichText(trimmedLine.substring(2).trim())}
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
            {parseInlineRichText(trimmedLine)}
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


