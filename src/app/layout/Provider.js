'use client'; // This is a client component

import '@/config/i18n';
import { Provider } from 'react-redux';
import { HeaderContextProvider } from '@/components/contexts/HeaderContext';
import store from '@/config/store'
import Layout_wrapper from './Layout_wrapper';



function ReduxProvider({ children }) {
  return <Provider store={store}>
    <HeaderContextProvider >
      <Layout_wrapper>
        {children}
      </Layout_wrapper>
    </HeaderContextProvider>
  </Provider>;
}

export default ReduxProvider