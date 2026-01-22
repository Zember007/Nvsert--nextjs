'use client';

import React from 'react';
import { NavigationItem } from '@/types/navigation';
import { AppCollapsibleList, AppNavigationItem } from 'widgets/layout';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

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
                        img={(children.img?.formats?.thumbnail?.url || '')}
                    />
                )}
            />
        </div>
    );
};

export default ServiceRecommendedList;


