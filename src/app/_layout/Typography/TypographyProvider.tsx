'use client';

import React, { useEffect, useRef } from 'react';
import { useIsMac } from 'shared/hooks/useIsMac';
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
  
  const fontFamily = isMac === null ? fontFamilies.system : getSystemFontFamily(isMac);
  
  // Применяем стили к body, чтобы все элементы получили эти свойства
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const body = document.body;
    const previousStyles: { [key: string]: string } = {};
    
    // Сохраняем предыдущие значения для очистки
    previousStyles['--font-family'] = body.style.getPropertyValue('--font-family');
    previousStyles['--font-weight-small'] = body.style.getPropertyValue('--font-weight-small');
    previousStyles['--font-weight-large'] = body.style.getPropertyValue('--font-weight-large');
    previousStyles['--font-size-threshold'] = body.style.getPropertyValue('--font-size-threshold');
    previousStyles.fontFamily = body.style.fontFamily;
    
    // Применяем новые стили к body
    body.style.setProperty('--font-family', fontFamily);
    body.style.setProperty('--font-weight-small', String(isMac === null ? fontWeightsWindows.small : smallWeight));
    body.style.setProperty('--font-weight-large', String(isMac === null ? fontWeightsWindows.large : largeWeight));
    body.style.setProperty('--font-size-threshold', `${actualThreshold}px`);
    body.style.fontFamily = fontFamily;
    
    // Применяем дополнительные стили из пропсов
    const minHeight = style?.minHeight;
    if (minHeight) {
      previousStyles.minHeight = body.style.minHeight;
      body.style.minHeight = minHeight as string;
    }
    
    // Очистка при размонтировании
    return () => {
      // Восстанавливаем CSS-переменные
      if (previousStyles['--font-family']) {
        body.style.setProperty('--font-family', previousStyles['--font-family']);
      } else {
        body.style.removeProperty('--font-family');
      }
      
      if (previousStyles['--font-weight-small']) {
        body.style.setProperty('--font-weight-small', previousStyles['--font-weight-small']);
      } else {
        body.style.removeProperty('--font-weight-small');
      }
      
      if (previousStyles['--font-weight-large']) {
        body.style.setProperty('--font-weight-large', previousStyles['--font-weight-large']);
      } else {
        body.style.removeProperty('--font-weight-large');
      }
      
      if (previousStyles['--font-size-threshold']) {
        body.style.setProperty('--font-size-threshold', previousStyles['--font-size-threshold']);
      } else {
        body.style.removeProperty('--font-size-threshold');
      }
      
      // Восстанавливаем fontFamily
      body.style.fontFamily = previousStyles.fontFamily || '';
      
      // Восстанавливаем minHeight
      if (previousStyles.minHeight) {
        body.style.minHeight = previousStyles.minHeight;
      } else {
        body.style.removeProperty('minHeight');
      }
    };
  }, [isMac, actualThreshold, smallWeight, largeWeight, fontFamily, style?.minHeight]);
  
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

  return (
    <div 
      ref={containerRef}
      className={`typography-provider ${className}`}
      style={style}
      data-platform={isMac === null ? undefined : (isMac ? 'mac' : 'windows')}
      data-typography-root
    >
      {children}
    </div>
  );
}
