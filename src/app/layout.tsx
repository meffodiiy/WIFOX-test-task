import type { Metadata, Viewport, } from 'next'
import { Inter, } from 'next/font/google'
import * as Texts from '../lib/constants/texts'
import './globals.sass'
import './layout.sass'

const inter = Inter({ subsets: ['latin', 'cyrillic', 'cyrillic-ext',], })

export const metadata: Metadata = {
  title: Texts.APP_NAME,
  description: Texts.APP_DESCRIPTION,
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png', },
    { rel: 'icon', url: 'icons/icon-128x128.png', },
  ],
}

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
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
