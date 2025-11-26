import React from 'react';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';

const ServicesBreadcrumbs: React.FC = () => {
    return (
        <AppBreadcrumbs
            root="/"
            breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }]}
        />
    );
};

export default ServicesBreadcrumbs;


