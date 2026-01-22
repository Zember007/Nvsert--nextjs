"use client";

import "shared/config/i18n";
import i18n from "shared/config/i18n";
import { ReactNode, useEffect } from "react";
import Layout_wrapper from "./Layout_wrapper";
import { TypographyProvider } from "./Typography/TypographyProvider";
import { NavigationItem } from "@/types/navigation";
import { HeaderContextProvider } from "shared/contexts";

interface ClientProviderProps {
  children: ReactNode;
  initialNavigation: NavigationItem[];
}

export default function ClientProvider({
  children,
  initialNavigation,
}: ClientProviderProps) {
  useEffect(() => {
    const lang = document?.documentElement?.lang;
    if (lang && (lang === 'ru' || lang === 'en') && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <HeaderContextProvider initialNavigation={initialNavigation}>
      
      <TypographyProvider
        threshold={16}
        smallWeightMac={300}
        largeWeightMac={400}
        smallWeightWindows={350}
        largeWeightWindows={400}
      >
     
      <Layout_wrapper initialNavigation={initialNavigation}>
        {children}
      </Layout_wrapper>
      </TypographyProvider>
    </HeaderContextProvider>
  );
}
