'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { tlefPartnershipModelsData } from '@/data/tlef-content'

const Aboutus = () => {
  return (
    <section id='About' className='bg-cover bg-center overflow-hidden py-20'>
      <div className='container mx-auto max-w-7xl px-4 relative z-1'>
        <div className='p-12 bg-grey rounded-3xl'>
          <Image
            src='/images/aboutus/dots.svg'
            width={100}
            height={100}
            alt='dots-image'
            className='absolute bottom-1 -left-20'
          />
          <p className='text-center text-primary text-lg tracking-widest uppercase mt-10'>
            partnership models
          </p>
          <h2 className='text-center pb-12'>{tlefPartnershipModelsData.heading}</h2>
          
          <div className='max-w-4xl mx-auto mb-12'>
            <p className='text-lg font-medium text-black/80 text-justify mb-8'>
              {tlefPartnershipModelsData.intro}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10'>
            {tlefPartnershipModelsData.models.map((model, index) => (
              <div
                key={index}
                className='hover:bg-darkmode bg-white rounded-3xl p-8 shadow-xl group transition-all'>
                <div className='flex items-start gap-4'>
                  <Icon
                    icon='tabler:circle-check'
                    width='24'
                    height='24'
                    className='text-primary group-hover:text-white shrink-0 mt-1'
                  />
                  <p className='text-lg font-medium text-black group-hover:text-white text-justify'>
                    {model}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
