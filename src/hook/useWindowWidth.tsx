import { useState, useEffect } from 'react';

function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(1920);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useWindowWidth;
