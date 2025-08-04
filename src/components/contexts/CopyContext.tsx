import React, { createContext, useContext, ReactNode } from 'react';
import { useCopy } from '@/hook/useCopy';

interface CopyContextType {
  showCopyNotification: boolean;
  notificationPosition: { x: number; y: number } | null;
  handleCopy: (text: string, event: React.MouseEvent) => Promise<void>;
  hideNotification: () => void;
}

const CopyContext = createContext<CopyContextType | undefined>(undefined);

export const CopyProvider = ({ children }: { children: ReactNode }) => {
  const copyHook = useCopy();

  return (
    <CopyContext.Provider value={copyHook}>
      {children}
    </CopyContext.Provider>
  );
};

export const useCopyContext = () => {
  const context = useContext(CopyContext);
  if (context === undefined) {
    throw new Error('useCopyContext must be used within a CopyProvider');
  }
  return context;
}; 