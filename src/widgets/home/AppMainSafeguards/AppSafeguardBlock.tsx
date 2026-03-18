import React, { useRef, useState } from 'react';
import type { StaticImageData } from 'next/image';
import { filterPrepositions } from 'shared/lib';
import Image from 'shared/ui/OptimizedImage';
import textSize from '@/assets/styles/base/base.module.scss';
import stylesSafeguards from '@/assets/styles/sections/main/main-safeguards.module.scss';

interface GuaranteeCardProps {
  img: StaticImageData;
  title: string;
  items: {
    subtitle: string;
    text: string;
  }[];
  isVisible: boolean,
  index: number
}

const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ title, items, isVisible, index, img }) => {

  const bounceEl = useRef<HTMLElement[]>([])

  const setBounceEl = (el?: HTMLElement | null) => {
    if (!el) return
    bounceEl.current.push(el)
  }

  const [activeBlock, setActiveBlock] = useState<null | number>(null)


  return (
    <div
      className={`${stylesSafeguards['safeguard-card-wrapper']} group/box ${stylesSafeguards['card-wrap']} ${isVisible ? stylesSafeguards.visible : ''}`}>
      <div className={stylesSafeguards['safeguard-card-border']}></div>
      <div className={`${stylesSafeguards['safeguard-card-content']} ${stylesSafeguards.card} group`}>
        <div className={stylesSafeguards['safeguard-card-inner']}>
          <div className={stylesSafeguards['safeguard-image-container']}>

            <p className={`${textSize.headerH5} ${stylesSafeguards['safeguard-title-overlay']}`}
            >{filterPrepositions(title)}</p>
            <Image
              className={stylesSafeguards['safeguard-image']}
              alt='document' src={img}
              width={320}
              height={200}
              sizes="(max-width: 479px) 280px, (max-width: 767px) 320px, 310px"
              loading="lazy"
            />
          </div>
          <div className={stylesSafeguards['safeguard-content-container']}>
            {items.map((item, index) =>
              <div
                onClick={() => {
                  const isMobile = window.matchMedia("(pointer: coarse)").matches;
                  if (!isMobile) return
                  setActiveBlock(activeBlock === index ? null : index)
                }}
                key={index} className={`${stylesSafeguards['safeguard-item']} group/stroke ${index === items.length - 1 ? '' : ''}`}>
                <div className={stylesSafeguards['safeguard-item-header']}>
                  <p className={`${textSize.text1} ${stylesSafeguards['safeguard-item-title']}`}>{item.subtitle.split(' ').length === 2 ?
                    <>
                      {item.subtitle.split(' ')[0]} <br />
                      {item.subtitle.split(' ')[1]}
                    </>
                    : filterPrepositions(item.subtitle)}</p>


               


                  <svg
                    className={`${stylesSafeguards['safeguard-arrow-icon']} ${activeBlock === index ? stylesSafeguards.active : ''}`}
                    width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8V7H8V6H7V5H6V6H5V7H6V8H7V9H8V10H9V11H10V12H11V13H12V14H13V15H14V16H7V18H16L18 16V7H16V14H15V13H14V12H13V11H12V10H11V9H10V8H9Z" fill="currentColor" />
                    <path d="M3 4H4V3V2H3V1H2V0H1V1H0V2H1V3H2V4H3Z" fill="currentColor" />
                  </svg>


                </div>


                <div className={`${stylesSafeguards['safeguard-item-content']} ${activeBlock === index ? stylesSafeguards.active : ''}`}>
                  <ul
                    ref={(el) => setBounceEl(el)}
                    className={stylesSafeguards['safeguard-item-list']}>

                    <li className={`${stylesSafeguards['safeguard-list-item']} ${activeBlock === index ? stylesSafeguards.active : ''}`} key={index}>
                      <p className={`${textSize.text2}`}>{filterPrepositions(item.text)}</p>
                    </li>

                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeCard;