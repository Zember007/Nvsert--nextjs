

import React from "react"
import Provider from "./_layout/Provider"

import { ReactNode } from "react"
import type { Metadata, Viewport } from 'next'
/* import { ScrollToTop } from '@/hook/scrollTop'; */
/* import { getNavigationData } from '@/assets/lib/navigation'; */
import initialNavigation from '@/assets/lib/navigation.json';
import { NavigationItem } from "@/store/navigation"

export const metadata: Metadata = {
  title: 'NVSERT - Декларирование, сертификация, лицензирование',
  description: 'Профессиональные услуги по декларированию, сертификации и лицензированию продукции',
  keywords: 'декларирование, сертификация, лицензирование, NVSERT',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://nvsert.ru'),
  openGraph: {
    title: 'NVSERT - Декларирование, сертификация, лицензирование',
    description: 'Профессиональные услуги по декларированию, сертификации и лицензированию продукции',
    type: 'website',
    locale: 'ru_RU',
  },
  verification: {
    yandex: '90db85a0cc46fb2c',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#646467',
}



export default async function RootLayout({ children }: { children: ReactNode }) {

  /*   const initialNavigation = await getNavigationData();
    if (!initialNavigation) return <div>Navigation not found</div>;
    if (initialNavigation.length === 0) return <div>Navigation is empty</div>; */

  return (
    <html lang="ru" >
      <head>
        <link
          rel="preconnect"
          href="https://test11.audiosector.ru"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />


      </head>
      <body>
        <Provider initialNavigation={initialNavigation as NavigationItem[]}>
          {/*    <ScrollToTop /> */}
          {children}
        </Provider>
      </body>
    </html>
  )

}
