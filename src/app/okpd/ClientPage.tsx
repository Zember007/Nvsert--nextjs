'use client';
import React from 'react';
import { StandardPageLayout } from 'widgets/layout';
import { useHeaderContext } from 'shared/contexts';
import FilesList from '@/widgets/okpd/FilesList';
import { OkpdQuickSearchSection } from '@/widgets/okpd/OkpdQuickSearchSection';
import { OkpdClassifierSection } from '@/widgets/okpd/OkpdClassifierSection';
import type { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';
import type { OkpdPageData } from '@/widgets/okpd/types';
import { useOkpdSections } from '@/widgets/okpd/useOkpdSections';
import { OkpdInfoSections } from '@/widgets/okpd/OkpdInfoSections';

const ClientPage = ({ initialItems, pageData }: { initialItems: Okpd2Item[]; pageData: OkpdPageData | null }) => {
    const { openDefaultModal } = useHeaderContext();
    const { sectionsOpen, toggleSection, dotNavItems } = useOkpdSections(pageData);

    return (

        <StandardPageLayout
            title={pageData?.title || "ОКПД 2"}
            breadcrumbs={[{ id: 2, title: 'ОКПД 2', full_slug: '/okpd' }]}
            dotNavItems={dotNavItems}
            contentColumn={<FilesList />}
            showButton={true}
        >
            <OkpdQuickSearchSection items={initialItems} />
      {/*       <OkpdClassifierSection items={initialItems} /> */}

            <OkpdInfoSections
                pageData={pageData}
                sectionsOpen={sectionsOpen}
                onToggleSection={toggleSection}
                onCtaClick={() => openDefaultModal('introForm')}
            />
            
        </StandardPageLayout>

    );
};

export default ClientPage;


