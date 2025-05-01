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
    transform: `rotateY(${(mousePX || 0) * 30}deg) rotateX(${(mousePY || 0) * -30}deg)`,
    perspective: '1200px',
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  };

  const textStyle = {
    transform: `translate3d(${(mousePX || 0) * 20 * 2}px, ${(mousePY || 0) * 20 * 2}px, 0) scale(1.1)`,
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
        className={`card rebound-box relative z-[0] group/item l:mr-0 mr-[20px] rounded-[4px]  text-[#000] h-[226px] min-w-[300px] w-full`}
        style={
          {
            ...cardStyle,

          }
        }
      >

        <div
          style={{
            ...(!skill.folder && {
              borderColor: `${'#CCCCCC'}`,
              background: `${skill.bg === 'secondary' ? '#93969D26' : '#FFFFFF26'}`,
            }),
            ...(mousePX && { ...textStyle })
          }}
          className={`flex   ${!skill.folder && 'border border-solid'} backdrop-blur-[2px] rounded-[4px] overflow-hidden flex-col gap-[14px] relative z-[1] justify-between h-full transition-all duration-500 ${skill.folder ? '!items-center !justify-center' : 'p-[20px]'}`}
        >
          {
            skill.folder ?
              <>
                <Image alt="folder" className={`transition-all duration-300 rounded-[4px]`} src={skill.img} height={280} />

              </>
              :
              <>

                <span className={`font-bold text-[20px] transition-all duration-500`} >
                  {filterPrepositions(skill.title)}
                </span>
                <div className='grow'>
                  <ul className={`list-disc pl-[17px] ${!skill.isVisible && 'translate-y-[10px] opacity-0'} transition-all duration-500 flex flex-col gap-[5px]`} >
                    {list.map((item, index) =>
                      <li key={index}>{filterPrepositions(item)}</li>
                    )}
                  </ul>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default AppSkillBlock;
