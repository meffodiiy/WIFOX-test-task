import type { Metadata, } from 'next'
import { Inter, Pacifico, } from 'next/font/google'
import * as Texts from '../lib/constants/texts'
import './globals.sass'
import './layout.sass'

const inter = Inter({ subsets: ['latin', 'cyrillic', 'cyrillic-ext',], })

export const metadata: Metadata = {
  title: Texts.APP_NAME,
  description: Texts.APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`root-layout ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
