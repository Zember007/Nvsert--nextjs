import Provider from "./layout/Provider"
import '@/assets/styles/base/_variables.scss'
import '@/assets/styles/base/_mixins.scss'
import '@/assets/styles/base/_icon.scss'
import { ReactNode } from "react"

import { Rubik } from 'next/font/google'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rubik',
})

export default function RootLayout({ children }: { children: ReactNode }) {



  return (
    <html lang="ru" className={rubik.variable}>
      <Provider>


        {children}


      </Provider>
    </html>
  )
}
