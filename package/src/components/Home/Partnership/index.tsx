'use client'
import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { motion } from 'framer-motion'
import { tlefPartnershipData, tlefPrioritiesData, tlefValuePropositionData } from '@/data/tlef-content'

const Partnership = () => {
  const priorityIcons: { [key: string]: string } = {
    'research & policy development': 'mdi:file-search-outline',
    'capacity building & training': 'mdi:school-outline',
    'institutional strengthening': 'mdi:domain',
    'sme trade support programs': 'mdi:storefront-outline',
    'inclusive & sustainable trade': 'mdi:leaf',
  }

  const valueIcons: { [key: string]: string } = {
    'measurable impact': 'mdi:chart-line',
    'regional reach': 'mdi:map-marker-radius-outline',
    'technical excellence': 'mdi:cog-outline',
    'collaborative approach': 'mdi:handshake-outline',
  }

  const getPriorityIcon = (title: string) => priorityIcons[title.toLowerCase()] || 'mdi:circle-outline'
  const getValueIcon = (title: string) => valueIcons[title.toLowerCase()] || 'mdi:circle-outline'
  return (
    <>
      {/* Why Partner Section */}
      <section id='partnership' className='relative overflow-hidden py-20 min-h-screen bg-[var(--color-primary)]'>
        {/* Background Image */}
        <div className='absolute inset-0 z-0' style={{ width: '100%', height: '100%' }}>
          <Image
            src='/images/background/wrapped.jpg'
            alt='wrapped background'
            fill
            priority
            className='object-cover opacity-10'
            sizes='100vw'
            style={{ position: 'absolute' }}
          />
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl'></div>

        <div className='container mx-auto max-w-7xl px-4 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Image on the left with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
              className='flex justify-center lg:justify-start order-2 lg:order-1'
            >
              <motion.div 
                className='relative group'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className='absolute -inset-4 bg-white/10 rounded-3xl blur-xl group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110'></div>
                <Image
                  src='/images/content/handshake.png'
                  alt='Partnership Handshake'
                  width={700}
                  height={600}
                  className='rounded-2xl object-cover w-full max-w-4xl relative shadow-2xl border-4 border-white/20 hover:border-white/40 transition-all duration-300'
                />
              </motion.div>
            </motion.div>

            {/* Content on the right - with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className='space-y-6 order-1 lg:order-2'
            >
              {/* Heading */}
              <motion.div 
                className='inline-block'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: false }}
              >
                <h2 className='pb-4 text-white relative'>
                  {tlefPartnershipData.heading}
                  <motion.div 
                    className='absolute -bottom-2 left-0 h-1 bg-white/50 rounded-full'
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: false }}
                  ></motion.div>
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className='text-lg font-medium text-white/95 text-justify leading-relaxed'
              >
                {tlefPartnershipData.intro}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: false }}
                className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-8 hover:bg-white/15 transition-all duration-300'
              >
                <h5 className='text-white font-bold mb-4'>
                  Key Benefits
                </h5>
                <ul className='space-y-3'>
                  {tlefPartnershipData.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: false }}
                      className='flex gap-3 items-start group'
                    >
                      <motion.div 
                        className='w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0'
                        whileHover={{ scale: 2 }}
                      ></motion.div>
                      <span className='text-base text-white/90 leading-relaxed'>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Priorities Section */}
      <section className='relative py-20 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden'>
        {/* Decorative background elements */}
        <div className='absolute top-10 right-10 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 left-10 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full blur-3xl'></div>

        <div className='container mx-auto max-w-7xl px-4 relative z-10'>
          {/* Section Header */}
          <div className='text-center mb-16'>
            <div className='inline-block'>
              <h2 className='pb-4 text-[var(--color-primary)] relative'>
                {tlefPrioritiesData.heading}
                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[var(--color-primary)]/50 rounded-full'></div>
              </h2>
            </div>
          </div>
          
          {/* Priority Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
            {tlefPrioritiesData.priorities.map((priority, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className='group relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer'
              >
                {/* Glow effect on hover */}
                <motion.div 
                  className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity'
                  whileHover={{ opacity: 1 }}
                ></motion.div>

                <div className='relative z-10'>
                  <motion.div 
                    className='mb-6'
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='p-4 bg-white/20 rounded-2xl w-fit group-hover:bg-white/30 transition-colors'>
                      <Icon icon={getPriorityIcon(priority.title)} className='w-10 h-10 text-white flex-shrink-0' />
                    </div>
                  </motion.div>
                  
                  <motion.h5 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                    viewport={{ once: false }}
                    className='text-white font-bold text-xl mb-4'
                  >
                    {priority.title}
                  </motion.h5>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: false }}
                    className='text-white/90 text-base leading-relaxed'
                  >
                    {priority.description}
                  </motion.p>
                </div>

                {/* Bottom accent line */}
                <div className='absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-3xl'></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className='relative py-20 bg-[var(--color-primary)] overflow-hidden'>
        {/* Decorative background elements */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2'></div>
        <div className='absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2'></div>

        <div className='container mx-auto max-w-7xl px-4 relative z-10'>
          {/* Section Header */}
          <div className='text-center mb-16'>
            <div className='inline-block'>
              <h2 className='pb-4 text-white relative'>
                {tlefValuePropositionData.heading}
                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full'></div>
              </h2>
            </div>
          </div>
          
          {/* Value Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {tlefValuePropositionData.values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className='group relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer'
              >
                {/* Gradient overlay on hover */}
                <motion.div 
                  className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity'
                  whileHover={{ opacity: 1 }}
                ></motion.div>
                
                <div className='relative z-10'>
                  <div className='flex gap-4 items-start mb-6'>
                    <motion.div 
                      className='p-3 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors'
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon icon={getValueIcon(value.title)} className='w-8 h-8 text-white flex-shrink-0' />
                    </motion.div>
                    <motion.h5 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                      viewport={{ once: false }}
                      className='text-white font-bold text-xl pt-2'
                    >
                      {value.title}
                    </motion.h5>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: false }}
                    className='text-white/90 text-base leading-relaxed'
                  >
                    {value.description}
                  </motion.p>
                </div>

                {/* Corner accent */}
                <motion.div 
                  className='absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full'
                  whileHover={{ opacity: 0.3 }}
                ></motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative line */}
          <div className='mt-16 flex justify-center'>
            <div className='w-48 h-1 bg-white/20 rounded-full'></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Partnership
