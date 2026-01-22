import { Metadata } from 'next';
import ServicesContent from './ClientPage';
import { BASE_URL } from 'shared/config/env';

// Функция для генерации метаданных
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Все услуги - NVSERT',
        description: 'Полный список услуг по декларированию, сертификации и лицензированию продукции. Профессиональные услуги сертификации в России.',
        keywords: 'услуги сертификации, декларирование, сертификация продукции, лицензирование, все услуги NVSERT',
        openGraph: {
            title: 'Все услуги - NVSERT',
            description: 'Полный список услуг по декларированию, сертификации и лицензированию продукции',
            type: 'website',
            locale: 'ru_RU',
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
