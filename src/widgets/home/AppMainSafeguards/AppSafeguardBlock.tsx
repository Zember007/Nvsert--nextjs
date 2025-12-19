import React, { useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { filterPrepositions } from 'shared/lib';
import textSize from '@/assets/styles/main.module.scss';
import stylesSafeguards from '@/assets/styles/main.module.scss';

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
              width="0"
              height="0"
              sizes="100vw"
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
                    width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="currentColor" strokeWidth="2" />
                    <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="currentColor" strokeWidth="2" />
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