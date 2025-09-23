'use client';

import React, { useState } from 'react';

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

    return (
        <div className={`flex flex-col gap-[20px] ${className || ''}`}>
            <button
                type="button"
                className={`line-after__box group  pb-[10px] border-b border-[#93969D] ${position === 'right' ? '2k:mr-0 mr-[-135px] 2k:pr-0 pr-[135px]' : '2k:ml-0 ml-[-135px] 2k:pl-0 pl-[135px]'} ${headerClassName || ''}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
            >
                <div className="flex items-center  gap-[10px] group-active:scale-[0.95] transition-transform duration-100">
                    <svg
                        className={`group-hover:text-[#34446D] transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
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

            {isOpen && (
                <div className={listClassName}>
                    {typeof renderItem === 'function' && Array.isArray(items)
                        ? items.map((item, index) => renderItem(item, index))
                        : null}
                </div>
            )}
        </div>
    );
}

export default AppCollapsibleList;


