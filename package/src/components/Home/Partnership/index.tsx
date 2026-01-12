'use client'
import React from 'react'
import { tlefPartnershipData, tlefPrioritiesData, tlefValuePropositionData } from '@/data/tlef-content'

const Partnership = () => {
  return (
    <>
      {/* Why Partner Section */}
      <section id='partnership' className='py-20 bg-white'>
        <div className='container mx-auto max-w-7xl px-4'>
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Collaboration
          </p>
          <h2 className='text-center pb-12'>{tlefPartnershipData.heading}</h2>
          
          <div className='max-w-4xl mx-auto space-y-6 mb-12'>
            <p className='text-lg font-medium text-black/80 text-justify'>
              {tlefPartnershipData.intro}
            </p>
            <ul className='space-y-4 mt-8'>
              {tlefPartnershipData.benefits.map((benefit, index) => (
                <li key={index} className='flex gap-4'>
                  <span className='text-primary font-bold text-lg shrink-0'>✓</span>
                  <span className='text-lg text-black/80 text-justify'>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partnership Priorities Section */}
      <section className='py-20 bg-grey'>
        <div className='container mx-auto max-w-7xl px-4'>
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Work Areas
          </p>
          <h2 className='text-center pb-12'>{tlefPrioritiesData.heading}</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
            {tlefPrioritiesData.priorities.map((priority, index) => (
              <div key={index} className='bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow'>
                <h5 className='text-darkmode font-bold mb-4'>{priority.title}</h5>
                <p className='text-black/80 text-lg text-justify'>{priority.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto max-w-7xl px-4'>
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Strengths
          </p>
          <h2 className='text-center pb-12'>{tlefValuePropositionData.heading}</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {tlefValuePropositionData.values.map((value, index) => (
              <div key={index} className='bg-grey rounded-3xl p-8'>
                <h5 className='text-darkmode font-bold mb-4'>{value.title}</h5>
                <p className='text-black/80 text-lg text-justify'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Partnership
