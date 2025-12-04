'use client';

import type React from 'react';
import { memo } from 'react';
import Image from 'next/image';

import { slides } from '../utils';
import stylesMainSkills from '@/assets/styles/sections/main/main-skills.module.scss';

export interface SliderImageListProps {
  widthWindow: number | null | undefined;
}

const SliderImageListComponent: React.FC<SliderImageListProps> = ({
  widthWindow,
}) => {
  const gap =
    widthWindow && widthWindow < 960
      ? {
          gap: (widthWindow - 250) / 2,
        }
      : {};

  return (
    <div data-slider="list" className="slider-list" style={gap}>
      {slides.map((item, index) => (
        <div
          key={index}
          data-slider="slide"
          className={`slider-slide ${stylesMainSkills['slider-slide-item']}`}
        >
          <div className={`slide-inner ${stylesMainSkills['slide-inner-content']}`}>
            <Image
              src={item.img}
              alt="slide"
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className={stylesMainSkills['slide-overlay-blend']}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SliderImageList = memo(SliderImageListComponent);

SliderImageList.displayName = 'SliderImageList';

export default SliderImageList;


