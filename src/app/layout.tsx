import React, { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import initialNavigation from "@/assets/lib/navigation.json";
import { NavigationItem } from "@/types/navigation";
import ClientProvider from "./_layout/ClientProvider";
import {
  BASE_URL,
  DEFAULT_LOCALE,
  STRAPI_ORIGIN,
  type SupportedLocale,
} from "shared/config/env";
import { tStatic } from "shared/i18n/static";

export async function generateMetadata(): Promise<Metadata> {
  // IMPORTANT: Do not use request-bound APIs (cookies/headers) here.
  // This project pre-renders many pages as static/SSG, and accessing cookies/headers
  // would crash in production with "Page changed from static to dynamic at runtime".
  const locale: SupportedLocale = DEFAULT_LOCALE;

  const title = tStatic(locale, "meta.site.title");
  const description = tStatic(locale, "meta.site.description");
  const keywords = tStatic(locale, "meta.site.keywords");

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title,
      description,
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
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#646467",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale: SupportedLocale = DEFAULT_LOCALE;
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

        {/* Preload основного шрифта (без блокировки отрисовки благодаря font-display: swap) */}
        <link
          rel="preload"
          href="/fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
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
