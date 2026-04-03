'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRef } from 'react'
import { tlefHeroData } from '@/data/tlef-content'

const Hero = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

  const leftAnimation = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  const rightAnimation = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section ref={sectionRef} className='relative overflow-hidden z-1 min-h-screen md:h-screen flex items-center'>
      {/* Background Image with Parallax */}
      <motion.div className='absolute inset-0 z-0' style={{ y: backgroundY }}>
        <Image
          src='/images/background/connect.jpg'
          alt='hexagons background'
          fill
          priority
          className='object-cover opacity-30'
          sizes='100vw'
        />
        {/* Layer Mask Overlay */}
        <div className='absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-(--color-primary)/20'></div>
      </motion.div>

      {/* Content */}
      <div className='container mx-auto pt-12 md:pt-24 max-w-7xl px-4 relative z-10 w-full'>
        <div className='grid grid-cols-12 justify-center items-center gap-8'>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='col-span-12 lg:col-span-6 order-1 lg:order-2 flex justify-center'
          >
            <Image
              src='/images/logo/trade_text_logo.png'
              alt='banner image'
              width={320}
              height={320}
              priority
              sizes='(max-width: 1024px) 80vw, 400px'
              className='h-auto w-[80%] max-w-sm lg:max-w-md drop-shadow-2xl hover:drop-shadow-4xl transition-all duration-500'
            />
          </motion.div>
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='col-span-12 xl:col-span-5 lg:col-span-6 md:col-span-12 sm:col-span-12 order-2 lg:order-1'
          >
            {/* <div className='py-2 px-5 bg-primary/15 rounded-full w-fit'>
              <p className='text-primary text-lg font-bold'>{tlefHeroData.tagline}</p>
            </div> */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-lg font-medium text-black/80 mt-6 mb-8 text-justify leading-relaxed'
            >
              {tlefHeroData.subtitle}
            </motion.p>
            <Link href={tlefHeroData.ctaLink}>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className='bg-(--color-primary) text-white text-lg md:text-xl font-semibold py-4 md:py-5 px-8 md:px-12 rounded-full hover:bg-(--color-primary)/90 shadow-xl mt-10 inline-flex items-center gap-3 transition-all duration-300'
              >
                {tlefHeroData.cta}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
