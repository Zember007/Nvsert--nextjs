import React, { useCallback } from 'react';
import { filterPrepositions } from './filter';
import textSize from '@/assets/styles/base/text-size.module.scss';

export const useRichTextRenderer = () => {
    

    const processContent = useCallback((text: string, small?: boolean): React.ReactNode[] => {
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
                const listClassName = typeToUse === 'ordered' ? 'list-decimal list-inside my-[10px]' : ' list-disc my-[10px]';

                // Для нумерованных списков с одним элементом убираем отступ слева
                const isSingleOrdered = typeToUse === 'ordered' && currentListItems.length === 1;
                const liClassName = isSingleOrdered
                    ? `font-light ${small ? `${textSize.text2}` : `${textSize.textBasePost}`}`
                    : `font-light ${small ? `${textSize.text2}` : `${textSize.textBasePost}`}`;

                elements.push(
                    React.createElement(
                        ListTag,
                        { key: `list-${listKey++}`, className: listClassName + ' space-y-[5px]' },
                        currentListItems.map((item, idx) => (
                            <li
                                key={idx}
                                className={liClassName}
                                style={{...(!isSingleOrdered ? { marginLeft: '18px' } : {})}}
                                {...(typeToUse === 'ordered' && item.number !== undefined ? { value: item.number } : {})}
                            >
                                {filterPrepositions(item.text)}
                            </li>
                        ))
                    )
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
                // Проверяем, будет ли следующий элемент списком
                const nextLine = index + 1 < lines.length ? lines[index + 1].trim() : '';
                const willBeList = nextLine.match(/^(\d+)\.\s+(.+)$/) || nextLine.startsWith('- ');

                // Не добавляем отступ, если предыдущий или следующий элемент - список
                if (!lastElementWasList && !willBeList) {
                    elements.push(<div key={`br-${index}`} className={`${small ? 'h-[20px]' : 'h-[15px]'}`} />);
                }
                lastElementWasList = false;
                return;
            }

            // Handle markdown image: ![alt](url)
            if (/^!\[(.*?)\]\((.*?)\)/.test(trimmedLine)) {
                const match = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)/);
                if (match) {
                    /*  const alt = match[1] || '';
                     const src = match[2] || '';
                     flushList();
                     elements.push(
                         <div key={`img-${index}`} className="max-w-[700px] mx-auto mt-[50px]">
                             <img src={src} alt={alt} className="w-full h-auto" />
                         </div>
                     ); */
                    return;
                }
            }

            // Handle numbered list items (lines starting with number. )
            const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
            if (numberedMatch) {
                // Если текущий список другого типа, закрываем его
                if (listType !== null && listType !== 'ordered') {
                    flushList();
                }
                listType = 'ordered';
                const number = parseInt(numberedMatch[1], 10);
                currentListItems.push({ text: numberedMatch[2].trim(), number });
                return;
            }

            // Handle list items (lines starting with -)
            if (trimmedLine.startsWith('- ')) {
                // Если текущий список другого типа, закрываем его
                if (listType !== null && listType !== 'unordered') {
                    flushList();
                }
                listType = 'unordered';
                currentListItems.push({ text: trimmedLine.substring(2).trim() });
                return;
            }

            // Handle subheadings (lines starting with #)
            if (trimmedLine.startsWith('# ')) {
                flushList();
                elements.push(
                    <h3 key={`subheading-${index}`} className={`${textSize.headerH6} mt-[9px] font-normal text-black`}>
                        {filterPrepositions(trimmedLine.substring(2).trim())}
                    </h3>
                );
                lastElementWasList = false;
                return;
            }

            // Regular paragraph
            flushList();
            if (trimmedLine) {
                elements.push(
                    <p key={`p-${index}`} className={`-my-[5px] ${small ? `${textSize.text2}` : `${textSize.textBasePost}`}`}>
                        {filterPrepositions(trimmedLine)}
                    </p>
                );
                lastElementWasList = false;
            }
        });

        flushList(); // Flush any remaining list items
        return elements;
    }, []);



    return { processContent };
};

