'use client';
import React, { useMemo } from 'react';
import AppCollapsibleList from './AppCollapsibleList';
import { filterPrepositions } from '@/hook/filter';

export type DotNavItem = {
    id: number | string;
    title: string;
    active?: boolean;
    href?: string;
};

const DotNavList: React.FC<{
    items?: DotNavItem[];
    position?: 'right' | 'left' | null;
}> = ({ items, position }) => {

    const [activeBlockId, setActiveBlockId] = React.useState<number | string | null>(
        items?.[0]?.id ?? null
    );

    React.useEffect(() => {
        if (!items) return;
        const sections = items
            .map(block => document.getElementById('block-' + block.id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (sections.length === 0) return;

        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#block-')) {
                const id = parseInt(hash.replace('#block-', ''), 10);
                if (!Number.isNaN(id)) {
                    setActiveBlockId(id);
                }
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                const topMost = visible[0];
                if (topMost) {
                    const id = parseInt((topMost.target as HTMLElement).id.replace('block-', ''), 10);
                    if (!Number.isNaN(id)) {
                        setActiveBlockId(prev => (prev === id ? prev : id));
                    }
                }
            },
            {
                root: null,
                rootMargin: '-25% 0px -60% 0px',
            }
        );

        sections.forEach(section => observer.observe(section));
        window.addEventListener('hashchange', handleHashChange);

        if (window.location.hash && window.location.hash.startsWith('#block-')) {
            handleHashChange();
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            sections.forEach(section => observer.unobserve(section));
            observer.disconnect();
        };
    }, [items]);

    const navigationItems = useMemo(() => {
        return items?.map(item => ({
            id: item.id,
            title: item.title,
            active: activeBlockId === item.id,
        })) || [];
    }, [items, activeBlockId]);

    const scrollToElement = (item: DotNavItem, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const target = event.target as HTMLAnchorElement;
        const href = target.href;
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if(!element) return;
        setActiveBlockId(item.id);
        window.scrollTo({
            top: (element?.offsetTop || 100) - 50,
            behavior: 'smooth'
        });
    };
    return (
        <AppCollapsibleList
            position={position}
            title={'Навигация по услуге'}
            items={navigationItems}
            defaultOpen={true}
            listClassName='flex flex-col gap-[20px]'
            renderItem={(item, index) => (
                <a
                    href={'#block-' + item.id}
                    key={index}
                    onClick={(event) => scrollToElement(item, event)}
                    className={`flex items-center gap-[24px]  cursor-pointer text-left group`}
                >
                    <div className={`pointer-events-none flex items-center justify-center min-w-[16px] w-[16px] h-[16px] relative transition-all duration-100 group-active:left-[15px] ${item.active ? 'left-0' : 'left-[15px]'}`}>
                        <div className={` border transition-all duration-100 group-active:w-[8px] group-active:h-[8px] group-active:border-[#34446D] ${!item.active ? 'border-transparent w-[8px] h-[8px]' : 'border-[#34446D] w-[16px] h-[16px]'} rounded-full relative`}>
                            <div className={`w-[8px] h-[8px] transition-all duration-100 group-hover:bg-[#34446D] ${item.active ? 'bg-[#34446D] border-transparent' : 'bg-transparent border-[#93969d80]'} border  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}></div>
                        </div>
                    </div>
                    <span className={`pointer-events-none text-[16px] group-active:scale-[0.95] transition-transform duration-100 font-light  ${item.active ? 'text-[#34446D] ' : 'text-black '}`}>
                        {filterPrepositions(item.title)}
                    </span>
                </a>
            )}
        />
    );
};

export default DotNavList;


