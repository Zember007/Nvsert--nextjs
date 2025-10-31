
'use client';

import React from 'react';
/* import { useIsMac } from '@/hooks/useIsMac'; */
import { getSystemFontFamily } from './utils';
import { fontWeightsMac, fontWeightsWindows, FONT_SIZE_THRESHOLD } from './constants';
import './TypographyProvider.css';

interface TypographyProviderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}


export function TypographyProvider({ 
  children, 
  className = '',
  style = {} 
}: TypographyProviderProps) {
  const isMac = true;
  
  const weights = isMac ? fontWeightsMac : fontWeightsWindows;
  
  const providerStyles: React.CSSProperties = {
    '--font-family': getSystemFontFamily(isMac),
    '--font-weight-small': weights.small,   // ≤16px
    '--font-weight-large': weights.large,   // >16px
    '--font-size-threshold': `${FONT_SIZE_THRESHOLD}px`,
    fontFamily: getSystemFontFamily(isMac),
    minHeight: '100vh',
    ...style,
  } as React.CSSProperties;

  return (
    <div 
      className={`typography-provider ${className}`}
      style={providerStyles}
      data-platform={isMac ? 'mac' : 'windows'}
    >
      {children}
    </div>
  );
}

