export { 
  fontFamilies, 
  fontWeightsMac, 
  fontWeightsWindows, 
  FONT_SIZE_THRESHOLD,
  TEXT_ELEMENTS,
  SKIP_ELEMENTS
} from './constants';

export { 
  getSystemFontFamily,
  hasTextContent,
  shouldIgnoreElement,
  collectElementsWithTreeWalker,
  collectElementData,
  applyFontWeights,
  processElementsBatched,
  processAddedNodes,
  requestIdleCallbackPolyfill
} from './utils';

export type { ElementData } from './utils';

export { TypographyProvider } from './TypographyProvider';
