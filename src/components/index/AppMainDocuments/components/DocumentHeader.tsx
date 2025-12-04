import Image from 'next/image';
import { FC, memo } from 'react';

import { filterPrepositions } from '@/hook/filter';
import textSize from '@/assets/styles/base/base.module.scss';

export interface DocumentHeaderProps {
  title: string;
  duration: string;
  price: string;
  imageUrls: {
    thumbnail: string;
  };
  active: boolean;
  onClick: () => void;
}

export const DocumentHeader: FC<DocumentHeaderProps> = memo(
  ({ title, duration, price, imageUrls, active, onClick }) => (
    <div
      onClick={onClick}
      className={`document__navigation group/window ${!active ? '' : 'active'} `}
    >
      <div className={`${active && 'active'} document__small-img `}>
        <Image
          alt="document"
          src={imageUrls.thumbnail}
          width={41}
          height={58}
          loading="lazy"
          sizes="41px"
        />
      </div>

      <div
        className={`document__navigation-bg document__navigation-wrap container-scale transition-scale backface-hidden ${
          active ? 'active' : 'text-[#000]'
        } group-active/window:text-[#FFF]   `}
      >
        <h3 className={`${textSize.headerH6} document__title`}>
          {filterPrepositions(title)}
        </h3>
        <div className="document__desc-wrap">
          <p className={`${textSize.headerH6} document__desc`}>{duration}</p>
          <p className={`${textSize.headerH6} document__desc`}>{price}</p>

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


