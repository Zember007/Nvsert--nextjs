'use client';

import dynamic from 'next/dynamic';

// Клиентский обёртчик для секции с документами.
// Здесь можно безопасно использовать ssr: false,
// чтобы избежать SSR этого тяжёлого блока и возможных гидратационных ошибок.
const AppMainDocuments = dynamic(
  () => import('@/components/index/AppMainDocuments'),
  {
    ssr: false,
    loading: () => null,
  }
);

const HomeDocumentsClient = () => {
  return <AppMainDocuments />;
};

export default HomeDocumentsClient;


