'use client';
import React from 'react';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import Button from '@/components/ui/Button';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import SidebarNavButtons, { type SidebarItem } from '@/components/general/SidebarNavButtons';
import DotNavList, { type DotNavItem } from '@/components/general/DotNavList';

type BreadcrumbItem = {
    id: number;
    title: string;
    full_slug: string;
};

type StandardPageLayoutProps = {
    /** Заголовок h1 страницы */
    title: string;
    /** Хлебные крошки */
    breadcrumbs: BreadcrumbItem[];
    /** Элементы для левой боковой панели навигации */
    sidebarNavItems: SidebarItem[];
    /** Элементы для правой навигации (точки) */
    dotNavItems?: DotNavItem[];
    /** Контент страницы */
    children: React.ReactNode;
    /** Показывать ли кнопку "Оформить заявку" */
    showButton?: boolean;
    /** Дополнительный className для обертки */
    className?: string;
};

const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
    title,
    breadcrumbs,
    sidebarNavItems,
    dotNavItems,
    children,
    showButton = true,
    className = '',
}) => {
    const { openDefaultModal } = useHeaderContext();

    return (
        <div className={`main text-[#000] mb-[100px] ${className}`}>
            <AppBreadcrumbs root={'/'} breadcrumbs={breadcrumbs} />
            <div className="wrapper pt-[50px]">
                <div className="flex gap-[40px]">
                    <div className="flex flex-col gap-[50px] flex-1">
                        <h1 className="text-[48px] leading-[50px] !m-0 font-light tracking-[-0.04em] text-black -translate-x-[4px]">
                            {title}
                        </h1>

                        <div className="flex gap-[40px] items-stretch">
                            {/* Left sidebar */}
                            <div className="w-[250px] relative">
                                <div className="sticky top-[112px] flex flex-col gap-[10px]">
                                    <SidebarNavButtons items={sidebarNavItems} />
                                </div>
                            </div>

                            {/* Center content */}
                            <div className="flex-1 flex flex-col gap-[50px]">
                                {children}
                            </div>

                            {/* Right column */}
                            <div className="w-[250px] relative">
                                <div className="sticky top-[112px] flex flex-col gap-[24px]">
                                    {showButton && (
                                        <Button
                                            onClick={() => {
                                                openDefaultModal('orderForm');
                                            }}
                                            label="Оформить заявку"
                                        />
                                    )}
                                    {dotNavItems && dotNavItems.length > 0 && (
                                        <DotNavList items={dotNavItems} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandardPageLayout;

