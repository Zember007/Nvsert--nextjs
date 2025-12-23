'use client';
import { StandardPageLayout } from 'widgets/layout';
import OkpdHierarchy, { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';

const ClientPage = ({ initialItems }: { initialItems: Okpd2Item[] }) => {
    return (

        <StandardPageLayout
            title="ОКПД 2"
            breadcrumbs={[{ id: 2, title: 'ОКПД 2', full_slug: '/okpd' }]}
            // dotNavItems={dotNavItems}
            showButton={true}
        >
            <OkpdHierarchy items={initialItems} />
        </StandardPageLayout>

    );
};

export default ClientPage;


