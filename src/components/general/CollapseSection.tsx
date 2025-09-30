'use client';
import React from 'react';

interface CollapseSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
    children?: React.ReactNode;
}

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
    <svg
        className={`transition-transform duration-100 ${!open ? 'rotate-180' : ''}`}
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
);

const CollapseSection: React.FC<CollapseSectionProps> = ({ title, isOpen, onToggle, className, children }) => {
    return (
        <div className={`w-full ${className || ''}`}>
            <div className="flex items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer" onClick={onToggle}>
                <h2 className="text-[24px] transition-all duration-100 font-light !m-0 leading-[18px] tracking-[0] text-[#34446D] flex-1">{title}</h2>
                <ChevronIcon open={isOpen} />
            </div>
            {isOpen && (
                <div className="pt-[20px]">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapseSection;


