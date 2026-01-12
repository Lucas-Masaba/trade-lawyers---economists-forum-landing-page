'use client'
import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { tlefEventsData, tlefPublicationsData } from '@/data/tlef-content'

const EventsPublications = () => {
  // Icon mappings for event types
  const eventIcons: { [key: number]: string } = {
    0: 'mdi:presentation',
    1: 'mdi:certificate',
    2: 'mdi:account-group',
    3: 'mdi:forum',
  }

  return (
    <>
      {/* Events Section - Redesigned */}
      <section className='relative overflow-hidden py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80'>
        <div className='container mx-auto max-w-7xl px-4 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Content on the left */}
            <div className='space-y-6 order-2 lg:order-1'>
              <h2 className='text-white pb-4'>{tlefEventsData.heading}</h2>
              
              <p className='text-lg font-medium text-white/90 text-justify'>
                {tlefEventsData.intro}
              </p>
              
              <div className='grid grid-cols-1 gap-4 mt-8'>
                {tlefEventsData.events.map((event, index) => (
                  <div key={index} className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all group'>
                    <div className='flex gap-4 items-start'>
                      <Icon icon={eventIcons[index] || 'mdi:calendar'} className='w-8 h-8 text-white flex-shrink-0 mt-1' />
                      <div>
                        <h5 className='text-lg font-bold text-white mb-2'>{event.title}</h5>
                        <p className='text-white/90 text-justify text-sm'>{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image on the right */}
            <div className='flex justify-center lg:justify-end order-1 lg:order-2'>
              <div className='relative'>
                <Image
                  src='/images/content/workshop.jpg'
                  alt='Workshop Events'
                  width={600}
                  height={500}
                  className='rounded-3xl object-cover w-full max-w-2xl shadow-2xl'
                />
                {/* Overlay badge */}
                <div className='absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl'>
                  <div className=''>
                    <Icon icon='mdi:calendar-star' className='w-10 h-10 text-[var(--color-primary)]' />
                    {/* <div>
                      <p className='text-sm text-black/60'>Join Our</p>
                      <p className='text-xl font-bold text-[var(--color-primary)]'>Events</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl'></div>
      </section>

      {/* Publications Section - Redesigned */}
      <section className='relative py-20 bg-white overflow-hidden'>
        {/* Subtle background pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className='container mx-auto max-w-7xl px-4 relative z-10'>
          <div className='text-center mb-12'>
            {/* <p className='text-[var(--color-primary)] text-lg tracking-widest uppercase mb-4'>
              Knowledge Products
            </p> */}
            <h2 className='text-[var(--color-primary)] pb-4'>{tlefPublicationsData.heading}</h2>
            <p className='text-lg font-medium text-black/80 max-w-3xl mx-auto text-justify'>
              {tlefPublicationsData.intro}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
            {tlefPublicationsData.publications.map((publication, index) => (
              <div key={index} className='group relative bg-gradient-to-br from-[var(--color-primary)]/5 to-white border-2 border-[var(--color-primary)]/20 rounded-2xl p-6 hover:border-[var(--color-primary)] hover:shadow-xl transition-all'>
                <div className='flex gap-4 items-start'>
                  <Icon icon='mdi:file-document' className='w-8 h-8 text-[var(--color-primary)] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform' />
                  <span className='text-base text-black/80 text-justify'>{publication}</span>
                </div>
                {/* Decorative corner */}
                <div className='absolute top-0 right-0 w-12 h-12 bg-[var(--color-primary)]/10 rounded-bl-3xl'></div>
              </div>
            ))}
          </div>

          <div className='bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 rounded-3xl p-8 mt-12 max-w-5xl mx-auto shadow-2xl'>
            <div className='flex gap-4 items-start'>
              <Icon icon='mdi:information' className='w-8 h-8 text-white flex-shrink-0 mt-1' />
              <p className='text-white text-base'>
                <span className='font-bold text-lg'>Note: </span>
                {tlefPublicationsData.note}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EventsPublications
