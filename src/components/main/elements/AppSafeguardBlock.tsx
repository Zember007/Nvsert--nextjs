import React, { useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { filterPrepositions } from '@/hook/filter';

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
      className={`z-[0] xl:min-w-[300px] min-w-[320px] xl:w-auto w-[320px] relative card-wrap xl:h-[517px] h-[530px]  group/box translate-y-[0] ${!isVisible && '!translate-y-[30px] opacity-0'} transition-all duration-500 `}>
      <div className="absolute top-[2px] left-0 right-0 bottom-0 border-[#93969d] group-hover/box:border-[#34446D] z-[-1] pointer-events-none border border-solid  rounded-[6px]"></div>
      <div className="bg-[#FFFFFF26] group-hover/box:bg-[#34446D33] group !shadow-none card  h-full  rounded-[6px] flex flex-col gap-[29px] justify-between ">
        <div className="flex flex-col gap-[20px] h-full">
          <div className="overflow-hidden h-[200px]  w-full relative rounded-t-[8px]">
          
            <p className="shadow-[inset_0_0_6px_0_rgba(255,_255,_255,_0.3),_0_0_10px_0_rgba(0,_0,_0,_0.8)] text-[22px] z-[2] text-[#FFF] backdrop-blur-[4px] p-[10px] rounded-[4px] bg-[#FFFFFF1A]  absolute top-[15px] left-[15px] w-[210px] font-light"
            >{filterPrepositions(title)}</p>
            <Image
              className='w-auto min-w-full h-full transition-all duration-100 ease-in-out'
              alt='document' src={img}
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="px-[15px] flex flex-col grow">
            {items.map((item, index) =>
              <div
                onClick={() => { 
                  const isMobile = window.matchMedia("(pointer: coarse)").matches;
                  if(!isMobile) return
                  setActiveBlock(activeBlock === index ? null : index) 
                }}
                key={index} className={`group/stroke flex flex-col ${index == items.length - 1 ? 'grow' : 'pb-[20px]'}`}>
                <div className="flex justify-between gap-[20px]">
                  <p className='text-[18px] transition-all duration-100'>{item.subtitle.split(' ').length === 2 ?
                    <>
                      {item.subtitle.split(' ')[0]} <br />
                      {item.subtitle.split(' ')[1]}
                    </>
                    : filterPrepositions(item.subtitle)}</p>


                  <svg
                    className={` min-w-[24px] rotate-[0deg] xl:group-hover/stroke:rotate-[180deg] ${activeBlock === index ? 'rotate-[180deg]' : ''} transition-all duration-100`}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5L19 19" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19 11L19 19L11 19" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                </div>


                <div className={`overflow-hidden transition-all duration-100 xl:group-hover/stroke:max-h-[95px] ${activeBlock === index ? 'max-h-[95px]' : ''} max-h-0`}>
                  <ul
                    ref={(el) => setBounceEl(el)}
                    className={`list-disc leading-[140%] pl-[35px] *:*:text-[16px] pt-[5px] overflow-hidden`}>

                    <li className={`will-change-transform duration-100 font-light transition-all opacity-0 translate-x-[-100%] ${activeBlock === index ? 'opacity-100 translate-x-[0]' : ''} xl:group-hover/stroke:opacity-100 xl:group-hover/stroke:translate-x-[0] `} key={index}>
                      <p >{filterPrepositions(item.text)}</p>
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