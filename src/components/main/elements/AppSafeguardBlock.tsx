import React, { useEffect, useRef, useState } from 'react';

interface GuaranteeCardProps {
  title: string;
  items: {
    subtitle: string;
    text: string;
  }[];
  isVisible:boolean

}

const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ title, items, isVisible }) => {

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
        className="bg-[#FFF] card border-[#34446D] h-full border border-solid rounded-[8px] p-[30px] backdrop-blur-[4px] flex flex-col gap-[19px]">
        <p className="text-[24px] text-[#34446D] font-bold">{title}</p>
        <ul className={`list-disc leading-[140%] ${!isVisible && 'translate-y-[10px] opacity-0'} transition-all duration-500 space-y-[10px] pl-[18px] *:*:text-[16px]`}>
          {items.map((item, index) => (
            <li key={index}>
              <h3 className="font-bold">{item.subtitle}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuaranteeCard;