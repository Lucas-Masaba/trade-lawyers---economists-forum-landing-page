'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

const FAQ = () => {
  return (
    <section
      id='FAQ'
      className='relative py-1 bg-cover bg-center overflow-hidden dark:bg-darkmode'>
      <div className='container mx-auto max-w-7xl px-4'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className='relative rounded-2xl py-24 bg-faq-bg bg-no-repeat bg-cover bg-primary'
        >
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className='text-lg font-normal text-white text-center mb-6'
          >
            FAQ
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
            className='text-white text-center max-w-3xl mx-auto'
          >
            Frequently asked questions.
          </motion.h2>
          <div className='w-full px-4 pt-16'>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className='mx-auto w-full max-w-5xl rounded-2xl p-8 bg-white mb-5 hover:shadow-lg transition-shadow'
            >
              <Disclosure>
                {({ open }) => (
                  <div>
                    <DisclosureButton className='flex w-full justify-between items-center text-left text-2xl font-medium focus:outline-hidden hover:cursor-pointer group'>
                      <span className='text-black group-hover:text-[var(--color-primary)] transition-colors'>
                        Can you design my site?
                      </span>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className='h-5 w-5'
                      >
                        <Icon icon='lucide:chevron-up' width='20' height='20' />
                      </motion.div>
                    </DisclosureButton>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DisclosurePanel className='text-base text-black/50 font-normal text-left pt-4 mt-6 border-t border-border'>
                            <div className='lg:max-w-70%'>
                              Craven omni memoria patriae zombieland clairvius
                              narcisse religionis sunt diri undead historiarum.
                              Golums, zombies unrelenting et Raimi fascinati
                              beheading.
                            </div>
                          </DisclosurePanel>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Disclosure>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false }}
              className='mx-auto w-full max-w-5xl rounded-2xl p-8 bg-white mb-5 hover:shadow-lg transition-shadow'
            >
              <Disclosure as='div' className='mt-2'>
                {({ open }) => (
                  <>
                    <DisclosureButton className='flex w-full justify-between items-center rounded-lg text-left text-2xl font-medium focus:outline-hidden hover:cursor-pointer group'>
                      <span className='text-black group-hover:text-[var(--color-primary)] transition-colors'>Can you code my site?</span>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className='h-5 w-5'
                      >
                        <Icon icon='lucide:chevron-up' width='20' height='20' />
                      </motion.div>
                    </DisclosureButton>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DisclosurePanel className='text-base text-black/50 pt-4 mt-6 text-left border-t border-border'>
                            <div className='lg:max-w-70%'>
                              Craven omni memoria patriae zombieland clairvius
                              narcisse religionis sunt diri undead historiarum.
                              Golums, zombies unrelenting et Raimi fascinati
                              beheading.
                            </div>
                          </DisclosurePanel>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Disclosure>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
              className='mx-auto w-full max-w-5xl rounded-2xl p-8 bg-white hover:shadow-lg transition-shadow'
            >
              <Disclosure as='div' className='mt-2'>
                {({ open }) => (
                  <>
                    <DisclosureButton className='flex w-full justify-between items-center rounded-lg text-left text-2xl font-medium focus:outline-hidden hover:cursor-pointer group'>
                      <span className='text-black group-hover:text-[var(--color-primary)] transition-colors'>Where are you located?</span>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className='h-5 w-5'
                      >
                        <Icon icon='lucide:chevron-up' width='20' height='20' />
                      </motion.div>
                    </DisclosureButton>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <DisclosurePanel className='text-base text-black/50 pt-4 mt-6 font-normal text-left border-t border-border'>
                            <div className='lg:max-w-70%'>
                              Craven omni memoria patriae zombieland clairvius
                              narcisse religionis sunt diri undead historiarum.
                              Golums, zombies unrelenting et Raimi fascinati
                              beheading.
                            </div>
                          </DisclosurePanel>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Disclosure>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
