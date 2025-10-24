import Image from 'next/image';
import React from 'react';

export const useRichTextRenderer = () => {
    const processContent = (text: string, small?: boolean): React.ReactNode[] => {


        // Обработка [slider_start] ... [slider_end]
        if (text.includes('[slider_start]') && text.includes('[slider_end]')) {
            const beforeSlider = text.substring(0, text.indexOf('[slider_start]'));
            const sliderContent = text.substring(
                text.indexOf('[slider_start]') + '[slider_start]'.length,
                text.indexOf('[slider_end]')
            );
            const afterSlider = text.substring(text.indexOf('[slider_end]') + '[slider_end]'.length);

            // Разбиваем slider content на блоки по [block]
            const sliderBlocks = sliderContent
                .split(/\[block\]/)
                .filter(block => block.trim())
                .map(block => block.trim());

            return [
                ...(beforeSlider ? processContent(beforeSlider).map((content, index) => (
                    <div key={`before-${index}`}>{content}</div>
                )) : []),
                <div key="slider-grid" className="flex gap-[20px]">
                    {sliderBlocks.map((block, index) => {

                        // Ищем заголовки ## (большой текст) и # (меньший)
                        const bigTitleMatch = block.match(/##\s*(.+?)\s*#/);
                        const smallTitleMatch = block.match(/^#\s+(.+?)$/m);

                        // Ищем число в начале (если есть)
                        const numberMatch = block.match(/^(\d+%?\+?)/);
                        const number = numberMatch ? numberMatch[1] : '';

                        // Извлекаем описание (текст после заголовков)


                        const description = block
                            .replace(/##\s*.+?\s*#\s*.+?\n/, '')
                            .replace(/^\d+%?\+?\s*/, '')
                            .trim();

                        return (

                            <div
                                key={index}
                                className="p-[20px] w-1/3 relative border border-[#93969D] bg-[#93969d26] rounded-[4px] flex flex-col justify-between"
                                style={{ minHeight: '200px' }}
                            >
                                <svg
                                    className="absolute top-[10px] right-[10px]"
                                    width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 0L16.1889 7.2177C16.7462 10.6016 19.3984 13.2538 22.7823 13.8111L30 15L22.7823 16.1889C19.3984 16.7462 16.7462 19.3984 16.1889 22.7823L15 30L13.8111 22.7823C13.2538 19.3984 10.6016 16.7462 7.2177 16.1889L0 15L7.2177 13.8111C10.6016 13.2538 13.2538 10.6016 13.8111 7.2177L15 0Z" fill="#93969D" fillOpacity="0.5" />
                                </svg>
                                <div className="flex flex-col gap-[15px] w-full">
                                    {number && (
                                        <div className="xxs:text-[48px] text-[40px] font-bold leading-[1] text-[#34446D]">
                                            {number}
                                        </div>
                                    )}
                                    {bigTitleMatch && (
                                        <h3 className="xxs:text-[48px] text-[40px] font-light leading-[1] text-[#34446D]">

                                            {bigTitleMatch[1].trim()}
                                        </h3>
                                    )}
                                    {smallTitleMatch && (
                                        <h4 className="xxs:text-[20px] text-[18px] font-normal leading-[1.3] text-black">
                                            {smallTitleMatch[1].trim()}
                                        </h4>
                                    )}
                                    {description && (
                                        <div className="xxs:text-[16px] text-[14px] font-light leading-[1.4] text-black">
                                            {processContent(description)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>,
                ...(afterSlider ? processContent(afterSlider) : [])
            ];
        }

        // Обработка [grid_blocks_start] ... [grid_blocks_end]
        if (text.includes('[grid_blocks_start]') && text.includes('[grid_blocks_end]')) {
            const beforeGrid = text.substring(0, text.indexOf('[grid_blocks_start]'));
            const gridContent = text.substring(
                text.indexOf('[grid_blocks_start]') + '[grid_blocks_start]'.length,
                text.indexOf('[grid_blocks_end]')
            );
            const afterGrid = text.substring(text.indexOf('[grid_blocks_end]') + '[grid_blocks_end]'.length);

            // Разбиваем grid content на блоки по заголовкам #
            const gridBlocks = gridContent
                .split(/(?=\n# )/)
                .filter((block: string) => block.trim())
                .map((block: string) => block.trim());

            console.log(gridBlocks, 'gridBlocks');

            return [
                ...(beforeGrid ? processContent(beforeGrid).map((content, index) => (
                    <div key={`before-grid-${index}`} className="mb-[30px]">{content}</div>
                )) : []),
                <div key="grid-container" className="grid gap-[20px] mb-[30px]" style={{
                    gridTemplateColumns: '370px 1fr 1fr',
                    gridTemplateRows: 'repeat(3, auto)',
                    gridAutoFlow: 'dense'
                }}>
                    {gridBlocks.map((block: string, index: number) => {
                        // Проверяем, является ли блок изображением
                        const imageMatch = block?.replace(/^#\s*/, '').match(/^!\[(.*?)\]\((.*?)\)/);


                        // Обычная текстовая карточка
                        const lines = block.split('\n').filter(line => line.trim());
                        const title = lines[0]?.replace(/^#\s*/, '') || '';
                        const content = lines.slice(1).join('\n');

                        // Определяем стили для разных карточек по индексу
                        let cardStyle: React.CSSProperties = {};
                        let cardClass = "p-[30px] border border-[#93969D] rounded-[6px] flex flex-col";

                        if (index === 0) {
                            cardStyle = {
                                gridColumn: '1',
                                gridRow: '1 / 3',
                                minHeight: '620px',
                                backgroundColor: 'rgba(147, 150, 157, 0.15)'
                            };
                            cardClass += " justify-between items-center";
                        } else if (index >= 1 && index <= 4) {
                            // Карточки 2-5: сетка 2x2 справа от первой
                            cardClass += " justify-between items-end";
                            cardStyle = {
                                minHeight: '300px'
                            };
                        } else if (index === 5) {
                            // Предпоследняя карточка внизу
                            cardStyle = {
                                gridColumn: '1',
                                gridRow: '3',
                                minHeight: '300px'
                            };
                            cardClass += " justify-between items-end";
                        } else if (index === 6) {
                            // Последняя широкая карточка
                            cardStyle = {
                                gridColumn: '2 / 4',
                                gridRow: '3',
                                minHeight: '300px',
                                backgroundColor: 'rgba(147, 150, 157, 0.15)'
                            };
                        }

                        if (imageMatch) {
                            // Это изображение - рендерим как grid блок с изображением
                            const alt = imageMatch[1];
                            const src = imageMatch[2];


                            return (
                                <div
                                    key={index}
                                    className="border border-[#93969D] rounded-[6px] relative overflow-hidden"
                                    style={cardStyle}
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
                                style={cardStyle}
                            >
                                <div className="flex flex-col gap-[20px] w-full">
                                    <h3 className="xxs:text-[20px] text-[18px] font-normal leading-[1.2] text-black">
                                        {title}
                                    </h3>
                                    <div className="xxs:text-[16px] text-[14px] font-light leading-[1.3] text-black">
                                        {processContent(content)}
                                    </div>
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
        let currentListItems: string[] = [];
        let listKey = 0;

        const flushList = () => {
            if (currentListItems.length > 0) {
                elements.push(
                    <ul key={`list-${listKey++}`} className="list-disc -my-[5px]">
                        {currentListItems.map((item, idx) => (
                            <li key={idx} className={`font-light ml-[25px] ${small ? 'text-2' : 'text-base-post'}`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                );
                currentListItems = [];
            }
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
                flushList();
                elements.push(<div key={`br-${index}`} className={`${small ? 'h-[20px]' : 'h-[15px]'}`} />);
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

            // Handle list items (lines starting with -)
            if (trimmedLine.startsWith('- ')) {
                currentListItems.push(trimmedLine.substring(2));
                return;
            }

            // Handle subheadings (lines starting with #)
            if (trimmedLine.startsWith('# ')) {
                flushList();
                elements.push(
                    <h3 key={`subheading-${index}`} className="xxs:text-[20px] text-[18px] mt-[9px] font-normal tracking-[-0.01em] text-black">
                        {trimmedLine.substring(2)}
                    </h3>
                );
                return;
            }

            // Regular paragraph
            flushList();
            if (trimmedLine) {
                elements.push(
                    <p key={`p-${index}`} className={`-my-[5px] ${small ? 'text-2' : 'text-base-post'}`}>
                        {trimmedLine}
                    </p>
                );
            }
        });

        flushList(); // Flush any remaining list items
        return elements;
    };

    return { processContent };
};

