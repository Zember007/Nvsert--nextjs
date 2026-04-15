/**
 * Глобальный контекст шапки, модалей и copy-уведомлений.
 *
 * ЗАЧЕМ: несколько несвязанных виджетов управляют одним модальным окном (форма заявки)
 * и системой copy-уведомлений. Контекст избегает prop drilling через Layout_wrapper →
 * Header → Button → Modal.
 *
 * defaultModalCount — счётчик-триггер, а не boolean-флаг. Это позволяет открыть модал
 * повторно с той же modalName (клик при уже открытом модале сбрасывает его анимацию).
 * С boolean-флагом повторный setActive(true) не вызвал бы ре-рендер.
 *
 * initialNavigation хранится здесь — так Header и другие виджеты получают список
 * услуг/навигации без отдельного NavigationContext.
 */
'use client'

import { useCopy } from 'shared/hooks';
import { NavigationItem } from '@/types/navigation';
import { createContext, useState, useContext, ReactNode } from 'react';

interface HeaderContextType {
    defaultModalActive: boolean;
    openDefaultModal: (value: string) => void;
    defaultModalName: string;
    setDefaultModalActive: (value: boolean) => void;
    resetCountModal: () => void;
    defaultModalCount: number;
    showCopyNotification: boolean;
    notificationPosition: { x: number; y: number } | null;
    handleCopy: (text: string, event: React.MouseEvent) => void;
    hideNotification: () => void;
    initialNavigation: NavigationItem[];
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeaderContext() {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderContextProvider');
    }
    return context;
}

export function HeaderContextProvider({ children, initialNavigation }: { children: ReactNode; initialNavigation: NavigationItem[] }) {
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
        initialNavigation,
        ...copyHook
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
}