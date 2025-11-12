'use client'

import { createContext, useContext, ReactNode } from 'react';
import { NavigationItem } from '@/store/navigation';

interface NavigationContextType {
    initialNavigation: NavigationItem[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigationContext() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigationContext must be used within a NavigationContextProvider');
    }
    return context;
}

export function NavigationContextProvider({ 
    children, 
    initialNavigation 
}: { 
    children: ReactNode; 
    initialNavigation?: NavigationItem[] 
}) {
    const contextValue: NavigationContextType = {
        initialNavigation: initialNavigation || []
    };

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    );
}

