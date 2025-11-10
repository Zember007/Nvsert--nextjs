import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { horizontalLoop } from '@/scripts/slider';
import useWindowSize from '@/hook/useWindowSize';

export const useRichTextRenderer = () => {
    const { width: widthWindow } = useWindowSize();
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const processContent = (text: string, small?: boolean): React.ReactNode[] => {
        text = text.trim();

        // Обработка [slider_start] ... [slider_end]

        if (text.includes('[slider_start]') && text.includes('[slider_end]')) {
            const gap = widthWindow && widthWindow < 640 ? (widthWindow - (300)) / 2 : 20

            const beforeSlider = text.substring(0, text.indexOf('[slider_start]')).trim();
            const sliderContent = text.substring(
                text.indexOf('[slider_start]') + '[slider_start]'.length,
                text.indexOf('[slider_end]')
            ).trim();
            const afterSlider = text.substring(text.indexOf('[slider_end]') + '[slider_end]'.length).trim();

            // Разбиваем slider content на блоки по [block]
            const sliderBlocks = sliderContent
                .split(/\[block\]/)
                .filter(block => block.trim())
                .map(block => block.trim());



            return [
                ...(beforeSlider ? processContent(beforeSlider).map((content, index) => (
                    <div key={`before-${index}`}>{content}</div>
                )) : []),
                <div key="slider-container" ref={sliderRef} className="slider-container relative overflow-hidden mt-[15px] 1k:max-w-[940px] l:max-w-[640px] xxs:max-w-[580px] xxs:mx-auto -mx-[26px] w-[calc(100%+52px)]">
                    <div className="slide-blur feedback-blur left-0">
                        <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                    </div>
                    <div className="slide-blur feedback-blur right-0 ">
                        <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                    </div>
                    <div className="slider-wrapper flex  "
                        style={{ gap: `${gap}px` }}
                    >

                        {sliderBlocks.map((block, index) => {

                            // Ищем заголовки ## (большой текст) и # (меньший)
                            const bigTitleMatch = block.match(/##\s*(.+?)\s*#/);
                            const smallTitleMatch = block.match(/^#\s+(.+?)$/m);

                            // Извлекаем описание (текст после заголовков)
                            const description = block
                                .replace(/##\s*.+?\s*#\s*.+?\n/, '')
                                .replace(/^\d+%?\+?\s*/, '')
                                .trim();

                            return (
                                <div
                                    key={index}
                                    data-slider="slider-cards"
                                    className="p-[20px] l:w-[300px] l:min-w-[300px] xxs:w-[280px] xxs:min-w-[280px] xss:w-[300px] xss:min-w-[300px] w-[280px] min-w-[280px] l:min-h-[200px] min-h-[270px] relative border border-[#93969D] bg-[#93969d26] rounded-[4px] flex flex-col justify-between"
                                >
                                    <svg
                                        className="absolute top-[10px] right-[10px]"
                                        width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 0L16.1889 7.2177C16.7462 10.6016 19.3984 13.2538 22.7823 13.8111L30 15L22.7823 16.1889C19.3984 16.7462 16.7462 19.3984 16.1889 22.7823L15 30L13.8111 22.7823C13.2538 19.3984 10.6016 16.7462 7.2177 16.1889L0 15L7.2177 13.8111C10.6016 13.2538 13.2538 10.6016 13.8111 7.2177L15 0Z" fill="#93969D" fillOpacity="0.5" />
                                    </svg>
                                    <div className="flex flex-col gap-[15px] w-full">
                                        {bigTitleMatch && (
                                            <h2 className="!text-[48px] text-[#34446D]">
                                                {bigTitleMatch[1].trim()}
                                            </h2>
                                        )}
                                        {smallTitleMatch && (
                                            <h6 className="leading-[1.3] text-black !font-normal">
                                                {smallTitleMatch[1].trim()}
                                            </h6>
                                        )}
                                        {description && (
                                            <div>
                                                {processContent(description)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="slide-dots-box-container !flex my-[20px]">
                        <div className="slide-dots-box !flex">
                            {sliderBlocks.map((_, i) => (
                                <div key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                            ))}
                        </div>
                    </div>
                </div>,
                ...(afterSlider ? processContent(afterSlider) : [])
            ];
        }


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

            console.log(gridBlocks, 'gridBlocks');

            return [
                ...(beforeGrid ? processContent(beforeGrid).map((content, index) => (
                    <div key={`before-grid-${index}`} className="mb-[30px]">{content}</div>
                )) : []),
                <div key="grid-container" className="grid gap-[20px] mb-[30px] 1k:grid-cols-[370px_1fr_1fr] xxs:grid-cols-2 grid-cols-1" >
                    {gridBlocks.map((block: string, index: number) => {
                        // Проверяем, является ли блок изображением
                        const imageMatch = block?.replace(/^#\s*/, '').match(/^!\[(.*?)\]\((.*?)\)/);


                        // Обычная текстовая карточка
                        const lines = block.split('\n').filter(line => line.trim());
                        const title = lines[0]?.replace(/^#\s*/, '').trim() || '';
                        const content = lines.slice(1).join('\n').trim();

                        // Определяем стили для разных карточек по индексу
                        let cardStyle: React.CSSProperties = {};
                        let cardClass = "p-[30px] border border-[#93969D] rounded-[6px] flex flex-col";

                        if (index === 0) {
                            cardClass += " 1k:col-span-1 xxs:col-span-2  1k:row-span-2 1k:min-h-[620px] 1k:min-h-[300px] 1k:min-h-[200px]  justify-between  ";
                        } else if (index >= 1 && index <= 4) {
                            cardClass += " justify-between items-end min-h-[300px]";
                        } else if (index === 5) {
                            cardClass += " 1k:col-span-1 xxs:col-span-2 justify-between items-end min-h-[300px]";
                        } else if (index === 6) {

                            cardClass += " justify-between items-end xxs:col-span-2   min-h-[300px] ";

                        }

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
                                <div className="flex flex-col gap-[20px] w-full">
                                    <h6 className="!font-normal">
                                        {title}
                                    </h6>
                                    <div>
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
                currentListItems.push(trimmedLine.substring(2).trim());
                return;
            }

            // Handle subheadings (lines starting with #)
            if (trimmedLine.startsWith('# ')) {
                flushList();
                elements.push(
                    <h6 key={`subheading-${index}`} className="mt-[9px] font-normal text-black">
                        {trimmedLine.substring(2).trim()}
                    </h6>
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

    // Инициализация слайдера
    useEffect(() => {
        const slides = gsap.utils.toArray('[data-slider="slider-cards"]');

        if (slides.length > 0) {
            const loop: any = horizontalLoop(slides, {
                paused: true,
                draggable: true,
                mobile: widthWindow && widthWindow < 1280,
                snap: true,
                gap: widthWindow && widthWindow < 640 ? (widthWindow - (300)) / 2 : 20,
                center: widthWindow && widthWindow < 640 ? true : false,
                onChange: (index: number) => {
                    setActiveIndex(index);
                }
            });

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        loop.next({ ease: "power3", duration: 0.725 });

                        if (sliderRef.current) {
                            observer.unobserve(sliderRef.current);
                        }
                    }
                },
                { threshold: 0.5 }
            );

            if (sliderRef.current) {
                observer.observe(sliderRef.current);
            }

            return () => {
                loop.destroy();
            };
        }
    }, [widthWindow]);

    return { processContent, sliderRef, activeIndex };
};

