'use client';

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

export interface DocumentMobileInfoProps {
  duration: string;
  price: string;
}

export const DocumentMobileInfo: FC<DocumentMobileInfoProps> = memo(
  ({ duration, price }) => {
    const { t } = useTranslation();
    return (
      <div className="document-mobile-info">
        <div className="document-info-item">
          <span className="document-info-label">{t('services.labels.duration')}</span>
          <span className="document-info-value">{duration}</span>
        </div>
        <div className="document-info-item">
          <span className="document-info-label">{t('services.labels.price')}</span>
          <span className="document-info-value">{price}</span>
        </div>
      </div>
    );
  },
);

DocumentMobileInfo.displayName = 'DocumentMobileInfo';


