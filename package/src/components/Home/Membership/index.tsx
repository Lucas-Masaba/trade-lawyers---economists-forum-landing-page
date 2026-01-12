'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { tlefMembershipData } from '@/data/tlef-content'
import { motion, AnimatePresence } from 'framer-motion'

const Membership = () => {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const categoriesToShow = 4

  // Icon mappings for why join points
  const pointIcons: { [key: number]: string } = {
    0: 'mdi:network',
    1: 'mdi:brain',
  }
  return (
    <section id='membership' className='py-20 bg-white'>
      <div className='container mx-auto max-w-7xl px-4'>
        {/* <p className='text-center text-primary text-lg tracking-widest uppercase'>
          Join Us
        </p> */}
        <h2 className='text-center text-[var(--color-primary)] pb-12'>{tlefMembershipData.heading}</h2>

        <div className='space-y-8'>
          {/* Intro */}
          <p className='text-lg font-medium text-black/80 text-justify'>
            {tlefMembershipData.intro}
          </p>

          {/* Why Join */}
          <div className='mt-12'>
            <h4 className='text-2xl font-bold text-darkmode mb-8'>
              Why Join TLEF?
            </h4>
            <p className='text-lg text-black/80 mb-8 text-justify'>
              {tlefMembershipData.whyJoin}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {tlefMembershipData.whyJoinPoints.map((point, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className='bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border-l-4 border-[var(--color-primary)] rounded-lg p-8 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300'
                >
                  <div className='flex gap-4 items-start mb-6'>
                    <motion.div whileHover={{ scale: 1.15, rotate: 10 }}>
                      <Icon icon={pointIcons[index] || 'mdi:circle'} className='w-8 h-8 text-[var(--color-primary)] flex-shrink-0 transition-transform duration-300' />
                    </motion.div>
                    <h5 className='text-xl font-bold text-darkmode'>{point.title}</h5>
                  </div>
                  <ul className='space-y-3'>
                    {point.items.map((item, itemIndex) => (
                      <motion.li 
                        key={itemIndex} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                        viewport={{ once: false }}
                        className='flex gap-3'
                      >
                        <span className='text-[var(--color-primary)] font-bold text-lg shrink-0 pt-0.5'>›</span>
                        <span className='text-black/80 text-justify'>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Member Benefits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className='mt-12 bg-[var(--color-primary)] rounded-3xl p-8 border border-white/20 hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300'
          >
            <h4 className='text-2xl font-bold text-white mb-6'>Member Benefits</h4>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {tlefMembershipData.benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: false }}
                  className='flex gap-3 hover:translate-x-2 transition-transform duration-300'
                >
                  <span className='text-white font-bold shrink-0'>›</span>
                  <span className='text-white text-justify'>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Who Can Join */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'
          >
            <div>
              <h4 className='text-2xl font-bold text-darkmode mb-6'>Who Can Join?</h4>
              <p className='text-lg text-black/80 mb-6 text-justify'>
                Membership is open to:
              </p>
              <ul className='space-y-2'>
                {tlefMembershipData.whoCanJoin.slice(0, categoriesToShow).map((category, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    className='flex gap-3 hover:translate-x-2 transition-transform duration-300'
                  >
                    <span className='text-[var(--color-primary)] font-bold text-base shrink-0'>›</span>
                    <span className='text-sm text-black/80 text-justify'>{category}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Read More Button */}
              {tlefMembershipData.whoCanJoin.length > 4 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCategoriesModal(true)}
                  className='mt-6 px-8 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-full hover:bg-[var(--color-primary)]/90 transition-all hover:shadow-lg text-sm inline-flex items-center gap-2'
                >
                  Read More...
                  <Icon icon='mdi:chevron-right' className='w-5 h-5' />
                </motion.button>
              )}
            </div>

            {/* Join CTA */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className='bg-[var(--color-primary)] rounded-3xl p-8 text-center flex flex-col justify-center hover:shadow-2xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300'
            >
              <p className='text-left text-justify text-white mb-6'>
                {tlefMembershipData.joinCTA}
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-[var(--color-primary)] text-sm md:text-base lg:text-lg font-semibold py-3 md:py-4 px-6 md:px-10 rounded-full hover:bg-white/90 transition-all duration-300'
              >
                Complete Membership Form
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Who Can Join Modal */}
        <AnimatePresence>
          {showCategoriesModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCategoriesModal(false)}
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
                <div className='relative w-full max-w-2xl max-h-[calc(100vh-120px)] overflow-y-auto bg-[var(--color-primary)] rounded-3xl shadow-2xl border border-white/20 pointer-events-auto'>
                  {/* Decorative elements */}
                  <div className='absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10'></div>
                  <div className='absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10'></div>

                  {/* Header with close button */}
                  <div className='sticky top-0 z-50 flex items-center justify-between bg-[var(--color-primary)] border-b border-white/20 p-6 md:p-8'>
                    <div className='flex items-center gap-3'>
                      <Icon icon='mdi:account-multiple' className='w-8 h-8 text-white' />
                      <h3 className='text-3xl font-bold text-white'>Who Can Join?</h3>
                    </div>
                    <button
                      onClick={() => setShowCategoriesModal(false)}
                      className='p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors ml-4 flex-shrink-0'
                    >
                      <Icon icon='mdi:close' className='w-6 h-6 text-white' />
                    </button>
                  </div>

                  {/* Content */}
                  <div className='p-8 md:p-12'>

                    <p className='text-white/90 text-base mb-8'>Membership is open to the following categories:</p>

                    <div className='space-y-4'>
                      {tlefMembershipData.whoCanJoin.map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all'
                        >
                          <p className='text-white text-base leading-relaxed text-justify'>{category}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Close button at bottom */}
                    <button
                      onClick={() => setShowCategoriesModal(false)}
                      className='mt-8 w-full bg-white text-[var(--color-primary)] font-semibold py-3 rounded-full hover:bg-white/90 transition-colors'
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

export default Membership
