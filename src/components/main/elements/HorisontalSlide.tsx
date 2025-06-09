import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';
import { horizontalLoop } from '@/scripts/slider';

type HorizontalLoopProps = {
    children: React.ReactNode[]; 
    initial: boolean;               
    onChange?: (index: number) => void;
};

export type HorizontalLoopRef = {
    goToSlide: (index: number, timeD: number) => void;
};

const HorizontalLoop = forwardRef<HorizontalLoopRef, HorizontalLoopProps>(
    (
        {
            children,
            initial
        },
        ref
    ) => {
        const timelineRef = useRef<any>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            goToSlide(index: number, vars: any) {
                timelineRef.current.toIndex(index, vars);
            },
        }));

        useEffect(() => {
            if (!containerRef.current || !initial) return;

            const items = Array.from(containerRef.current.children) as HTMLElement[];
            const tl:any = horizontalLoop(items, {
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
            <div ref={containerRef} className="slider w-full flex">
                {children.map((child, i) => (
                    <div key={i} className='w-[535px]'>
                        {child}
                    </div>
                ))}
            </div>
        );
    }
);

HorizontalLoop.displayName = 'HorizontalLoop';

export default HorizontalLoop;