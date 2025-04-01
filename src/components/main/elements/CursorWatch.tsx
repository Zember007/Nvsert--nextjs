import React from 'react';

const CursorWatch = () => {

    
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
    return (
        <div className={`hover:z-[10000] relative card-wrap ${!skill.folder ? 'cursor-pointer ' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}>

        </div>
    );
};

export default CursorWatch;