import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { filterPrepositions } from '@/hook/filter';

const AppSkillBlock = () => {
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
  };

  const handleMouseLeave = () => {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
      setTimeout(() => {
      }, 500)
    }, 1000));
  };


  return (
    <div className={`hover:z-[10000] relative card-wrap `}
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
    
      </div>
    </div>
  );
};

export default AppSkillBlock;
