'use client';

import React from 'react';
import { NavigationItem } from '@/types/navigation';
import { AppCollapsibleList, AppNavigationItem } from 'widgets/layout';
import { getStrapiImageApiPath } from 'shared/lib/strapi-image';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';

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
    const { t } = useTranslation();
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);
    const localizePath = (path: string) => withLocalePrefix(path, locale);
    if (!items || items.length === 0) {
        return null;
    }
    

    return (
        <div className={wrapperClassName}>
            <AppCollapsibleList
                position="left"
                title={t('services.recommended.title')}
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
                        img={children.img?.formats?.thumbnail?.url ? getStrapiImageApiPath(children.img.formats.thumbnail.url) : ''}
                        localizePath={localizePath}
                    />
                )}
            />
        </div>
    );
};

export default ServiceRecommendedList;


