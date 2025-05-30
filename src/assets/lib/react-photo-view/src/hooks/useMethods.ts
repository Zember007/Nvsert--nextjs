import { useRef, useMemo } from 'react';

/**
 * Hook of persistent methods
 */
export default function useMethods<T extends Record<string, (...args: any[]) => any>>(fn: T): T {


  return useMemo(() => {
    const methods = {} as T;
    (Object.keys(fn) as Array<keyof T>).forEach((key) => {
      methods[key] = ((...args: unknown[]) => fn[key].call(fn, ...args)) as T[keyof T];
    });
    return methods;
  }, [fn]); 
}
