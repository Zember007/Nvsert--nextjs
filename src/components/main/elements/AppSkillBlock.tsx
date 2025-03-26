import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { filterPrepositions } from '@/hook/filter';

const AppSkillBlock = (skill: any) => {
  const cardRef = useRef<null | HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [oldMousePX, setOldMousePX] = useState(0);
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

  const textStyle = {
    transform: `translate3d(${mousePX * 20 * 2}px, ${mousePY * 20 * 2}px, 0) scale(1.1)`,
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  };


  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - dimensions.width / 2);
      setMouseY(e.clientY - rect.top - dimensions.height / 2);

      setOldMousePX(e.clientX - rect.left - dimensions.width / 2)

    }
  };

  const handleMouseEnter = () => {
    if (mouseLeaveDelay) {
      clearTimeout(mouseLeaveDelay);
    }
  };

  const handleMouseLeave = () => {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
      setTimeout(() => {
        setOldMousePX(0)
      }, 500)
    }, 1000));
  };

  const list: string[] = skill.text;

  return (
    <div className={`hover:z-[10000] relative card-wrap ${!skill.folder ? 'cursor-pointer ' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}>
      <div
        className={`card rebound-box relative z-[0] group/item l:mr-0 mr-[20px] rounded-[4px] flex flex-col gap-[14px] justify-between ${skill.folder ? '!items-center !justify-center' : 'p-[20px]'} text-[#000] h-[250px] min-w-[300px] w-full`}
        style={
          {
            ...cardStyle,
            background: `${skill.bg === 'secondary' ? '#CCCCCC' : '#FFF'}`
            
          }
        }
      >

        {
          skill.folder ?
            <>
              <Image alt="folder" className='transition-all duration-300' src={skill.img} height={280} style={mousePX ? textStyle : {}} />
              <div className="absolute rounded-[10px] top-0 left-0 right-0 transition-all duration-300 bottom-0 bg-[#34446D] mix-blend-hue"></div>
              <div
                style={{
                  borderColor: `#CCCCCC`,
                  ...(mousePX && { ...textStyle })
                }}
                className={`absolute z-[-1] ${oldMousePX && 'backdrop-blur-[2px]'} transition-all duration-500 rounded-[4px] top-0 left-0 right-0 bottom-0 border border-solid`}
              ></div>
            </>
            :
            <>
              <div
                style={{
                  borderColor: `${skill.bg === 'secondary' ? '#FFFFFF' : '#CCCCCC'}`,
                  ...(mousePX && { ...textStyle })
                }}
                className={`absolute z-[-1] ${oldMousePX && 'backdrop-blur-[2px]'} transition-all duration-500 rounded-[4px] top-0 left-0 right-0 bottom-0 border border-solid`}
              ></div>
              <span className={`font-bold text-[20px] transition-all duration-500`} style={mousePX ? textStyle : {}}>
                {filterPrepositions(skill.title)}
              </span>
              <div className='grow'>
                <ul className={`list-disc pl-[17px] ${!skill.isVisible && 'translate-y-[10px] opacity-0'} transition-all duration-500 flex flex-col gap-[5px]`} style={mousePX ? textStyle : {}}>
                  {list.map((item, index) =>
                    <li key={index}>{filterPrepositions(item)}</li>
                  )}
                </ul>
              </div>
              <button className=" w-full flex items-center text-left transition-all duration-500" style={mousePX ? textStyle : {}}>
                <span className={`text-[18px] group-hover/item:w-full ${oldMousePX && 'w-full'} overflow-hidden whitespace-nowrap w-0 transition-all group-hover/item:duration-300`}>{skill.btn}</span>
                <svg className="rebound" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke={`#000`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 7L21 12L16 17" stroke={`#000`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
        }
      </div>
    </div>
  );
};

export default AppSkillBlock;
