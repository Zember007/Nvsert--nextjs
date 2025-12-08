

"use client";

import '@/config/i18n';
import { HeaderContextProvider } from '@/components/contexts/HeaderContext';
import Layout_wrapper from './Layout_wrapper';
import { ReactNode } from 'react';
import { TypographyProvider } from './Typography/TypographyProvider';
import { NavigationItem } from '@/store/navigation';


function Provider({ children, initialNavigation }: { children: ReactNode; initialNavigation: NavigationItem[] }) {

  return <HeaderContextProvider initialNavigation={initialNavigation}>
      <Layout_wrapper initialNavigation={initialNavigation}>
        {children}
      </Layout_wrapper>
    </HeaderContextProvider>


{/* <TypographyProvider
    threshold={16}
    smallWeightMac={300}
    largeWeightMac={400}
    smallWeightWindows={350}
    largeWeightWindows={400}
  > */}
    
}

export default Provider