'use client'

import Provider from "./layout/Provider"
import '@/assets/styles/base/_variables.scss'
import '@/assets/styles/base/_mixins.scss'
import '@/assets/styles/base/_icon.scss'
import { ReactNode } from "react"



export default function RootLayout({ children }: { children: ReactNode }) {

  

  return (
    <html lang="ru">
      <Provider>


        {children}


      </Provider>
    </html>
  )
}
