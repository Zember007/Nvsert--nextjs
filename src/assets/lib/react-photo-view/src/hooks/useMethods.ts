import { useRef, useMemo } from 'react';

/**
 * Hook of persistent methods
 */
export default function useMethods<T extends Record<string, (...args: any[]) => any>>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(() => {
    const methods = {} as T;
    (Object.keys(fn) as Array<keyof T>).forEach((key) => {
      methods[key] = ((...args: unknown[]) => fnRef.current[key].call(fnRef.current, ...args)) as T[keyof T];
    });
    return methods;
  }, []); // Пустой массив зависимостей, так как мы используем ref для актуального значения fn
}
