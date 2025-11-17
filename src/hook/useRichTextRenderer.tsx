import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { horizontalLoop } from '@/scripts/slider';
import useWindowSize from '@/hook/useWindowSize';
import { filterPrepositions } from './filter';

export const useRichTextRenderer = () => {

    const processContent = (text: string, small?: boolean): React.ReactNode[] => {
        text = text.trim();


        // Обработка [grid_blocks_start] ... [grid_blocks_end]
        if (text.includes('[grid_blocks_start]') && text.includes('[grid_blocks_end]')) {
            const beforeGrid = text.substring(0, text.indexOf('[grid_blocks_start]')).trim();
            const gridContent = text.substring(
                text.indexOf('[grid_blocks_start]') + '[grid_blocks_start]'.length,
                text.indexOf('[grid_blocks_end]')
            ).trim();
            const afterGrid = text.substring(text.indexOf('[grid_blocks_end]') + '[grid_blocks_end]'.length).trim();

            // Разбиваем grid content на блоки по заголовкам #
            const gridBlocks = gridContent
                .split(/(?=\n# )/)
                .filter((block: string) => block.trim())
                .map((block: string) => block.trim());


            return [
                ...(beforeGrid ? processContent(beforeGrid).map((content, index) => (
                    <div key={`before-grid-${index}`} className="mb-[30px]">{content}</div>
                )) : []),
                <div key="grid-container" className="grid gap-[20px] mb-[30px] xxs:grid-cols-3 grid-cols-1" >
                    {gridBlocks.map((block: string, index: number) => {
                        // Проверяем, является ли блок изображением
                        const imageMatch = block?.replace(/^#\s*/, '').match(/^!\[(.*?)\]\((.*?)\)/);

                        // Обычная текстовая карточка
                        const lines = block.split('\n').filter(line => line.trim());
                        const title = lines[0]?.replace(/^#\s*/, '').trim() || '';
                        const content = lines.slice(1).join('\n').trim();

                        let cardClass = "p-[20px] border border-[#93969D] rounded-[6px] flex flex-col relative  justify-between items-end min-h-[300px]";



                        if (imageMatch) {
                            // Это изображение - рендерим как grid блок с изображением
                            const alt = imageMatch[1];
                            const src = imageMatch[2];


                            return (
                                <div
                                    key={index}

                                    className={`border border-[#93969D] rounded-[6px] relative overflow-hidden ${cardClass}`}
                                >
                                    <Image
                                        src={src}
                                        alt={alt}
                                        fill
                                        className="object-cover"
                                        unoptimized={src.startsWith('http')}
                                    />
                                </div>
                            );
                        }


                        return (
                            <div
                                key={index}
                                className={cardClass}
                            >
                                <div className="flex flex-col gap-[15px] w-full">
                                    <h6 className="!font-normal">
                                        {title}
                                    </h6>
                                    <div>
                                        {processContent(content)}
                                    </div>
                                    <Image
                                    className='absolute bottom-[20px] right-[20px] w-auto h-[120px]'
                                    src={`/about/${index + 1}.svg`} alt="arrow-right"  width={120} height={120} />
                                </div>
                            </div>
                        );
                    })}
                </div>,
                ...(afterGrid ? processContent(afterGrid) : [])
            ];
        }

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
                const listClassName = typeToUse === 'ordered' ? 'list-decimal list-inside my-[10px]' : 'list-disc my-[10px]';
                
                // Для нумерованных списков с одним элементом убираем отступ слева
                const isSingleOrdered = typeToUse === 'ordered' && currentListItems.length === 1;
                const liClassName = isSingleOrdered 
                    ? `font-light ${small ? 'text-2' : 'text-base-post'}`
                    : `font-light ml-[25px] ${small ? 'text-2' : 'text-base-post'}`;
                
                elements.push(
                    React.createElement(
                        ListTag,
                        { key: `list-${listKey++}`, className: listClassName + ' space-y-[5px]' },
                        currentListItems.map((item, idx) => (
                            <li 
                                key={idx} 
                                className={liClassName}
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
                    <h6 key={`subheading-${index}`} className="mt-[9px] font-normal text-black">
                        {filterPrepositions(trimmedLine.substring(2).trim())}
                    </h6>
                );
                lastElementWasList = false;
                return;
            }

            // Regular paragraph
            flushList();
            if (trimmedLine) {
                elements.push(
                    <p key={`p-${index}`} className={`-my-[5px] ${small ? 'text-2' : 'text-base-post'}`}>
                        {filterPrepositions(trimmedLine)}
                    </p>
                );
                lastElementWasList = false;
            }
        });

        flushList(); // Flush any remaining list items
        return elements;
    };

 

    return { processContent };
};

