import { Metadata } from 'next';
import { Suspense } from 'react';
import { getNavigationData } from '@/assets/lib/navigation';
import ServicesContent from './ClientPage';

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
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nvsert.ru'}/services`,
        },
    };
}

const Page = async () => {
    // Загружаем навигацию на сервере
    const initialNavigation = await getNavigationData();
    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ServicesContent initialNavigation={initialNavigation} />
        </Suspense>
    );
};

export default Page;
