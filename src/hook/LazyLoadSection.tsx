

import React from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface LazyLoadSectionProps {
  component: React.ComponentType;
}

const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({ component: Component }) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref}>
      {isVisible ? <Component /> : null}
    </div>
  );
};

export default LazyLoadSection;