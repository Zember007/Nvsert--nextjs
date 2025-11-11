

"use client";
import '@/config/i18n';
import { Provider, useDispatch } from 'react-redux';
import { HeaderContextProvider } from '@/components/contexts/HeaderContext';
import { store } from '@/config/store'
import Layout_wrapper from './Layout_wrapper';
import { ReactNode, useLayoutEffect } from 'react';
import { TypographyProvider } from './Typography/TypographyProvider';
import { NavigationItem, initializeNavigation } from '@/store/navigation';
import { AppDispatch, RootState } from '@/config/store';
import { useSelector } from 'react-redux';


function ReduxProvider({ children, initialNavigation }: { children: ReactNode; initialNavigation?: NavigationItem[] }) {

  function NavigationInitializer({ initialNavigation }: { initialNavigation?: NavigationItem[] }) {
    const dispatch = useDispatch<AppDispatch>();
    const { navigation, status: navigationStatus } = useSelector((state: RootState) => state.navigation);
  
    useLayoutEffect(() => {
      if (initialNavigation && initialNavigation.length > 0 && navigationStatus === 'idle' && navigation.length === 0) {
        dispatch(initializeNavigation(initialNavigation));
      }
    }, [initialNavigation, navigationStatus, navigation.length, dispatch]);
  
    return null;
  }

  return <Provider store={store}>
    <TypographyProvider
      threshold={16}
      smallWeightMac={300}
      largeWeightMac={400}
      smallWeightWindows={350}
      largeWeightWindows={400}
    >
      <HeaderContextProvider>
        <NavigationInitializer initialNavigation={initialNavigation} />
        <Layout_wrapper>
          {children}
        </Layout_wrapper>
      </HeaderContextProvider>
    </TypographyProvider>
  </Provider>;
}

export default ReduxProvider