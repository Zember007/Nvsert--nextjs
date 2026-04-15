/**
 * Определение платформы Mac/не-Mac для адаптации рендеринга шрифтов.
 *
 * Возвращает: true (Mac/iOS), false (Windows/Android/Linux), null (SSR/первый кадр).
 * null — нейтральное состояние до гидрации, TypographyProvider использует Windows-веса
 * как fallback чтобы избежать layout shift.
 *
 * iPad corner case: iPad с "Desktop mode" имеет navigator.platform = "MacIntel",
 * но это touch-устройство → maxTouchPoints > 1 → определяется как Mac (корректно:
 * у него то же сглаживание шрифтов, что у настоящего Mac).
 */
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


