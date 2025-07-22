import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { filterPrepositions } from '@/hook/filter';
import useWindowWidth from '@/hook/useWindowWidth';

interface AppSkillBlockProps {
  text: string[];
  folder?: boolean;
  bg?: 'secondary' | string;
  title?: string;
  img?: string | StaticImageData;
  isVisible?: boolean;
}

const AppSkillBlock = ({ text, folder, bg, title, img, isVisible }: AppSkillBlockProps) => {
  const widthWindow = useWindowWidth()

  const cardRef = useRef<null | HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card && isVisible) {
      setDimensions({
        width: card.offsetWidth,
        height: card.offsetHeight
      });
    }
  }, [cardRef, isVisible]);

  const mousePX = mouseX / dimensions.width;
  const mousePY = mouseY / dimensions.height;

  const cardStyle = {
    transform: `rotateY(${(mousePX || 0) * 30}deg) rotateX(${(mousePY || 0) * -30}deg) translate3d(${(mousePX || 0) * 20 * 2}px, ${(mousePY || 0) * 20 * 2}px, 0) scale(1.1)`,

    perspective: '1200px',
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!widthWindow || widthWindow < 1240) return
    if (!isVisible) return
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - dimensions.width / 2);
      setMouseY(e.clientY - rect.top - dimensions.height / 2);


    }
  };

  const handleMouseEnter = () => {
    if(!widthWindow || widthWindow < 1240) return

    if (!isVisible) return
    if (mouseLeaveDelay) {
      clearTimeout(mouseLeaveDelay);
    }
  };

  const handleMouseLeave = () => {
    if(!widthWindow || widthWindow < 1240) return

    if (!isVisible) return
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);

    }, 1000));
  };

  const list: string[] = text;

  return (
    <div
      className={`hover:z-[12] relative card-wrap h-[224px] xl:w-[310px] w-[320px] ${!folder ? 'cursor-pointer ' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef} >
      <div
        className={`card rebound-box relative z-[0] h-full group/item  rounded-[6px]  text-[#000]  w-full`}
      >

        <div
          style={{
            ...(!folder && {
              background: `${bg === 'secondary' ? '#93969D26' : '#FFFFFF26'}`,
            }),
            ...(mousePX && { ...cardStyle })
          }}
          className={`flex border-[#93969D]  border-solid rounded-[6px] overflow-hidden flex-col gap-[20px] relative z-[1] justify-between h-full transition-all duration-500 ${folder ? '!items-center !justify-center xl:border' : 'border p-[20px]'}`}
        >
          {
            folder ?
              <>
                {img && <Image alt="folder" className={`transition-all object-cover duration-300 rounded-[6px] h-full`} src={img} />}
              </>
              :
              <>
                <h3 className={`text-[20px] transition-all duration-500`} >
                  {title && filterPrepositions(title)}
                </h3>
                <div className='grow'>
                  <ul className={`font-light list-disc pl-[17px] ${!isVisible && 'translate-y-[10px] opacity-0'} transition-all duration-500 flex flex-col gap-[5px]`} >
                    {list.map((item, index) =>
                      <li key={index}>{filterPrepositions(item)}</li>
                    )}
                  </ul>
                </div>
              </>
          }
        </div>
      </div>
    </div >
  );
};

export default AppSkillBlock;
