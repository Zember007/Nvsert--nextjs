import React from 'react';
import { useCustomScroll, CustomScrollOptions } from 'shared/hooks';

interface CustomScrollbarProps extends CustomScrollOptions {
  className?: string;
  style?: React.CSSProperties;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  className = 'scrollbar window',
  style,
  ...scrollOptions
}) => {
  const { scrollbarRef } = useCustomScroll(scrollOptions);

  return (
    <span 
      ref={scrollbarRef} 
      className={className}
      style={{
        ...style,
        display: 'none'
      }}
    />
  );
};

export default CustomScrollbar; 