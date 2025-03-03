'use client'

import Provider from "./layout/Provider"
import '@/assets/styles/base/_variables.scss'
import '@/assets/styles/base/_mixins.scss'
import '@/assets/styles/base/_icon.scss'
import { ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"



export default function RootLayout({ children }: { children: ReactNode }) {

  const pathname = usePathname()

  useEffect(() => {
    if(pathname === '/') {
      document.body.className = 'transparent-header bg-secondary';
      document.body.sc
    } else {
      document.body.className = '';
    }
  }, [pathname]);

  return (
    <html lang="ru">
      <Provider>


        {children}


      </Provider>
    </html>
  )
}
