'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { footerlinks } from '@/types/footerlinks'

const footer = () => {
  // fetch data

  const [footerlinks, setFooterLinks] = useState<footerlinks[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFooterLinks(data.FooterLinksData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='relative bg-[var(--color-primary)] overflow-hidden' id='first-section'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/background/building.webp'
          alt='building background'
          fill
          className='object-cover opacity-10'
          sizes='100vw'
        />
      </div>

      <div className='container mx-auto max-w-2xl pt-24 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8'>
          {/* COLUMN-1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className='col-span-4'
          >
            <motion.div 
              className='bg-white rounded-2xl p-4 w-fit mb-6'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src='/images/logo/trade_text_logo.png'
                alt='TLEF Logo'
                width={180}
                height={60}
                className='h-auto'
              />
            </motion.div>
            {/* <p className='text-white text-lg mb-6 leading-relaxed'>
              Trade Lawyers and Economists Forum - Building Africa's trade capacity through evidence-based policy and inclusive economic development.
            </p> */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
              className='text-white/90 mb-4 flex items-center gap-2'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
              </svg>
              Headquartered in Kampala, Uganda
            </motion.p>
            <motion.div 
              className='flex items-center gap-4 mt-8'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Link href='https://linkedin.com' target='_blank' className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link href='https://x.com' target='_blank' className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* CLOUMN-2/3 */}
          {footerlinks.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className='relative col-span-2'
            >
              <p className='text-white text-xl font-bold mb-9'>
                {item.section}
              </p>
              <ul>
                {item.links.map((item, linkIdx) => (
                  <li 
                    key={linkIdx} 
                    className='mb-5'
                  >
                    <Link
                      href={`${item.href}`}
                      className='footer-link text-white/90 text-base font-normal mb-6'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      {/* All Rights Reserved */}
      <div className='mx-auto max-w-2xl lg:max-w-7xl relative z-10'>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className='pt-8 pb-8 px-4 sm:px-6 lg:px-8 border-t border-white/20'
        >
          <div className='mt-4 text-center'>
            <p className='text-white/90 text-base'>
              © 2026 Trade Lawyers and Economists Forum (TLEF). All Rights Reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default footer
