'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { tlefPartnershipModelsData } from '@/data/tlef-content'

const Aboutus = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

  // Icon mappings for partnership models
  const modelIcons: { [key: number]: string } = {
    0: 'mdi:file-document-multiple',
    1: 'mdi:school',
    2: 'mdi:briefcase-check',
    3: 'mdi:globe',
    4: 'mdi:handshake',
    5: 'mdi:chart-line',
    6: 'mdi:megaphone',
  }

  return (
    <section ref={sectionRef} id='About' className='relative overflow-hidden py-20'>
      {/* Background Image with Parallax */}
      <motion.div className='absolute inset-0 z-0' style={{ y: backgroundY, width: '100%', height: '100%' }}>
        <Image
          src='/images/background/swirl.webp'
          alt='swirl background'
          fill
          priority
          className='object-cover opacity-30'
          sizes='100vw'
          style={{ position: 'absolute' }}
        />
        {/* Layer Mask Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent'></div>
      </motion.div>

      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
        <div className='p-8 md:p-12 bg-[var(--color-primary)] rounded-3xl'>
          <Image
            src='/images/aboutus/dots.svg'
            width={100}
            height={100}
            alt='dots-image'
            className='absolute bottom-1 -left-20'
          />
          {/* <p className='text-center text-primary text-lg tracking-widest uppercase mt-10'>
            partnership models
          </p> */}
          <h2 className='text-center pb-12 text-white'>{tlefPartnershipModelsData.heading}</h2>
          
          <div className='mb-12'>
            <p className='text-left text-base md:text-lg font-medium text-white mb-8'>
              {tlefPartnershipModelsData.intro}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10'>
            {tlefPartnershipModelsData.models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{ scale: 1.05, translateY: -8 }}
                className='hover:bg-white bg-[var(--color-primary)]/80 border border-white/20 rounded-3xl p-8 shadow-xl group transition-all duration-300 cursor-pointer'
              >
                <div className='flex items-start gap-4'>
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      icon={modelIcons[index] || 'mdi:circle'}
                      width='24'
                      height='24'
                      className='text-white group-hover:text-[var(--color-primary)] shrink-0 mt-1 transition-colors duration-300'
                    />
                  </motion.div>
                  <p className='text-base font-medium text-white group-hover:text-[var(--color-primary)] text-justify transition-colors duration-300'>
                    {model}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
