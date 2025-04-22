import React from 'react';
import Image from 'next/image';
import Img from '@/assets/images/safeguarde-img.png';
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






  return (
    <div className={`hover:z-[10000] relative card-wrap h-[540px] w-full translate-y-[0] ${!isVisible && '!translate-y-[30px] opacity-0'} transition-all duration-500 `}>
      <div
        className="bg-[#FFF] card border-[#CCCCCC] group h-full border border-solid rounded-[8px] backdrop-blur-[4px] flex flex-col gap-[29px] justify-between">
        <div className="flex flex-col gap-[30px]">
          <div className="overflow-hidden rounded-[4px]  w-full relative">
            <p className="text-[24px] z-[2] text-[#FFF] backdrop-blur-[4px] p-[10px] rounded-[4px] shadow-[0px_0px_4px_0px_#00000033] bg-[#FFFFFF1A] font-bold absolute top-[15px] left-[15px]"
              style={{
                maxWidth: (index === 0 ? '300' : index === 1 ? '200' : '220') + 'px'
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
          <div className="px-[15px] flex flex-col gap-[20px]">
            {items.map((item, index) =>
              <div key={index} className="group/stroke flex flex-col">
                <div className="flex gap-[5px]">
                  <svg
                    className={`rotate-[180deg] group-hover/stroke:rotate-[0deg] group-hover/stroke:*:stroke-[#34446D] *:transition-all *:duration-200 transition-all duration-200`}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19L5 5" stroke={`black`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 13L5 5L13 5" stroke={`black`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className='text-[20px] font-bold  group-hover/stroke:text-[#34446D] transition-all duration-200'>{filterPrepositions(item.subtitle)}</p>
                </div>

                <ul className={`list-disc leading-[140%] pl-[35px] *:*:text-[16px] mt-0 overflow-hidden group-hover/stroke:mt-[5px] transition-all duration-200 group-hover/stroke:max-h-[88px] max-h-0`}>

                  <li key={index}>
                    <p >{filterPrepositions(item.text)}</p>
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeCard;