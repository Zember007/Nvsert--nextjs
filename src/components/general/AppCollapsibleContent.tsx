'use client';

import React from 'react';

interface AppCollapsibleContentProps {
    active: boolean;
    content: React.ReactNode;
    title: string;
    onToggle?: () => void;
    className?: string;
}

const AppCollapsibleContent: React.FC<AppCollapsibleContentProps> = ({
    active,
    content,
    title,
    onToggle,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            <div
                className="flex justify-center items-center gap-[10px] pb-[10px] border-b border-[#93969D] cursor-pointer"
                onClick={onToggle}
            >
                <h2 className="text-[24px] font-light !m-0 leading-[16px] tracking-[0] text-[#34446D] flex-1">
                    {title}
                </h2>
                <svg
                    className={`transition-transform duration-100 ${!active ? 'rotate-180' : ''}`}
                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_7117_2690)">
                        <path d="M15 15L0.999999 0.999999" stroke="#93969D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 9L1 1L9 1" stroke="#93969D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_7117_2690">
                            <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 -1 16 16)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            {active && (
                <div className="pt-[30px]">
                    {content}
                </div>
            )}
        </div>
    );
};

export default AppCollapsibleContent;
