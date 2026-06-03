import { Playfair_Display, Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
import { siteConfig } from '@/config/site'
import { Analytics } from '@vercel/analytics/next'

const metadataBase = new URL(siteConfig.url)
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const bingSiteVerification = process.env.BING_SITE_VERIFICATION

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
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase,
  alternates: {
    canonical: '/',
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'Non-profit organization',
  keywords: [...siteConfig.keywords],
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
    date: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification ? { other: { 'msvalidate.01': bingSiteVerification } } : {}),
  },
  icons: {
    icon: '/images/trade_logo.png',
    shortcut: '/images/trade_logo.png',
  },
  manifest: '/manifest.webmanifest',
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
        <Analytics />
      </body>
    </html>
  )
}
