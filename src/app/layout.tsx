import Provider from "./_layout/Provider"
/* import '@/assets/styles/base/_variables.scss'
import '@/assets/styles/base/_mixins.scss' */
import '@/assets/styles/main.scss'
import { ReactNode } from "react"
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import { ScrollToTop } from '@/hook/scrollTop';
import { NavigationItem } from '@/store/navigation';
import { getNavigationData } from '@/assets/lib/navigation';

const font = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-family',
})

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
  themeColor: '#646467',
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

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Загружаем навигацию на сервере до рендера
  const initialNavigation = await getNavigationData();

  return (
    <html lang="ru" className={font.variable}>
      <body>
        <Provider initialNavigation={initialNavigation}>
          <ScrollToTop />
          {children}
        </Provider>
      </body>
    </html>
  )
}
