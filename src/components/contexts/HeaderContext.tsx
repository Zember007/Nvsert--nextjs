'use client'

import { useCopy } from '@/hook/useCopy';
import { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface HeaderContextType {
    defaultModalActive: boolean;
    openDefaultModal: (value: string) => void;
    defaultModalName: string;
    setDefaultModalActive: (value: boolean) => void;
    resetCountModal: () => void;
    defaultModalCount: number;
    showCopyNotification: boolean;
    notificationPosition: { x: number; y: number } | null;
    handleCopy: (text: string, event: React.MouseEvent) => Promise<void>;
    hideNotification: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeaderContext() {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderContextProvider');
    }
    return context;
}

export function HeaderContextProvider({ children }: { children: ReactNode }) {
    const [defaultModalActive, setDefaultModalActive] = useState(false);
    const [defaultModalCount, setDefaultModalCount] = useState(0);
    const [defaultModalName, setDefaultModalName] = useState('');



    const openDefaultModal = (value: string) => {
        setDefaultModalName(value);
        setDefaultModalActive(true);
        setDefaultModalCount(prev => prev + 1)
    };

    const resetCountModal = () => {
        setDefaultModalCount(0)
    }

  const copyHook = useCopy();


    const contextValue: HeaderContextType = {
        defaultModalActive,
        openDefaultModal,
        defaultModalName,
        setDefaultModalActive,
        resetCountModal,
        defaultModalCount,
        ...copyHook
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}