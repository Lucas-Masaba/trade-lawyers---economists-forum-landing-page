import React from 'react'
import Hero from '@/components/Home/Hero'
import ImpactMission from '@/components/Home/ImpactMission'
import Aboutus from '@/components/Home/AboutUs'
import Partnership from '@/components/Home/Partnership'
import Membership from '@/components/Home/Membership'
import EventsPublications from '@/components/Home/EventsPublications'
import Team from '@/components/Home/Team'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trade Lawyers and Economists Forum - TLEF',
  description: 'Strengthening Africa\'s capacity in trade policy, international trade law, and economic governance.',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactMission />
      <Partnership />
      <Aboutus />
      <Membership />
      <EventsPublications />
      <Team />
    </main>
  )
}
