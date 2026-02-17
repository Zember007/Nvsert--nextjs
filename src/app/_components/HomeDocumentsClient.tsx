import { AppMainDocuments } from 'widgets/home';

// Обёртка для секции с документами.
// Теперь AppMainDocuments может рендериться на сервере,
// а внутри него применяется гибридная виртуализация.
const HomeDocumentsClient = () => {
  return <AppMainDocuments />;
};



export default HomeDocumentsClient;


