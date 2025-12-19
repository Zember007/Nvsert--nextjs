import { FC, memo } from 'react';

export interface DocumentMobileInfoProps {
  duration: string;
  price: string;
}

export const DocumentMobileInfo: FC<DocumentMobileInfoProps> = memo(
  ({ duration, price }) => (
    <div className="document-mobile-info">
      <div className="document-info-item">
        <span className="document-info-label">Срок оформления</span>
        <span className="document-info-value">{duration}</span>
      </div>
      <div className="document-info-item">
        <span className="document-info-label">Стоимость</span>
        <span className="document-info-value">{price}</span>
      </div>
    </div>
  ),
);

DocumentMobileInfo.displayName = 'DocumentMobileInfo';


