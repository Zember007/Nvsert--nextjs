import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const AppSkillBlock = (skill: any) => {
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
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
  };

  const textStyle = {
    transform: `translate3d(${mousePX * 20}px, ${mousePY * 20}px, 0)`, // Текст будет двигаться на 20px в зависимости от мыши
    transition: 'transform 0.1s ease-out' // Плавный переход
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
  };

  const handleMouseLeave = () => {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000));
  };

  return (
    <div className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}>
      <div
        className={`card relative group/item l:mr-0 mr-[20px] rounded-[4px] flex flex-col gap-[14px] justify-between ${skill.folder ? '!items-center !justify-center' : 'p-[20px]'} text-[${skill.bg !== 'secondary' ? '#000' : '#FFF'}] bg-[${skill.bg === 'secondary' ? '#00000099' : '#FFF'}] h-[250px] min-w-[300px] w-full`}
        style={cardStyle}
      >
        {
          skill.folder ?
            <>
              <Image alt="folder" src={skill.img} height={280} />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#34446D] mix-blend-hue"></div>
            </>
            :
            <>
              <span className={`font-bold text-[20px]`} style={textStyle}>
                {skill.title}
              </span>
              <div className='grow'>
                <p className={`${!skill.isVisible && 'translate-y-[10px] opacity-0'} transition-all duration-500`}  style={textStyle}>
                  {skill.text}
                </p>
              </div>
              <button className="rebound-box w-full flex items-center text-left" style={textStyle}>
                <span className="text-[18px] group-hover/item:w-full overflow-hidden whitespace-nowrap w-0 transition-all duration-300">{skill.btn}</span>
                <svg className="rebound" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 7L21 12L16 17" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
        }
      </div>
    </div>
  );
};

export default AppSkillBlock;
