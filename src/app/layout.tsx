import React, { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { headers } from "next/headers";

import initialNavigation from "@/assets/lib/navigation.json";
import { NavigationItem } from "@/types/navigation";
import ClientProvider from "./_layout/ClientProvider";
import {
  BASE_URL,
  DEFAULT_LOCALE,
  STRAPI_ORIGIN,
  normalizeLocale,
  type SupportedLocale,
} from "shared/config/env";

export const metadata: Metadata = {
  title: "NVSERT - Декларирование, сертификация, лицензирование",
  description:
    "Профессиональные услуги по декларированию, сертификации и лицензированию продукции",
  keywords: "декларирование, сертификация, лицензирование, NVSERT",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "NVSERT - Декларирование, сертификация, лицензирование",
    description:
      "Профессиональные услуги по декларированию, сертификации и лицензированию продукции",
    type: "website",
    locale: "ru_RU",
  },
  verification: {
    yandex: "90db85a0cc46fb2c",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#646467",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Root layout is executed during prerender/build as well.
  // Avoid request-bound APIs (headers/cookies) in build phase to keep static generation working.
  let locale: SupportedLocale = DEFAULT_LOCALE;
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    try {
      const hdrs = await headers();
      locale = normalizeLocale(hdrs.get('x-nvsert-locale'));
    } catch {
      // ignore
    }
    if (locale === DEFAULT_LOCALE) {
      try {
        const cks = await cookies();
        locale = normalizeLocale(cks.get('nvsert_locale')?.value);
      } catch {
        // ignore
      }
    }
  }
  return (
    <html lang={locale}>
      <head>
        {/* Preconnect для домена CMS (медиа-файлы) */}
        {STRAPI_ORIGIN ? (
          <>
            <link rel="preconnect" href={STRAPI_ORIGIN} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={STRAPI_ORIGIN} />
          </>
        ) : null}

        {/* Критические шрифты с высоким приоритетом */}
        <link
          rel="preload"
          href="/fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      </head>
      <body>
        <ClientProvider initialNavigation={initialNavigation as NavigationItem[]}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
