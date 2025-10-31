/**
 * Константы для типографики
 */

export const fontFamilies = {
  system: '"Segoe UI", Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  mac: 'var(--font-roboto), -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  windows: '"Segoe UI", Roboto, Arial, sans-serif',
};

// До 16px ВКЛЮЧИТЕЛЬНО - малые тексты, больше 16px - крупные тексты
export const FONT_SIZE_THRESHOLD = 16;

// Веса для Mac с учетом размера текста 
export const fontWeightsMac = {
  small: 300,  // ≤16px - Roboto Light
  large: 400,  // >16px - Roboto Regular
} as const;

// Веса для Windows с учетом размера текста 
export const fontWeightsWindows = {
  small: 350,  
  large: 400, 
} as const;

export const fontSizes = {
  xs: '11px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '26px',
  '4xl': '28px',
  '5xl': '32px',
} as const;

export const lineHeights = {
  tight: '100%',
  normal: '120%',
  relaxed: '140%',
  loose: '160%',
} as const;

