'use client';
import React from 'react';

export type SidebarItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
};

const SidebarNavButtons: React.FC<{ items: SidebarItem[] } & { className?: string }> = ({ items, className }) => {
    return (
        <div className={`flex flex-col gap-[10px] ${className || ''}`}>
            {items.map((item) => (
                <div key={item.id} className='tariff-wrap'>
                    <button
                        onClick={item.onClick}
                        className={`tariff h-[50px] px-[15px] border rounded-[4px] flex items-center justify-between group transition-colors duration-150 ${item.active ? 'bg-[#34446d] border-[#34446d]' : 'hover:bg-[#f5f5f2] hover:border-[#34446d] border-transparent'}`}
                    >
                        <span className={`text-[20px] font-light ${item.active ? 'text-[#FFF]' : ''}`}>{item.label}</span>
                        {item.icon}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SidebarNavButtons;


