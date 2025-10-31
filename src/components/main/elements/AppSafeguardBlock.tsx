import React, { useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { filterPrepositions } from '@/hook/filter';
import '@/assets/styles/sections/main/safeguard-block.scss';

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
      className={`safeguard-card-wrapper group/box card-wrap ${isVisible ? 'visible' : ''}`}>
      <div className="safeguard-card-border"></div>
      <div className="safeguard-card-content card group">
        <div className="safeguard-card-inner">
          <div className="safeguard-image-container">

            <h5 className="safeguard-title-overlay"
            >{filterPrepositions(title)}</h5>
            <Image
              className='safeguard-image'
              alt='document' src={img}
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="safeguard-content-container">
            {items.map((item, index) =>
              <div
                onClick={() => {
                  const isMobile = window.matchMedia("(pointer: coarse)").matches;
                  if (!isMobile) return
                  setActiveBlock(activeBlock === index ? null : index)
                }}
                key={index} className={`safeguard-item group/stroke ${index === items.length - 1 ? '' : ''}`}>
                <div className="safeguard-item-header">
                  <p className='safeguard-item-title text-1'>{item.subtitle.split(' ').length === 2 ?
                    <>
                      {item.subtitle.split(' ')[0]} <br />
                      {item.subtitle.split(' ')[1]}
                    </>
                    : filterPrepositions(item.subtitle)}</p>


               


                  <svg
                    className={`safeguard-arrow-icon ${activeBlock === index ? 'active' : ''}`}
                    width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="#93969D" stroke-width="2" />
                    <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="#93969D" stroke-width="2" />
                  </svg>


                </div>


                <div className={`safeguard-item-content ${activeBlock === index ? 'active' : ''}`}>
                  <ul
                    ref={(el) => setBounceEl(el)}
                    className={`safeguard-item-list`}>

                    <li className={`safeguard-list-item ${activeBlock === index ? 'active' : ''}`} key={index}>
                      <p className='text-2'>{filterPrepositions(item.text)}</p>
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