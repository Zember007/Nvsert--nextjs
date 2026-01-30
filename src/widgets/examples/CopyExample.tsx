import { useHeaderContext } from 'shared/contexts';
import { useTranslation } from 'react-i18next';

const CopyExample = () => {
  const { handleCopy } = useHeaderContext();
  const { t } = useTranslation();

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">{t('examples.copy.title')}</h3>
      
      <button
        onClick={(e) => handleCopy(t('examples.copy.sampleText'), e)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {t('examples.copy.copyText')}
      </button>
      
      <button
        onClick={(e) => handleCopy('example@email.com', e)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {t('examples.copy.copyEmail')}
      </button>
      
      <button
        onClick={(e) => handleCopy('+7 (999) 123-45-67', e)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        {t('examples.copy.copyPhone')}
      </button>
    </div>
  );
};

export default CopyExample; 