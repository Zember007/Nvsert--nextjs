'use client';
import React from 'react';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import Button from '@/components/ui/Button';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import SidebarNavButtons from '@/components/general/SidebarNavButtons';
import DotNavList, { DotNavItemProps } from '@/components/general/DotNavList';

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

    /** Элементы для правой навигации (точки) */
    dotNavItems?: DotNavItemProps[];
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
                <div className="flex gap-[40px] max-w-full">
                    <div className="flex flex-col gap-[50px] flex-1 max-w-full">
                        <div className="flex items-center justify-between gap-[20px] m:flex-row flex-col">
                            <h1 className='m:text-left text-center m:!m-0'>
                                {title}
                            </h1>

                            <div className="xl:hidden">
                                <Button
                                    onClick={() => {
                                        openDefaultModal('orderForm');
                                    }}
                                    label="Оформить заявку"
                                />
                            </div>

                        </div>
                        <div className="flex gap-[40px] m:flex-row flex-col items-stretch max-w-full">
                            {/* Left sidebar */}
                            <div className="m:w-[250px] w-full relative">
                                <div className="sticky top-[104px] flex flex-col gap-[40px] overflow-y-auto max-h-[calc(100vh-104px)]">
                                    <SidebarNavButtons />

                                    <div className="xl:hidden">
                                        {dotNavItems && dotNavItems.length > 0 && (
                                            <DotNavList items={dotNavItems} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Center content */}
                            <div className="flex-1 flex flex-col gap-[50px]">
                                {children}
                            </div>


                        </div>
                    </div>
                    {/* Right column */}
                    <div className="hidden xl:block w-[250px] relative">
                        <div className="sticky top-[104px] flex flex-col gap-[50px] overflow-y-auto max-h-[calc(100vh-104px)]">
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
    );
};

export default StandardPageLayout;

