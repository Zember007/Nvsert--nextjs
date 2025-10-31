

"use client";
import '@/config/i18n';
import { Provider } from 'react-redux';
import { HeaderContextProvider } from '@/components/contexts/HeaderContext';
import { store } from '@/config/store'
import Layout_wrapper from './Layout_wrapper';
import { ReactNode } from 'react';
import { TypographyProvider } from './Typography/TypographyProvider';



function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>
    <TypographyProvider>
      <HeaderContextProvider>
        <Layout_wrapper>
          {children}
        </Layout_wrapper>
      </HeaderContextProvider>
    </TypographyProvider>
  </Provider>;
}

export default ReduxProvider