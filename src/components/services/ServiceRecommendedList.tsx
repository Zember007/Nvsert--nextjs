'use client';

import React from 'react';
import { NavigationItem } from '@/store/navigation';
import AppCollapsibleList from '@/components/general/AppCollapsibleList';
import { AppNavigationItem } from '@/components/general/AppNavigation';

interface ServiceRecommendedListProps {
    items: NavigationItem[];
    wrapperClassName?: string;
    itemClassName?: string;
    textClassName?: string;
}

const ServiceRecommendedList: React.FC<ServiceRecommendedListProps> = ({
    items,
    wrapperClassName,
    itemClassName,
    textClassName,
}) => {
    if (!items || items.length === 0) {
        return null;
    }
    

    return (
        <div className={wrapperClassName}>
            <AppCollapsibleList
                position="left"
                title={'Рекомендуем к оформлению'}
                items={items}
                defaultOpen={true}
                listClassName="flex flex-col gap-[20px]"
                renderItem={(children) => (
                    <AppNavigationItem
                        dark={true}
                        className={itemClassName}
                        classNameText={textClassName}
                        link={children.slug}
                        title={children.title}
                        img={'https://test11.audiosector.ru/cp' + children.img?.url}
                    />
                )}
            />
        </div>
    );
};

export default ServiceRecommendedList;


