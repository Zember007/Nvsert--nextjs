import React, { useRef } from 'react';
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

  // const MouseEnter = (index: any) => {
  //   const el = bounceEl.current[index]
  //   if (!el) return

  //   BounceEffect(el, {
  //     startPosition: "0",
  //     endPosition: `${10}px`,
  //     duration: 300,
  //     easing: "ease",
  //     direction: 'vertical'
  //   });
  // }

  return (
    <div className={`hover:z-[10000] relative card-wrap h-[540px] w-full translate-y-[0] ${!isVisible && '!translate-y-[30px] opacity-0'} transition-all duration-500 `}>
      <div
        className="bg-[#FFF] hover:bg-[#F5F5F5] card border-[#CCCCCC] hover:border-[#34446D] group h-full border border-solid rounded-[8px] backdrop-blur-[4px] flex flex-col gap-[29px] justify-between transition-all duration-300">
        <div className="flex flex-col gap-[30px]">
          <div className="overflow-hidden rounded-[4px] h-[200px]  w-full relative">
            <p className="text-[24px] z-[2] text-[#FFF] backdrop-blur-[4px] p-[10px] rounded-[4px] shadow-[0px_0px_4px_0px_#00000033] bg-[#FFFFFF1A] font-bold absolute top-[15px] left-[15px]"
              style={{
                maxWidth: (index === 3 ? '230' : '207') + 'px'
              }}
            >{filterPrepositions(title)}</p>
            <Image
              className='w-auto h-full group-hover:scale-[1.1] scale-[1] transition-all duration-[2s] ease-in-out'
              alt='document' src={img}
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <div className="px-[15px] flex flex-col gap-[20px]">
            {items.map((item, index) =>
              <div
                // onMouseEnter={() => { MouseEnter(index) }}
                key={index} className="group/stroke flex flex-col">
                <div className="flex gap-[5px]">
                  <svg
                    className={`rotate-[180deg] group-hover/stroke:rotate-[0deg] group-hover/stroke:*:stroke-[#34446D] *:transition-all *:duration-300 transition-all duration-300`}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19L5 5" stroke={`black`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 13L5 5L13 5" stroke={`black`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className='text-[20px] font-bold  group-hover/stroke:text-[#34446D] transition-all duration-300'>{filterPrepositions(item.subtitle)}</p>
                </div>

                <div className="overflow-hidden transition-all duration-300 group-hover/stroke:max-h-[95px] max-h-0">
                  <ul
                    ref={(el) => setBounceEl(el)}
                    className={`list-disc leading-[140%] pl-[35px] *:*:text-[16px] pt-[5px] overflow-hidden transition-all duration-300`}>

                    <li key={index}>
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