'use client'
import React from 'react'
import Image from 'next/image'
import { tlefImpactData, tlefMissionData } from '@/data/tlef-content'

const ImpactMission = () => {
  return (
    <section id='impact' className='overflow-x-hidden py-20'>
      <div className='container mx-auto max-w-7xl px-4'>
        {/* Impact Section */}
        <div className='mb-20'>
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Our Foundation
          </p>
          <h2 className='text-center pb-8'>{tlefImpactData.heading}</h2>
          
          <div className='max-w-4xl mx-auto space-y-6'>
            <p className='text-lg font-medium text-black/80 text-justify'>
              {tlefImpactData.intro}
            </p>
            
            <p className='text-lg font-medium text-black/80 text-justify'>
              {tlefImpactData.vision}
            </p>

            {/* Strategic Objectives */}
            <div className='mt-12'>
              <h4 className='text-xl font-bold text-darkmode mb-6'>Strategic Objectives</h4>
              <ul className='space-y-4'>
                {tlefImpactData.objectives.map((objective, index) => (
                  <li key={index} className='flex gap-4'>
                    <span className='text-primary font-bold text-lg shrink-0 pt-1'>•</span>
                    <span className='text-lg text-black/80 text-justify'>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className='bg-grey rounded-3xl p-12 mt-20'>
          <Image
            src='/images/aboutus/dots.svg'
            width={100}
            height={100}
            alt='dots-image'
            className='absolute -left-20 top-12'
          />
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Our Mission
          </p>
          <h3 className='text-center text-3xl font-bold text-darkmode mt-4 max-w-3xl mx-auto'>
            {tlefMissionData.mission}
          </h3>
        </div>
      </div>
    </section>
  )
}

export default ImpactMission
