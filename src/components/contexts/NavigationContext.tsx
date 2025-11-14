'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { NavigationItem } from '@/store/navigation';

interface NavigationContextType {
    initialNavigation: NavigationItem[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Стабильная ссылка на пустой массив для избежания лишних ре-рендеров
const EMPTY_NAVIGATION: NavigationItem[] = [];

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
    // Мемоизируем значение контекста, чтобы избежать лишних ре-рендеров
    const contextValue: NavigationContextType = useMemo(() => ({
        initialNavigation: initialNavigation || EMPTY_NAVIGATION
    }), [initialNavigation]);

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    );
}

