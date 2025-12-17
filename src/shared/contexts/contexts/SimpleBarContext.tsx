'use client'
import { createContext, useContext } from 'react';

interface SimpleBarContextType {
  simpleBar: any;
}

export const SimpleBarContext = createContext<SimpleBarContextType>({ simpleBar: null });

export const useSimpleBar = () => {
  const context = useContext(SimpleBarContext);
  if (!context) {
    throw new Error('useSimpleBar must be used within a SimpleBarContext.Provider');
  }
  return context;
};