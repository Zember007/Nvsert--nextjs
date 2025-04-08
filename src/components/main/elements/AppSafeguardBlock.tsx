import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Img from '@/assets/images/safeguarde-img.png';
import { useButton } from '@/hook/useButton';
import { BounceEffect } from '@/hook/useBounce';
interface GuaranteeCardProps {
  title: string;
  items: {
    subtitle: string;
    text: string;
  }[];
  isVisible: boolean

}

const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ title, items, isVisible }) => {
  const { setButtonRef, setWrapperRef, wrapperRefs } = useButton();

  const cardRef = useRef<null | HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      setDimensions({
        width: card.offsetWidth,
        height: card.offsetHeight
      });
    }
  }, [cardRef.current]);

  const mousePX = mouseX / dimensions.width;
  const mousePY = mouseY / dimensions.height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
    perspective: '1200px',
    transition: 'transform 0.3s ease-out'
  };


  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - dimensions.width / 2);
      setMouseY(e.clientY - rect.top - dimensions.height / 2);


    }
  };

  const handleMouseEnter = () => {
    if (mouseLeaveDelay) {
      clearTimeout(mouseLeaveDelay);
    }

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

  const handleMouseLeave = () => {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000));
  };


  return (
    <div className={`hover:z-[10000] relative card-wrap h-full w-full`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}>
      <div
        style={
          {
            ...cardStyle
          }
        }


        className="bg-[#FFF] card border-[#34446D] group h-full border border-solid rounded-[8px] p-[30px] backdrop-blur-[4px] flex flex-col gap-[30px] justify-between">
        <div className="flex flex-col gap-[30px]">
          <div className="overflow-hidden rounded-[4px]  w-full relative">
            <p className="text-[24px] z-[2] text-[#FFF] backdrop-blur-[4px] p-[10px] rounded-[4px] shadow-[0px_0px_4px_0px_#00000033] bg-[#FFFFFF1A] font-bold absolute top-[15px] left-[15px]">{title}</p>
            <Image
              className='w-full h-auto scale-[1.2] group-hover:scale-[1.1] transition-all duration-[2s] ease-in-out'
              alt='document' src={Img}
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <ul className={`list-disc leading-[140%] ${!isVisible && 'translate-y-[10px] opacity-0'} transition-all duration-500 space-y-[10px] pl-[18px] *:*:text-[16px]`}>
            {items.map((item, index) => (
              <li key={index}>
                <h3 className="font-bold">{item.subtitle}</h3>
                <p>{item.text}</p>
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