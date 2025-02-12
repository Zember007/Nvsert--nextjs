import React, { createContext, useState, useContext, useCallback } from 'react';

const HeaderContext = createContext();

export function useHeaderContext() {
    return useContext(HeaderContext);
}

export function HeaderContextProvider({ children }) {
    const [transparent, setTransparent] = useState(false)


    const makeTransparentHeader = useCallback(() => {
        setTransparent(false)
    }, []);

    const makeDefaultHeader = useCallback(() => {
        setTransparent(false)
    }, []);

    const contextValue = {
        transparent,
        makeDefaultHeader,
        makeTransparentHeader
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}