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
        width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="#93969D" stroke-width="2" />
        <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="#93969D" stroke-width="2" />
    </svg>
);

const CollapseSection: React.FC<CollapseSectionProps> = ({ title, isOpen, onToggle, className, children }) => {
    return (
        <div className={`w-full ${className || ''}`}>

            <div
                className="flex justify-center group items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer line-after"
                onClick={onToggle}
            >
                <h4 className="-my-[0.6%] group-active:scale-[0.98] transition-all duration-100  group-hover:text-[#34446D] text-[#000] flex-1">
                    {title}
                </h4>


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


