import React, { createContext, useState, useContext, useCallback } from 'react';

const HeaderContext = createContext();

export function useHeaderContext() {
    return useContext(HeaderContext);
}

export function HeaderContextProvider({ children }) {
    const [transparent, setTransparent] = useState(false)
    const [defaultModalActive, setDefaultModalActive] = useState(false)
    const [defaultModalName, setDefaultModalName] = useState('')


    const makeTransparentHeader = useCallback(() => {
        setTransparent(false)
    }, []);

    const makeDefaultHeader = useCallback(() => {
        setTransparent(false)
    }, []);

    const openDefaultModal = (value) => {
        setDefaultModalName(value)
        setDefaultModalActive(true)
    }

    const contextValue = {
        transparent,
        defaultModalActive,
        openDefaultModal,
        defaultModalName,
        setDefaultModalActive,
        makeDefaultHeader,
        makeTransparentHeader
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}