'use client'; // This is a client component

import { Provider } from 'react-redux';
import store from '@/config/store'

 function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider