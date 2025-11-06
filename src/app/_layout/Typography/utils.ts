import { fontFamilies, TEXT_ELEMENTS, SKIP_ELEMENTS } from './constants';

export function getSystemFontFamily(isMac: boolean = false): string {
  return isMac ? fontFamilies.mac : fontFamilies.windows;
}

export const requestIdleCallbackPolyfill = typeof window !== 'undefined' 
  ? (window.requestIdleCallback || ((cb: IdleRequestCallback) => setTimeout(cb, 1)))
  : ((cb: IdleRequestCallback) => setTimeout(cb, 1));


export function hasTextContent(element: HTMLElement): boolean {
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) {
      return true;
    }
  }
  
  const text = element.textContent?.trim();
  return Boolean(text && text.length > 0);
}

export function shouldIgnoreElement(element: HTMLElement): boolean {
  // data-typography-ignore
  if (element.hasAttribute('data-typography-ignore')) {
    return true;
  }
  
  const tagName = element.tagName.toLowerCase();
  
  if (SKIP_ELEMENTS.has(tagName)) {
    return true;
  }
  
  if (!TEXT_ELEMENTS.has(tagName)) {
    return true;
  }
  
  if (!hasTextContent(element)) {
    return true;
  }
  
  // поднимаемся по родителям до рут элемента или до data-typography-ignore
  let parent = element.parentElement;
  while (parent) {
    if (parent.hasAttribute('data-typography-ignore')) {
      return true;
    }
    
    if (parent.hasAttribute('data-typography-root')) {
      break; // нашли рут элемент
    }
    parent = parent.parentElement;
  }
  
  return false;
}

export function collectElementsWithTreeWalker(root: HTMLElement): HTMLElement[] {
  const elements: HTMLElement[] = [];
  
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) => {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        
        if (TEXT_ELEMENTS.has(tagName)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );
  
  let currentNode = walker.currentNode as HTMLElement;
  while (currentNode) {
    elements.push(currentNode);
    const next = walker.nextNode();
    if (!next) break;
    currentNode = next as HTMLElement;
  }
  
  return elements;
}
export interface ElementData {
  element: HTMLElement;
  fontSize: number;
  currentWeight: string;
}

export function collectElementData(
  elements: HTMLElement[],
  appliedWeights: WeakMap<HTMLElement, string>
): ElementData[] {
  const data: ElementData[] = [];
  
  for (const element of elements) {
    if (shouldIgnoreElement(element)) {
      continue;
    }
    
    const computed = window.getComputedStyle(element);
    const fontSize = parseFloat(computed.fontSize);
    
    const applied = appliedWeights.get(element) || '';
    
    data.push({
      element,
      fontSize,
      currentWeight: applied,
    });
  }
  
  return data;
}


export function applyFontWeights(
  data: ElementData[],
  threshold: number,
  smallWeight: number,
  largeWeight: number,
  appliedWeights: WeakMap<HTMLElement, string>
): void {
  for (const { element, fontSize, currentWeight } of data) {
    const weight = fontSize <= threshold ? smallWeight : largeWeight;
    const newApplied = `w${weight}@${fontSize.toFixed(1)}`;
  
    if (currentWeight === newApplied) {
      continue;
    }
    

    element.style.setProperty('--tw-auto-weight', String(weight));

    appliedWeights.set(element, newApplied);
  }
}

export function processElementsBatched(
  container: HTMLElement,
  threshold: number,
  smallWeight: number,
  largeWeight: number,
  appliedWeights: WeakMap<HTMLElement, string>,
  chunkSize: number = 500
): void {

  const elements = collectElementsWithTreeWalker(container);
  
  let index = 0;
  
  function processChunk() {
    const chunk = elements.slice(index, index + chunkSize);
    if (chunk.length === 0) return;
    

    const data = collectElementData(chunk, appliedWeights);
    
    requestAnimationFrame(() => {
      applyFontWeights(data, threshold, smallWeight, largeWeight, appliedWeights);
    });
    
    index += chunkSize;
    
    if (index < elements.length) {
      requestIdleCallbackPolyfill(processChunk, { timeout: 100 });
    }
  }
  
  requestIdleCallbackPolyfill(processChunk, { timeout: 100 });
}

export function processAddedNodes(
  nodes: HTMLElement[],
  threshold: number,
  smallWeight: number,
  largeWeight: number,
  appliedWeights: WeakMap<HTMLElement, string>
): void {
  const allElements: HTMLElement[] = [];
  
  for (const node of nodes) {
    if (node instanceof HTMLElement) {
      if (!shouldIgnoreElement(node)) {
        allElements.push(node);
      }

      allElements.push(...collectElementsWithTreeWalker(node));
    }
  }
  

  const data = collectElementData(allElements, appliedWeights);
  
  requestAnimationFrame(() => {
    applyFontWeights(data, threshold, smallWeight, largeWeight, appliedWeights);
  });
}
