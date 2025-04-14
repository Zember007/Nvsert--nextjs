import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Img from '@/assets/images/safeguarde-img.png';
import { useButton } from '@/hook/useButton';
import { BounceEffect } from '@/hook/useBounce';
import { filterPrepositions } from '@/hook/filter';
interface GuaranteeCardProps {
  title: string;
  items: {
    subtitle: string;
    text: string;
  }[];
  isVisible: boolean,
  index: number

}

const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ title, items, isVisible, index }) => {
  const { setButtonRef, setWrapperRef, wrapperRefs } = useButton();


  const handleMouseEnter = () => {

    wrapperRefs.current.forEach((wrapper) => {
      BounceEffect(wrapper, {
        startPosition: "0",
        endPosition: `-${30}px`,
        duration: 300,
        easing: "ease-in",
        direction: 'vertical'
      });
    })
  };

 

  return (
    <div className={`hover:z-[10000] relative card-wrap h-full w-full translate-y-[0] ${!isVisible && '!translate-y-[30px] opacity-0'} transition-all duration-500 `}
      onMouseEnter={handleMouseEnter}
      >
      <div


        className="bg-[#FFF] card border-[#CCCCCC] group h-full border border-solid rounded-[8px] p-[30px] backdrop-blur-[4px] flex flex-col gap-[29px] justify-between">
        <div className="flex flex-col gap-[30px]">
          <div className="overflow-hidden rounded-[4px]  w-full relative">
            <p className="text-[24px] z-[2] text-[#FFF] backdrop-blur-[4px] p-[10px] rounded-[4px] shadow-[0px_0px_4px_0px_#00000033] bg-[#FFFFFF1A] font-bold absolute top-[15px] left-[15px]"
            style={{
              maxWidth: (index === 0 ? '300' :index === 1? '200' : '220')+'px'
            }}
            >{filterPrepositions(title)}</p>
            <Image
              className='w-full h-auto scale-[1.2] group-hover:scale-[1.1] transition-all duration-[2s] ease-in-out'
              alt='document' src={Img}
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <ul className={`list-disc leading-[140%] pl-[18px] *:*:text-[16px]`}>
            {items.map((item, index) => (
              <li key={index}>
                <h3 className="font-bold">{filterPrepositions(item.subtitle)}</h3>
                <p className='leading-[1.22]'>{filterPrepositions(item.text)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="tariff-wrap opacity-0 group-hover:opacity-100 transition-all duration-300 w-[245px]" ref={setWrapperRef}>
          <button ref={setButtonRef} className='justify-center group/btn border-[#34446D] border border-solid tariff text-[20px] transition-all duration-300 font-bold tracking-normal m:flex items-center gap-[6px] px-[10px] py-[9px] text-[#34446D] hover:text-[#FFF] rounded-[4px]  group hover:bg-[#34446D]  leading-[1]'>
            <span>Оформить заявку</span>
            <svg className='group-hover/btn:*:fill-[#FFF] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeCard;