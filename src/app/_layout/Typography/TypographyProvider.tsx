'use client';

import React, { useEffect, useRef } from 'react';
import { useIsMac } from '@/hook/useIsMac';
import { 
  getSystemFontFamily, 
  processElementsBatched,
  processAddedNodes,
} from './utils';
import { fontFamilies, fontWeightsMac, fontWeightsWindows, FONT_SIZE_THRESHOLD } from './constants';
import './TypographyProvider.css';

interface TypographyProviderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  smallWeightMac?: number;
  largeWeightMac?: number;
  smallWeightWindows?: number;
  largeWeightWindows?: number;
}


export function TypographyProvider({ 
  children, 
  className = '',
  style = {},
  threshold,
  smallWeightMac,
  largeWeightMac,
  smallWeightWindows,
  largeWeightWindows,
}: TypographyProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const pendingNodesRef = useRef<Set<HTMLElement>>(new Set());
  const rafIdRef = useRef<number | null>(null);

  const appliedWeightsRef = useRef<WeakMap<HTMLElement, string>>(new WeakMap());
  
  const isMac = useIsMac();
  
  const actualThreshold = threshold ?? FONT_SIZE_THRESHOLD;
  const weights = isMac ? fontWeightsMac : fontWeightsWindows;
  const smallWeight = isMac ? (smallWeightMac ?? weights.small) : (smallWeightWindows ?? weights.small);
  const largeWeight = isMac ? (largeWeightMac ?? weights.large) : (largeWeightWindows ?? weights.large);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMac === null) return; 
    
    const appliedWeights = appliedWeightsRef.current;
    
    processElementsBatched(container, actualThreshold, smallWeight, largeWeight, appliedWeights);
    
    const processPendingNodes = () => {
      if (pendingNodesRef.current.size === 0) {
        rafIdRef.current = null;
        return;
      }
      
      const nodes = Array.from(pendingNodesRef.current);
      pendingNodesRef.current.clear();
      
      processAddedNodes(nodes, actualThreshold, smallWeight, largeWeight, appliedWeights);
      
      rafIdRef.current = null;
    };
    
    // mo добавления новых элементов
    observerRef.current = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              pendingNodesRef.current.add(node as HTMLElement);
            }
          }
        }
      }
      
      if (rafIdRef.current === null && pendingNodesRef.current.size > 0) {
        rafIdRef.current = requestAnimationFrame(processPendingNodes) as unknown as number;
      }
    });
    
    observerRef.current.observe(container, {
      childList: true,
      subtree: true,
    });
    
    resizeObserverRef.current = new ResizeObserver(() => {
      processElementsBatched(container, actualThreshold, smallWeight, largeWeight, appliedWeights);
    });
    
    resizeObserverRef.current.observe(container);
    
    return () => {
      observerRef.current?.disconnect();
      resizeObserverRef.current?.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isMac, actualThreshold, smallWeight, largeWeight]);
  
  const fontFamily = isMac === null ? fontFamilies.system : getSystemFontFamily(isMac);
  
  const providerStyles = {
    '--font-family': fontFamily,
    '--font-weight-small': isMac === null ? fontWeightsWindows.small : smallWeight,
    '--font-weight-large': isMac === null ? fontWeightsWindows.large : largeWeight,
    '--font-size-threshold': `${actualThreshold}px`,
    fontFamily,
    minHeight: '100vh',
    ...style,
  } as React.CSSProperties;

  return (
    <div 
      ref={containerRef}
      className={`typography-provider ${className}`}
      style={providerStyles}
      data-platform={isMac === null ? undefined : (isMac ? 'mac' : 'windows')}
      data-typography-root
    >
      {children}
    </div>
  );
}
