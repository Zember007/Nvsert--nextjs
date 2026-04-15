/**
 * Клиентская обёртка root layout — граница Server/Client Components.
 *
 * ЗАЧЕМ: App Router — Server Components по умолчанию. Контекстные провайдеры
 * (HeaderContext, TypographyProvider) требуют "use client". ClientProvider —
 * тонкая граница, которая держит серверную часть layout.tsx чистой от клиентского кода.
 *
 * i18n-синхронизация: i18next инициализируется с 'ru' по умолчанию. useEffect
 * синхронизирует его с lang-атрибутом <html>, который сервер выставляет через middleware.
 * Без этого i18next не знал бы о языке текущего URL после первичной гидрации.
 *
 * initialNavigation: передаётся из серверного layout.tsx (navigation.json, сгенерированный
 * при сборке) → пробрасывается в HeaderContext и Layout_wrapper, минуя prop drilling.
 */
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
