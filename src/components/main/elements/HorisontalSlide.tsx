// import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
// import { gsap } from 'gsap';
// import { horizontalLoop } from '@/scripts/slider';

// type HorizontalLoopProps = {
//     children: React.ReactNode[]; 
//     initial: boolean;               
//     onChange?: (index: number) => void;
// };

// export type HorizontalLoopRef = {
//     goToSlide: (index: number, timeD: number) => void;
// };

// const HorizontalLoop = forwardRef<HorizontalLoopRef, HorizontalLoopProps>(
//     (
//         {
//             children,
//             initial
//         },
//         ref
//     ) => {
//         const timelineRef = useRef<any>(null);
//         const containerRef = useRef<HTMLDivElement>(null);

//         useImperativeHandle(ref, () => ({
//             goToSlide(index: number, vars: any) {
//                 timelineRef.current.toIndex(index, vars);
//             },
//         }));

//         useEffect(() => {
//             if (!containerRef.current || !initial) return;

//             const items = Array.from(containerRef.current.children) as HTMLElement[];
//             const tl:any = horizontalLoop(items, {
//                 paused: true,
//             });

//             timelineRef.current = tl;

//             const onResize = () => {
//                 if (timelineRef.current) {
//                     const progress = timelineRef.current.progress();
//                     timelineRef.current.progress(0, true);
//                     timelineRef.current.progress(progress, true);
//                 }
//             };

//             window.addEventListener('resize', onResize);


//             return () => {
//                 tl.kill(); 
//                 window.removeEventListener('resize', onResize);               
//             };
//         }, [initial]);

//         return (
//             <div ref={containerRef} className="slider w-[500%] flex">
//                 {children.map((child, i) => (
//                     <div key={i} className='min-w-[535px]'>
//                         {child}
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// );

// HorizontalLoop.displayName = 'HorizontalLoop';

// export default HorizontalLoop;

import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { gsap } from 'gsap';
import { horizontalLoop } from '@/scripts/slider';

type HorizontalLoopProps = {
    children: React.ReactNode[];
    initial: boolean;
    onChange?: (index: number) => void;
};

export type HorizontalLoopRef = {
    goToSlide: (index: number, vars: any) => void;
};

const ROW_COUNT = 5;

const HorizontalLoop = forwardRef<HorizontalLoopRef, HorizontalLoopProps>(
    ({ children, initial }, ref) => {
        const timelineRef = useRef<any>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            goToSlide(index: number, vars: any) {
                const baseDelay = 0.15; // время между строками

                for (let row = 0; row < ROW_COUNT; row++) {
                    const delay = baseDelay * (ROW_COUNT - row - 1);

                    gsap.delayedCall(delay, () => {
                        timelineRef.current.toIndex(index, {
                            ...vars,
                            overwrite: true,
                        });
                    });
                }
            },
        }));

        useEffect(() => {
            if (!containerRef.current || !initial) return;

            // Собираем все слайды из всех строк
            const allItems: HTMLElement[] = Array.from(
                containerRef.current.querySelectorAll('.slider .slider-item')
            );

            const tl: any = horizontalLoop(allItems, {
                paused: true,
            });

            timelineRef.current = tl;

            const onResize = () => {
                if (timelineRef.current) {
                    const progress = timelineRef.current.progress();
                    timelineRef.current.progress(0, true);
                    timelineRef.current.progress(progress, true);
                }
            };

            window.addEventListener('resize', onResize);

            return () => {
                tl.kill();
                window.removeEventListener('resize', onResize);
            };
        }, [initial]);

        return (
            <div ref={containerRef} >
                {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
                    <div
                        style={{
                            zIndex: 5 - rowIndex
                        }}
                        key={rowIndex} className={`absolute wrapper-slide wrapper-slide${rowIndex}  top-0  w-1/5 h-full pointer-events-none`}
                    >
                        <div
                            className="slider flex w-fit will-change-transform"
                        >
                            {children.map((child, i) => (
                                <div key={i} className="slider-item min-w-[535px]">
                                    {child}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
);

HorizontalLoop.displayName = 'HorizontalLoop';

export default HorizontalLoop;
