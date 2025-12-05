import AppMainDocuments from '@/components/index/AppMainDocuments';

// Обёртка для секции с документами.
// Теперь AppMainDocuments может рендериться на сервере,
// а внутри него применяется гибридная виртуализация.
const HomeDocumentsClient = () => {
  return <AppMainDocuments />;
};

export default HomeDocumentsClient;


