import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { BASE_URL, STRAPI_API_URL } from 'shared/config/env';
import StandardPageLayout from 'widgets/layout/StandardPageLayout';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';
import { SidebarItem } from 'widgets/layout/SidebarNavButtons';

export interface LegalContentBlock {
    id: number;
    blockType: string;
    heading: string;
    headingLevel: string;
    richText: string;
    order: number;
    image: unknown;
}

export interface PersonalDataProcessingData {
    id: number;
    title: string;
    content: LegalContentBlock[];
    seo: {
        metaTitle: string;
        metaDescription: string;
    };
}

async function getPersonalDataProcessingData(): Promise<PersonalDataProcessingData | null> {
    try {
        const locale = await getRequestLocale();
        const response = await fetch(`${STRAPI_API_URL}/personal-data-processing?locale=${locale}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch personal data processing data');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching personal data processing data:', error);
        const locale = await getRequestLocale();
        return {
            id: 1,
            title: tStatic(locale, 'navigation.personalData'),
            content: [],
            seo: {
                metaTitle: tStatic(locale, 'meta.pages.personalData.title'),
                metaDescription: tStatic(locale, 'meta.pages.personalData.description'),
            },
        };
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await getPersonalDataProcessingData();
    const locale = await getRequestLocale();

    if (!pageData) {
        return {
            title: tStatic(locale, 'meta.pages.personalData.title'),
            description: tStatic(locale, 'meta.pages.personalData.description'),
        };
    }

    return {
        title: pageData.seo?.metaTitle || pageData.title || tStatic(locale, 'meta.pages.personalData.title'),
        description: pageData.seo?.metaDescription || tStatic(locale, 'meta.pages.personalData.description'),
        alternates: {
            canonical: `${BASE_URL}/personal-data-processing`,
        },
    };
}

const legalSidebarItems = (locale: 'ru' | 'en'): SidebarItem[] => [
    {
        id: 'privacy-policy',
        label: tStatic(locale, 'navigation.privacyPolicyBtn'),
        href: '/privacy-policy',
    },
    {
        id: 'personal-data-processing',
        label: tStatic(locale, 'navigation.personalData'),
        href: '/personal-data-processing',
    },
];

const Page = async () => {
    const locale = await getRequestLocale();
    const pageData = await getPersonalDataProcessingData();

    const dotNavItems = pageData?.content
        ?.filter(block => Boolean(block.heading))
        .map((block, index) => ({
            id: index,
            title: block.heading,
            href: `#block-${index}`,
        })) ?? [];

    return (
        <StandardPageLayout
            title={pageData?.title || tStatic(locale, 'navigation.personalData')}
            breadcrumbs={[{ id: 1, title: tStatic(locale, 'navigation.personalData'), full_slug: '/personal-data-processing' }]}
            dotNavItems={dotNavItems}
            showButton={true}
            orderButtonLabel={tStatic(locale, 'form.buttons.submitApplication')}
            sidebarItems={legalSidebarItems(locale)}
        >
            <ClientPage pageData={pageData} />
        </StandardPageLayout>
    );
};

export default Page;
