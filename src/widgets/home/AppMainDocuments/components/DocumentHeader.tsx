import Image from 'shared/ui/OptimizedImage';
import { FC, memo } from 'react';
import mainDocumentsStyles from '@/assets/styles/sections/main/main-documents.module.scss';
import { filterPrepositions } from 'shared/lib';
import textSize from '@/assets/styles/base/base.module.scss';
import { getStrapiImageApiPath } from '../../../../shared/lib/strapi-image';

export interface DocumentHeaderProps {
  title: string;
  duration: string;
  price: string;
  imageUrls: {
    thumbnail: string;
  };
  active: boolean;
  onClick: () => void;
  index: number;
}

export const DocumentHeader: FC<DocumentHeaderProps> = memo(
  ({ title, duration, price, imageUrls, active, onClick, index }) => (
    <div
      onClick={onClick}
      className={`${mainDocumentsStyles['document__navigation']} group/window ${!active ? '' : mainDocumentsStyles.active} `}
    >
      <div className={`${active && mainDocumentsStyles.active} ${mainDocumentsStyles['document__small-img']}`} style={{ width: 41, height: 58 }}>
        <Image
          decoding="async"
          alt="document"
          src={getStrapiImageApiPath(imageUrls.thumbnail) || imageUrls.thumbnail}
          width={41}
          height={58}
          priority={index < 2}
          loading={index < 2 ? 'eager' : 'lazy'}
          sizes="41px"
          style={{ width: 41, height: 58, objectFit: 'cover' }}
        />
      </div>

      <div
        className={`${mainDocumentsStyles['document__navigation-bg']} ${mainDocumentsStyles['document__navigation-wrap']} ${mainDocumentsStyles['container-scale']} ${mainDocumentsStyles['transition-scale']} ${mainDocumentsStyles['backface-hidden']} ${
          active ? mainDocumentsStyles.active : 'text-[#000]'
        } group-active/window:text-[#000]   `}
      >
        <h3 className={`${textSize.headerH6} ${mainDocumentsStyles['document__title']} `}>
          {filterPrepositions(title)}
        </h3>
        <div className={`${mainDocumentsStyles['document__desc-wrap']} `}>
          <p className={`${textSize.headerH6} ${mainDocumentsStyles['document__desc']} `}>{duration}</p>
          <p className={`${textSize.headerH6} ${mainDocumentsStyles['document__desc']} `}>{price}</p>

          <svg
            className={`${
              !active
                ? 'group-hover/window:*:fill-black'
                : '*:fill-black rotate-[180deg]'
            }  hidden xl:block transition-all duration-200`}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 8V7H8V6H7V5H6V6H5V7H6V8H7V9H8V10H9V11H10V12H11V13H12V14H13V15H14V16H7V18H16H18V16V7H16V14H15V13H14V12H13V11H12V10H11V9H10V8H9Z"
              fill="#93969D"
            />
            <path
              d="M3 4H4V3V2H3V1H2V0H1V1H0V2H1V3H2V4H3Z"
              fill="#93969D"
            />
          </svg>
        </div>
      </div>
    </div>
  ),
);

DocumentHeader.displayName = 'DocumentHeader';


