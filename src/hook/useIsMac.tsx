'use client';

import { useState, useEffect } from 'react';

export const useIsMac = () => {
  const [isMac, setIsMac] = useState<boolean | null>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    
    const hasAppleUA = /Mac|iPhone|iPad/.test(userAgent);
    
    const hasMacPlatform = /^Mac/.test(platform);
  
    const isIPadWithDesktopUA = hasMacPlatform && navigator.maxTouchPoints > 1;
    
    setIsMac(hasAppleUA || hasMacPlatform || isIPadWithDesktopUA);
  }, []);

  return isMac;
};


