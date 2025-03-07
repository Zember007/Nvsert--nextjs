import React, { useState, useEffect, useRef } from 'react';


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
      }, [cardRef.current]);  // Отслеживаем только первый рендер
    
      const mousePX = mouseX / dimensions.width;
      const mousePY = mouseY / dimensions.height;
    
      const cardStyle = {
        transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
      };
    
      const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (card) {
          // Получаем координаты мыши относительно окна
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
            <div className={`card l:mr-0 mr-[20px] rounded-[4px] flex  group flex-col gap-[20px] justify-between p-[20px] text-[${skill.bg !== 'secondary' ? '#000' : '#FFF'}] bg-[${skill.bg === 'secondary' ? '#00000099' : '#FFF'}] h-[250px] min-w-[300px] w-full`}
              
                style={cardStyle}
               
            >
                <span className={`font-bold text-[20px]`}>
                    {skill.title}
                </span>
                <div className='grow'>
                    <p className={` ${!skill.isVisible && 'translate-y-[10px] opacity-0'}  transition-all duration-500`}>
                        {skill.text}
                    </p>
                </div>
                <button className="rebound-box group/item w-full flex items-center text-left">
                    <span className="text-[18px] group-hover/item:w-full overflow-hidden whitespace-nowrap  w-0 transition-all duration-300">{skill.btn}</span>
                    <svg className="rebound" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 7L21 12L16 17" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </button>
            </div >
        </div>
    );
};

export default AppSkillBlock;