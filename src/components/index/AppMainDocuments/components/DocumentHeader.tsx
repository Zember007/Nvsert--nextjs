import Image from 'next/image';
import { FC, memo } from 'react';
import mainDocumentsStyles from '@/assets/styles/main.module.scss';
import { filterPrepositions } from '@/hook/filter';
import textSize from '@/assets/styles/main.module.scss';

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
      <div className={`${active && mainDocumentsStyles.active} ${mainDocumentsStyles['document__small-img']} `}>
        <Image
          unoptimized={true}
          decoding="async"
          alt="document"
          src={imageUrls.thumbnail}
          width={41}
          height={58}
          priority={index < 2 ? true : false}
          loading={index < 2 ? "eager" : "lazy"}
          sizes="41px"
        />
      </div>

      <div
        className={`${mainDocumentsStyles['document__navigation-bg']} ${mainDocumentsStyles['document__navigation-wrap']} ${mainDocumentsStyles['container-scale']} ${mainDocumentsStyles['transition-scale']} ${mainDocumentsStyles['backface-hidden']} ${
          active ? mainDocumentsStyles.active : 'text-[#000]'
        } group-active/window:text-[#FFF]   `}
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
                ? 'group-hover/window:*:stroke-black'
                : '*:stroke-[#FFF] rotate-[180deg]'
            }  hidden xl:block transition-all duration-200`}
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854"
              stroke="#93969D"
              strokeWidth="2"
            />
            <path
              d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293"
              stroke="#93969D"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  ),
);

DocumentHeader.displayName = 'DocumentHeader';


