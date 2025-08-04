import { useCopyContext } from '../contexts/CopyContext';

const CopyExample = () => {
  const { handleCopy } = useCopyContext();

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Примеры копирования</h3>
      
      <button
        onClick={(e) => handleCopy('Этот текст скопирован из примера!', e)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Скопировать текст
      </button>
      
      <button
        onClick={(e) => handleCopy('example@email.com', e)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Скопировать email
      </button>
      
      <button
        onClick={(e) => handleCopy('+7 (999) 123-45-67', e)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Скопировать телефон
      </button>
    </div>
  );
};

export default CopyExample; 