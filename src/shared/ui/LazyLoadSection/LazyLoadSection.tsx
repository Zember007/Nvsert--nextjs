'use client';

import React from 'react';

import { useIntersectionObserver } from 'shared/hooks';

interface LazyLoadSectionProps {
  component: React.ComponentType;
}

export const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({ component: Component }) => {
  const { ref, isVisible } = useIntersectionObserver({}, true);

  return (
    <div className="relative">
      <div className="absolute top-0 translate-y-[-1000px]" ref={ref} />
      {isVisible ? <Component /> : null}
    </div>
  );
};


