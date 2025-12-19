import React from 'react';
import { AppBreadcrumbs } from 'widgets/layout';

const ServicesBreadcrumbs: React.FC = () => {
    return (
        <AppBreadcrumbs
            root="/"
            breadcrumbs={[{ id: 2, title: 'Все услуги', full_slug: '/services' }]}
        />
    );
};

export default ServicesBreadcrumbs;


