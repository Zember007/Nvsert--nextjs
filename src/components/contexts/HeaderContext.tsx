import { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface HeaderContextType {
    transparent: boolean;
    defaultModalActive: boolean;
    openDefaultModal: (value: string) => void;
    defaultModalName: string;
    setDefaultModalActive: (value: boolean) => void;
    makeDefaultHeader: () => void;
    makeTransparentHeader: () => void;
    darkHeader: boolean;
    setDarkHeader: (value:boolean) => void;

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
    const [darkHeader, setDarkHeader] = useState(false);
    const [transparent, setTransparent] = useState(false);
    const [defaultModalActive, setDefaultModalActive] = useState(false);
    const [defaultModalName, setDefaultModalName] = useState('');

    const makeTransparentHeader = useCallback(() => {
        setTransparent(true);
    }, []);

    const makeDefaultHeader = useCallback(() => {
        setTransparent(false);
    }, []);

    const openDefaultModal = (value: string) => {
        setDefaultModalName(value);
        setDefaultModalActive(true);
    };

    const contextValue: HeaderContextType = {
        transparent,
        defaultModalActive,
        openDefaultModal,
        defaultModalName,
        setDefaultModalActive,
        makeDefaultHeader,
        makeTransparentHeader,
        darkHeader,
        setDarkHeader
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}