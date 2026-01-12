'use client'
import React from 'react'
import { tlefEventsData, tlefPublicationsData } from '@/data/tlef-content'

const EventsPublications = () => {
  return (
    <>
      {/* Events Section */}
      <section className='py-20 bg-grey'>
        <div className='container mx-auto max-w-7xl px-4'>
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Activities
          </p>
          <h2 className='text-center pb-12'>{tlefEventsData.heading}</h2>

          <div className='max-w-4xl mx-auto space-y-6 mb-12'>
            <p className='text-lg font-medium text-black/80 text-justify'>
              {tlefEventsData.intro}
            </p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
              {tlefEventsData.events.map((event, index) => (
                <div key={index} className='bg-white rounded-2xl p-6 shadow-lg'>
                  <h5 className='text-lg font-bold text-darkmode mb-3'>{event.title}</h5>
                  <p className='text-black/80 text-justify'>{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto max-w-7xl px-4'>
          <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Knowledge Products
          </p>
          <h2 className='text-center pb-12'>{tlefPublicationsData.heading}</h2>

          <div className='max-w-4xl mx-auto space-y-8'>
            <p className='text-lg font-medium text-black/80 text-justify'>
              {tlefPublicationsData.intro}
            </p>

            <ul className='space-y-4'>
              {tlefPublicationsData.publications.map((publication, index) => (
                <li key={index} className='flex gap-4 bg-grey rounded-2xl p-6'>
                  <span className='text-primary font-bold text-2xl shrink-0'>📄</span>
                  <span className='text-lg text-black/80 text-justify'>{publication}</span>
                </li>
              ))}
            </ul>

            <div className='bg-primary/10 rounded-2xl p-6 border border-primary/20 mt-8'>
              <p className='text-black/80 text-lg text-justify'>
                <span className='font-bold'>Note: </span>
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
