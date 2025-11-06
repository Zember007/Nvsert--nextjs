export const fontFamilies = {
  system: '"Segoe UI", Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  mac: 'var(--font-roboto), -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  windows: '"Segoe UI", Roboto, Arial, sans-serif',
};

// До 16px ВКЛЮЧИТЕЛЬНО - малые тексты, больше 16px - крупные тексты
export const FONT_SIZE_THRESHOLD = 16;

export const fontWeightsMac = {
  small: 300,  
  large: 400,  
} as const;

export const fontWeightsWindows = {
  small: 350,  
  large: 400, 
} as const;


export const TEXT_ELEMENTS = new Set([
  'p', 'span', 'div', 'a', 'button', 'label', 'li', 'td', 'th', 
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'small', 'strong', 'em', 'b', 'i', 'u', 'mark', 'code', 'pre',
  'blockquote', 'figcaption', 'caption', 'legend',
  'dt', 'dd', 'summary', 'details',
  'section', 'article', 'aside', 'nav', 'main', 'address',
  'time', 'cite', 'q', 'abbr', 'data', 'samp', 'kbd', 'var', 'sub', 'sup'
]);

// пропускаем элементы которые не нужны для типографики
export const SKIP_ELEMENTS = new Set([
  'script', 'style', 'noscript', 'svg', 'input', 'textarea', 'select', 
  'img', 'canvas', 'video', 'audio', 'iframe', 'br', 'hr', 'wbr'
]);
