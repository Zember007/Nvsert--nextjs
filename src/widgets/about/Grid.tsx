'use client';
import React, { useEffect, useRef, useState } from 'react';
import GridBlock from './GridBlock';
import { useWindowSize } from 'shared/hooks';
import stylesSlider from '@/assets/styles/base/base.module.scss';
interface GridBoxProps {
    gridContent: string;
    processContent: (content: string) => React.ReactNode;
}

const GridBox: React.FC<GridBoxProps> = ({ gridContent, processContent }) => {

    const { width: widthWindow } = useWindowSize()
    const [activeIndex, setActive] = useState<number>(0)
    const ref = useRef<HTMLDivElement | null>(null)
    const timeLine = useRef<any>(null)

    useEffect(() => {

        const observer = new IntersectionObserver(
            async ([entry]) => {

                if (entry.isIntersecting && ref.current) {
                    if (widthWindow && widthWindow < 1280) {


                        const [gsapModule, sliderModule] = await Promise.all([
                            import('gsap'),
                            import('@/scripts/slider')
                        ]);
                        const gsap = gsapModule.default || gsapModule;
                        const { horizontalLoop } = sliderModule;

                        const slides = gsap.utils.toArray('[data-slider="slide-grid"]');

                        timeLine.current = horizontalLoop(slides, {
                            paused: true,
                            center: true,
                            draggable: true,
                            mobile: true,
                            gap: 40,
                            snap: true,
                            onChange: (index: number) => {
                                setActive(index);
                                // Принудительное выравнивание после изменения активного слайда
                                if (timeLine.current && timeLine.current.alignPositions) {
                                    setTimeout(() => timeLine.current.alignPositions(), 50);
                                }
                            }
                        });

                        // Принудительное выравнивание через короткий интервал
                        const alignInterval = setInterval(() => {
                            if (timeLine.current && timeLine.current.alignPositions) {
                                timeLine.current.alignPositions();
                            }
                        }, 100);

                        // Очищаем интервал при размонтировании
                        return () => {
                            clearInterval(alignInterval);
                            if (timeLine.current) {
                                timeLine.current.destroy();
                                timeLine.current = null;
                            }
                        };
                    }
                    observer.unobserve(ref.current); timeLine.current?.next({ ease: "power3", duration: 0.725 });
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }




        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }

            if (timeLine.current) {
                timeLine.current.destroy();
                timeLine.current = null;
            }

        };
    }, [widthWindow]);

    // Разбиваем grid content на блоки по заголовкам #
    const gridBlocks = gridContent
        .split(/(?=\n# )/)
        .filter((block: string) => block.trim())
        .map((block: string) => block.trim());

    return (
        <div className="flex flex-col mb-[30px] gap-[20px]">
            <div
                ref={ref}
                key="grid-container" className="xl:grid flex max-w-[100vw] overflow-hidden m:mx-auto -mx-[26px] m:w-full w-[calc(100%+52px)] m:gap-[20px] gap-[40px]  xxxl:grid-cols-3 grid-cols-2">
                {gridBlocks.map((block: string, index: number) => (
                    <GridBlock
                        key={index}
                        block={block}
                        index={index}
                        processContent={processContent}
                    />
                ))}
            </div>

            <div className={`${stylesSlider.slideDotsBoxContainer} !flex my-[20px]`}>
                <div className={`${stylesSlider.slideDotsBox} !flex`}>
                    {gridBlocks.map((_, i) => (
                        <div key={i} className={`${activeIndex === i ? stylesSlider.activeDots : ""} ${stylesSlider.slideDots}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GridBox;

