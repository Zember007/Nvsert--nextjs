// components/LazyLoadSection.tsx
'use client';

import React from 'react';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

interface LazyLoadSectionProps {
  component: React.ComponentType;
}

const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({ component: Component }) => {
  const { ref, isVisible } = useIntersectionObserver({}, true);

  return (
    <div className='relative' >
      <div className="absolute top-0 translate-y-[-1000px]" 
      ref={ref}></div>
      {isVisible ? <Component /> : null}
    </div>
  );
};

export default LazyLoadSection;