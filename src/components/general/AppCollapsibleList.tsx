'use client';

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';

type AppCollapsibleListProps<ItemType> = {
    title: React.ReactNode;
    items?: ItemType[];
    renderItem?: (item: ItemType, index: number) => React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
    headerClassName?: string;
    listClassName?: string;
    position?: 'right' | 'left';
};

function AppCollapsibleList<ItemType = unknown>({
    title,
    items,
    renderItem,
    defaultOpen = true,
    className,
    headerClassName,
    listClassName,
    position = 'right',
}: AppCollapsibleListProps<ItemType>) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    const controls = useAnimation();
    const defaultSettings = {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [-30, 0, -10, 0, 0],
    };

    const animation = () => {
        controls.start({
            y: defaultSettings.openY,
            transition: {
                duration: defaultSettings.duration,
                ease: [0.34, 1.56, 0.64, 1] as const,
                times: defaultSettings.times,
                delay: position === 'right' ? 0 : 0.1
            }
        });
    }

    useEffect(() => {
        if (isOpen) {
            animation()
        }
    }, [isOpen])

    return (
        <div className={`flex flex-col ${className || ''}`}>
            <button
                type="button"
                className={`line-after__box group  pb-[10px] border-b border-[#93969d80] ${position === 'right' ? '2k:mr-0 mr-[-135px] 2k:pr-0 pr-[135px]' : '2k:ml-0 ml-[-135px] 2k:pl-0 pl-[135px]'} ${headerClassName || ''}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
            >
                <div className={`flex items-center   group-active:scale-[0.95] transition-all duration-100 ${isOpen ? 'gap-[14px]' : 'gap-[10px]'}`}>
                    <svg
                        className={`group-hover:text-[#34446D] transition-transform duration-100 ${isOpen ? 'rotate-90 translate-x-[4px]' : ''}`}
                        width="9"
                        height="16"
                        viewBox="0 0 9 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <g clipPath="url(#clip0_7117_3111)">
                            <path d="M4.95426 3.77441L8.81413 7.5767C9.06163 7.82013 9.06163 8.17899 8.81413 8.42241L1.35538 15.771C0.888506 16.2293 -0.000244141 15.9516 -0.000244141 15.3481V8.80756L4.95426 3.77441Z" fill="black" />
                            <path opacity="0.5" d="M0 7.1918V0.651224C0 0.0477958 0.88875 -0.229919 1.35562 0.228367L4.14675 2.97808L0 7.1918Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_7117_3111">
                                <rect width="9" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="line-after after:!bottom-[-3px] text-[16px] text-[#161616] leading-[16px]  ">{title}</span>

                </div>
            </button>

            <div className={`overflow-hidden`}>

                <div
                    className={`  ${position === 'right' ? (isOpen ? 'opacity-100' : 'opacity-0') : (isOpen ?  'translate-y-0' : '-translate-y-full')} ${position === 'right' ? '' : 'transition-all duration-100'}  pt-[20px] `}>
                    <motion.div
                        animate={controls}
                        className={`${listClassName} relative`}
                    >
                        {typeof renderItem === 'function' && Array.isArray(items)
                            ? items.map((item, index) => renderItem(item, index))
                            : null}
                    </motion.div>

                </div>
            </div >
        </div>
    );
}

export default AppCollapsibleList;


