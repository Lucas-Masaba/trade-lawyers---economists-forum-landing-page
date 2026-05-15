import React from 'react'
import Hero from '@/components/Home/Hero'
import ImpactMission from '@/components/Home/ImpactMission'
import Aboutus from '@/components/Home/AboutUs'
import Partnership from '@/components/Home/Partnership'
import Membership from '@/components/Home/Membership'
import EventsPublications from '@/components/Home/EventsPublications'
import Team from '@/components/Home/Team'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Africa Trade Policy, Law & Economic Governance',
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Africa Trade Policy, Law & Economic Governance',
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Africa Trade Policy, Law & Economic Governance',
    description: siteConfig.description,
  },
}

export default function Home(props: any) {
  const searchParams = props?.searchParams as Record<string, string | string[] | undefined> | undefined
  const joinParam = searchParams?.join
  const openMembershipForm = Array.isArray(joinParam) ? joinParam[0] === 'form' : joinParam === 'form'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/trade_logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }

  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <ImpactMission />
      <Partnership />
      <Aboutus />
      <Membership openFormOnMount={openMembershipForm} />
      <EventsPublications />
      <Team />
    </main>
  )
}
