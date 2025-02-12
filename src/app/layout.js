import Provider from "./layout/Provider"
import '@/assets/styles/base/_variables.scss'
import '@/assets/styles/base/_mixins.scss'
import '@/assets/styles/base/_icon.scss'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
