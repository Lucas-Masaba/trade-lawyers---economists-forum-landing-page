'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { tlefImpactData, tlefMissionData } from '@/data/tlef-content'
import { motion, AnimatePresence } from 'framer-motion'

const ImpactMission = () => {
  const [showObjectivesModal, setShowObjectivesModal] = useState(false)
  const objectivesToShow = 2

  return (
    <section id='impact' className='relative overflow-hidden py-20 min-h-screen'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0' style={{ width: '100%', height: '100%' }}>
        <Image
          src='/images/background/hexagons.jpg'
          alt='hexagons background'
          fill
          priority
          className='object-cover opacity-40'
          sizes='100vw'
          style={{ position: 'absolute' }}
        />
        {/* Layer Mask Overlay */}
        <div className='absolute inset-0 bg-linear-to-br from-white/40 via-white/20 to-transparent'></div>
      </div>

      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
        {/* Impact Section */}
        <div className='mb-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            {/* Image on the left with decorative frame */}
            <div className='flex justify-center lg:justify-start order-2 lg:order-1 relative'>
              <div className='relative group'>
                <Image
                  src='/images/content/business.jpg'
                  alt='Impact Mission'
                  width={600}
                  height={500}
                  className='rounded-3xl object-cover w-full max-w-2xl shadow-2xl'
                />
                {/* Decorative border animation */}
                <div className='absolute inset-0 border-4 border-(--color-primary)/30 rounded-3xl group-hover:border-(--color-primary) transition-colors'></div>
                {/* Corner accent */}
                <div className='absolute -bottom-4 -right-4 w-24 h-24 bg-(--color-primary) rounded-2xl -z-10 opacity-20'></div>
              </div>
            </div>

            {/* Content on the right - with heading */}
            <div className='space-y-6 order-1 lg:order-2'>
              {/* Heading on the right */}
              <h2 className='pb-4 text-(--color-primary)'>{tlefImpactData.heading}</h2>
              
              <p className='text-lg font-medium text-black/80 text-justify'>
                {tlefImpactData.intro}
              </p>
              
              <p className='text-lg font-medium text-black/80 text-justify'>
                {tlefImpactData.vision}
              </p>

              {/* Strategic Objectives - Cards */}
              <div className='mt-12'>
                <div className='flex items-center gap-3 mb-6'>
                  <Icon icon='mdi:target' className='w-7 h-7 text-(--color-primary)' />
                  <h4 className='text-xl font-bold text-darkmode'>Strategic Objectives</h4>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
                  {tlefImpactData.objectives.slice(0, objectivesToShow).map((objective, index) => (
                    <div key={index} className='group bg-(--color-primary) rounded-xl p-5 hover:bg-(--color-primary)/90 transition-all hover:shadow-lg hover:scale-[1.02] relative overflow-hidden'>
                      <p className='text-sm text-white text-justify line-clamp-3'>{objective}</p>
                    </div>
                  ))}
                </div>

                {/* Read More Button */}
                {tlefImpactData.objectives.length > 2 && (
                  <button
                    onClick={() => setShowObjectivesModal(true)}
                    className='mt-6 px-8 py-2 bg-(--color-primary) text-white font-semibold rounded-full hover:bg-(--color-primary)/90 transition-all hover:shadow-lg text-sm inline-flex items-center gap-2'
                  >
                    Read More...
                    <Icon icon='mdi:chevron-right' className='w-5 h-5' />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className='bg-(--color-primary)/95 backdrop-blur-lg rounded-3xl p-6 md:p-12 mt-20 shadow-xl border border-white/20'>
          <Image
            src='/images/aboutus/dots.svg'
            width={100}
            height={100}
            alt='dots-image'
            className='absolute -left-20 top-12'
          />
          {/* <p className='text-center text-primary text-lg tracking-widest uppercase'>
            Our Mission
          </p> */}
          <h6 className='text-center text-lg md:text-2xl lg:text-3xl font-bold text-white mt-4 max-w-3xl mx-auto'>
            {tlefMissionData.mission}
          </h6>
        </div>

        {/* Strategic Objectives Modal */}
        <AnimatePresence>
          {showObjectivesModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowObjectivesModal(false)}
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className='fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 pointer-events-none'
              >
                <div className='relative w-full max-w-2xl max-h-[calc(100vh-120px)] overflow-y-auto bg-(--color-primary) rounded-3xl shadow-2xl border border-white/20 pointer-events-auto'>
                  {/* Decorative elements */}
                  <div className='absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10'></div>
                  <div className='absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10'></div>

                  {/* Header with close button */}
                  <div className='sticky top-0 z-50 flex items-center justify-between bg-(--color-primary) border-b border-white/20 p-6 md:p-8'>
                    <div className='flex items-center gap-3'>
                      <Icon icon='mdi:target' className='w-8 h-8 text-white' />
                      <h3 className='text-3xl font-bold text-white'>Strategic Objectives</h3>
                    </div>
                    <button
                      onClick={() => setShowObjectivesModal(false)}
                      className='p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors ml-4 shrink-0'
                    >
                      <Icon icon='mdi:close' className='w-6 h-6 text-white' />
                    </button>
                  </div>

                  {/* Content */}
                  <div className='p-8 md:p-12'>

                    <div className='space-y-4'>
                      {tlefImpactData.objectives.map((objective, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all group'
                        >
                          <p className='text-white text-base leading-relaxed text-justify'>{objective}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Close button at bottom */}
                    <button
                      onClick={() => setShowObjectivesModal(false)}
                      className='mt-8 w-full bg-white text-(--color-primary) font-semibold py-3 rounded-full hover:bg-white/90 transition-colors'
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ImpactMission
