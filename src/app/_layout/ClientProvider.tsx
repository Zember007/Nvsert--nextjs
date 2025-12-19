"use client";

import "shared/config/i18n";
import { ReactNode } from "react";
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
  return (
    <HeaderContextProvider initialNavigation={initialNavigation}>
      {/*
      <TypographyProvider
        threshold={16}
        smallWeightMac={300}
        largeWeightMac={400}
        smallWeightWindows={350}
        largeWeightWindows={400}
      >
      */}
      <Layout_wrapper initialNavigation={initialNavigation}>
        {children}
      </Layout_wrapper>
      {/* </TypographyProvider> */}
    </HeaderContextProvider>
  );
}
