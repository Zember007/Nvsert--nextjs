'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useId, useState } from 'react';
import stylesBtn from '@/assets/styles/base/_button.module.scss';

type AppCollapsibleListProps<ItemType> = {
    title: React.ReactNode;
    items?: ItemType[];
    renderItem?: (item: ItemType, index: number) => React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
    headerClassName?: string;
    listClassName?: string;
    position?: 'right' | 'left' | null;
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

    const clipPathId = useId();

    return (
        <div className={`flex flex-col ${className || ''}`}>
            <button
                type="button"
                className={`${stylesBtn.lineAfter} ${position === 'left' ? stylesBtn.right : ''} group  pb-[10px] border-b border-[#93969d80] m:px-[inherit] m:mx-[inherit]   ${1 ? '' : position === 'right' ? '2k:mr-0  2k:pr-0 xl:mr-[-135px] xl:pr-[135px] m:mr-[-40px] m:pr-[40px]' : '2k:ml-0  2k:pl-0 xl:pl-[135px] xl:ml-[-135px] m:ml-[-40px] m:pl-[40px]'} ${headerClassName || ''}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
            >
                <span className={`flex items-center   group-active:scale-[0.95] transition-all duration-100 ${isOpen ? 'gap-[14px]' : 'gap-[10px]'}`}>
                    <svg
                        className={`group-hover:text-[#34446D] text-[black] transition-transform duration-100 ${isOpen ? 'rotate-90 translate-x-[4px]' : ''}`}
                        width="9"
                        height="16"
                        viewBox="0 0 9 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <g clipPath={`url(#${clipPathId})`}>
                            <path d="M4.95426 3.77441L8.81413 7.5767C9.06163 7.82013 9.06163 8.17899 8.81413 8.42241L1.35538 15.771C0.888506 16.2293 -0.000244141 15.9516 -0.000244141 15.3481V8.80756L4.95426 3.77441Z" fill="currentColor" />
                            <path opacity="0.5" d="M0 7.1918V0.651224C0 0.0477958 0.88875 -0.229919 1.35562 0.228367L4.14675 2.97808L0 7.1918Z" fill="currentColor" />
                        </g>
                        <defs>
                            <clipPath id={clipPathId}>
                                <rect width="9" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className="group-hover:text-[#34446D] transition-all duration-100 text-[16px] text-[#161616] leading-[18px]  ">{title}</span>
                </span>
            </button>
            

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ 
                            height: 'auto', 
                            transition: {
                                height: {
                                    duration: 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }
                            }
                        }}
                        exit={{ 
                            height: 0, 
                            transition: {
                                height: {
                                    duration: 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }
                            }
                        }}
                        style={{ overflow: 'visible' }}
                        className="pb-[60px]"
                    >
                        <motion.ul
                            initial={{ y: 0 }}
                            animate={{ 
                                y: [0, 26, 0, 0, 0],
                                transition: {
                                    delay: 0.1,
                                    duration: 0.6,
                                    ease: [0.34, 1.56, 0.64, 1],
                                    times: [0, 0.2, 0.5, 0.8, 1]
                                }
                            }}
                            className={`${listClassName} relative pt-[20px]`}
                        >
                            {typeof renderItem === 'function' && Array.isArray(items)
                                ? items.map((item, index) => (
                                    <li key={index}>
                                        {renderItem(item, index)}
                                    </li>
                                ))
                                : null}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AppCollapsibleList;


