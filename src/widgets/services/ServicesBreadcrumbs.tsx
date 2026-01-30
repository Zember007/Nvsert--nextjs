'use client';
import React from 'react';
import { AppBreadcrumbs } from 'widgets/layout';
import { useTranslation } from 'react-i18next';

const ServicesBreadcrumbs: React.FC = () => {
    const { t } = useTranslation();
    return (
        <AppBreadcrumbs
            root="/"
            breadcrumbs={[{ id: 2, title: t('services.breadcrumbs.allServices'), full_slug: '/services' }]}
        />
    );
};

export default ServicesBreadcrumbs;


