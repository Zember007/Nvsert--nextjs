'use client';

import { useEffect, useId, useRef, useState } from 'react';
import styles from '@/assets/styles/base/base.module.scss';


const ContactSpoiler = ({ isExpanded, onToggle, title, children }: { isExpanded: boolean, onToggle: () => void, title: string, children: React.ReactNode }) => {
    const clipId = useId();
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [shouldAnimateIn, setShouldAnimateIn] = useState(false);

    // При каждом закрытии сбрасываем анимацию, чтобы при следующем открытии
    // контент снова мог "въехать" при попадании в viewport.
    useEffect(() => {
        if (!isExpanded) setShouldAnimateIn(false);
    }, [isExpanded]);

    useEffect(() => {
        if (!isExpanded) return;
        const el = contentRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setShouldAnimateIn(true);
                }
            },
            { threshold: 0.01 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [isExpanded]);

    return (
        <div className={`overflow-hidden relative  `}>

            <div
                onClick={onToggle}
                className={`w-full cursor-pointer border-[#93969d80] border-t border-b`}
            >


                <div className={`${styles.lineAfterBox} justify-between group wrapper xxl:flex-row flex-col flex xxl:items-center py-[12px] overflow-hidden`}>

                    <div className={`flex gap-[22px] justify-start w-fit items-center transition-transform duration-100  group-active:scale-[.9]`}>
                        <svg
                            className={` text-black transition-transform duration-100 ${isExpanded ? 'rotate-90 translate-x-[4px] translate-y-[2px]' : ''}`}
                            width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath={`url(#${clipId})`}>
                                <path d="M4.404 3.30273L7.835 6.62973C8.055 6.84273 8.055 7.15673 7.835 7.36973L1.205 13.7997C0.79 14.2007 0 13.9577 0 13.4297V7.70673L4.404 3.30273Z" fill="currentColor" />
                                <path opacity="0.5" d="M0 6.29282V0.569821C0 0.0418214 0.79 -0.201179 1.205 0.199821L3.686 2.60582L0 6.29282Z" fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id={clipId}>
                                    <rect width="8" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h2 className={`${styles.headerH4} ${styles.lineAfter} after:!bottom-[-5px] !m-0    transition-all duration-200 translate-y-[1px]`}>{title}</h2>
                    </div>


                </div>
            </div>

            <div className={`${!isExpanded ? 'max-h-[0px]' : `max-h-[2370px] m:pt-[100px] pt-[50px] m:pr-[290px]`} transition-all duration-200 overflow-hidden  `}>
                <div
                    ref={contentRef}
                    className={`wrapper transition-all duration-500 ease-out ${isExpanded ? 'will-change-transform' : ''} ${shouldAnimateIn ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+60px)] opacity-0 '}`}
                >

                    {children}

                </div>

            </div>
        </div>
    );
};

export default ContactSpoiler;