import { useState, useEffect } from 'react';

export const useIsMac = () => {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.userAgent.includes('Mac OS X'));
    }, []);

    return isMac;
};