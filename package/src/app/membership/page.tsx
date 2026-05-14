import type { Metadata } from 'next'
import Membership from '@/components/Home/Membership'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Membership',
  description: `${siteConfig.name} membership form`,
  alternates: {
    canonical: '/membership',
  },
}

export default function MembershipPage() {
  return (
    <main>
      <Membership openFormOnMount />
    </main>
  )
}