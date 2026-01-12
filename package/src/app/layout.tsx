import { Playfair_Display, Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/utils/aos'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Trade Lawyers & Economists Forum',
  description: 'Trade Lawyers & Economists Forum',
  icons: {
    icon: '/images/trade_logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className={`${inter.className}`} suppressHydrationWarning>
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
      </body>
    </html>
  )
}
