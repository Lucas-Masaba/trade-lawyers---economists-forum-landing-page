import { NextResponse } from 'next/server'

import { HeaderItem } from '@/types/menu'
import { footerlinks } from '@/types/footerlinks'

// header nav-links data
const headerData: HeaderItem[] = [
  { label: 'About', href: '#impact' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'Membership', href: '#membership' },
  { label: 'Leadership', href: '#Team' },
]

// footer links data
const FooterLinksData: footerlinks[] = [
  {
    section: 'Navigation',
    links: [
      { label: 'About TLEF', href: '#impact' },
      { label: 'Partnership', href: '#partnership' },
      { label: 'Membership', href: '#membership' },
      { label: 'Leadership', href: '#Team' },
    ],
  },
  {
    section: 'Connect',
    links: [
      { label: 'Events & Publications', href: '#EventsPublications' },
      { label: 'partners@handeladvocates.com', href: 'mailto:partners@handeladvocates.com' },
      { label: '+256 763 480 363', href: 'tel:+256763480363' },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    headerData,
    FooterLinksData,
  })
}
