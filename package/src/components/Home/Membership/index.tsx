'use client'
import React from 'react'
import { tlefMembershipData } from '@/data/tlef-content'

const Membership = () => {
  return (
    <section id='membership' className='py-20 bg-white'>
      <div className='container mx-auto max-w-7xl px-4'>
        <p className='text-center text-primary text-lg tracking-widest uppercase'>
          Join Us
        </p>
        <h2 className='text-center pb-12'>{tlefMembershipData.heading}</h2>

        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Intro */}
          <p className='text-lg font-medium text-black/80 text-justify'>
            {tlefMembershipData.intro}
          </p>

          {/* Why Join */}
          <div className='mt-12'>
            <h4 className='text-2xl font-bold text-darkmode mb-6'>
              Why Join TLEF?
            </h4>
            <p className='text-lg text-black/80 mb-6 text-justify'>
              {tlefMembershipData.whyJoin}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {tlefMembershipData.whyJoinPoints.map((point, index) => (
                <div key={index} className='bg-grey rounded-2xl p-6'>
                  <h5 className='text-lg font-bold text-darkmode mb-4'>{point.title}</h5>
                  <ul className='space-y-3'>
                    {point.items.map((item, itemIndex) => (
                      <li key={itemIndex} className='flex gap-3'>
                        <span className='text-primary font-bold shrink-0'>✓</span>
                        <span className='text-black/80 text-justify'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Member Benefits */}
          <div className='mt-12 bg-primary/10 rounded-3xl p-8 border border-primary/20'>
            <h4 className='text-2xl font-bold text-darkmode mb-6'>Member Benefits</h4>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {tlefMembershipData.benefits.map((benefit, index) => (
                <li key={index} className='flex gap-3'>
                  <span className='text-primary font-bold shrink-0'>•</span>
                  <span className='text-black/80 text-justify'>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Can Join */}
          <div className='mt-12'>
            <h4 className='text-2xl font-bold text-darkmode mb-6'>Who Can Join?</h4>
            <p className='text-lg text-black/80 mb-6 text-justify'>
              Membership is open to:
            </p>
            <ul className='space-y-3'>
              {tlefMembershipData.whoCanJoin.map((category, index) => (
                <li key={index} className='flex gap-4'>
                  <span className='text-primary font-bold text-lg shrink-0'>•</span>
                  <span className='text-lg text-black/80 text-justify'>{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Join CTA */}
          <div className='mt-12 bg-grey rounded-3xl p-8 text-center'>
            <p className='text-lg text-black/80 mb-6 text-justify'>
              {tlefMembershipData.joinCTA}
            </p>
            <button className='bg-primary text-white text-lg font-semibold py-4 px-10 rounded-full hover:bg-darkmode transition-colors'>
              Complete Membership Form
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Membership
