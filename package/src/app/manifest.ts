import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#143545',
    description: siteConfig.description,
    icons: [
      {
        src: '/images/trade_logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}