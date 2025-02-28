'use client'; 

import '@/config/i18n';
import { Provider } from 'react-redux';
import { HeaderContextProvider } from '@/components/contexts/HeaderContext';
import {store} from '@/config/store'
import Layout_wrapper from './Layout_wrapper';
import { ReactNode } from 'react';



function ReduxProvider({ children }:{ children:ReactNode }) {
  return <Provider store={store}>
    <HeaderContextProvider >
      <Layout_wrapper>
        {children}
      </Layout_wrapper>
    </HeaderContextProvider>
  </Provider>;
}

export default ReduxProvider