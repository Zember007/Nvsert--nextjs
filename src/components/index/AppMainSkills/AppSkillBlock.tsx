import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { filterPrepositions } from '@/hook/filter';
import useWindowSize from '@/hook/useWindowSize';
import textSize from '@/assets/styles/base/text-size.module.scss';
import stylesMainSkills from '@/assets/styles/main.module.scss';

interface AppSkillBlockProps {
  text: string[];
  folder?: boolean;
  bg?: 'secondary' | string;
  title?: string;
  img?: string | StaticImageData;
  isVisible?: boolean;
}

const AppSkillBlock = ({ text, folder, bg, title, img, isVisible }: AppSkillBlockProps) => {
  const {width: widthWindow} = useWindowSize()

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
    if(!widthWindow || widthWindow < 1407) return
    if (!isVisible) return
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - dimensions.width / 2);
      setMouseY(e.clientY - rect.top - dimensions.height / 2);


    }
  };

  const handleMouseEnter = () => {
    if(!widthWindow || widthWindow < 1407) return

    if (!isVisible) return
    if (mouseLeaveDelay) {
      clearTimeout(mouseLeaveDelay);
    }
  };

  const handleMouseLeave = () => {
    if(!widthWindow || widthWindow < 1407) return

    if (!isVisible) return
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);

    }, 1000));
  };

  const list: string[] = text;

  return (
    <div
      className={`${stylesMainSkills['skill-card-wrapper']} ${!folder ? '' : stylesMainSkills['folder']}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef} >
      <div
        className={`${stylesMainSkills['skill-card-content']} card group/item`}
      >

        <div
          style={{
            ...(!folder && {
              background: `${bg === 'secondary' ? '#93969D26' : '#FFFFFF26'}`,
            }),
            ...(mousePX && { ...cardStyle })
          }}
          className={`${stylesMainSkills['skill-card-inner']} ${folder ? stylesMainSkills['folder'] : ''}`}
        >
          {
            folder ?
              <>
                {img && <Image alt="folder" className={stylesMainSkills['skill-folder-image']} src={img} />}
              </>
              :
              <>
                <h3 className={`${textSize.headerH6} !font-normal`}>
                  {title && filterPrepositions(title)}
                </h3>
                <div className={stylesMainSkills['skill-content-container']}>
                  <ul className={`${stylesMainSkills['skill-list']} ${isVisible ? stylesMainSkills['visible'] : ''}`} >
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
