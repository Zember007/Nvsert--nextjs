import { Metadata } from 'next';
import ServicesContent from './ClientPage';
import { BASE_URL } from 'shared/config/env';
import { getRequestLocale } from 'shared/i18n/server-locale';
import { tStatic } from 'shared/i18n/static';

// Функция для генерации метаданных
export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRequestLocale();
    const ogLocale = locale === 'en' ? 'en_US' : 'ru_RU';
    return {
        title: tStatic(locale, 'meta.pages.services.title'),
        description: tStatic(locale, 'meta.pages.services.description'),
        keywords: tStatic(locale, 'meta.pages.services.keywords'),
        openGraph: {
            title: tStatic(locale, 'meta.pages.services.ogTitle'),
            description: tStatic(locale, 'meta.pages.services.ogDescription'),
            type: 'website',
            locale: ogLocale,
        },
        alternates: {
            canonical: `${BASE_URL}/services`,
        },
    };
}

const Page = async () => {


    return (
        <ServicesContent />
    );
};

export default Page;
