'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { testimonials } from '@/types/testimonials'
import TestimonialSkeleton from '../../Skeleton/Testimonial'

interface TestimonialType {
  name: string
  profession: string
  comment: string
  imgSrc: string
  rating: number
}

interface TestimonialCardProps {
  items: TestimonialType
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 2,
  arrows: false,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ items }) => {
  const validRating = Math.min(Math.max(items.rating, 0), 5)

  return (
    <motion.div 
      className='relative py-10'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div 
        className='bg-white dark:bg-darkHeroBg shadow-testimonial m-3 p-10 rounded-3xl hover:shadow-2xl transition-shadow'
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false }}
        >
          <Image
            src={items.imgSrc}
            alt={`${items.name} - ${items.profession} testimonial image`}
            width={71}
            height={71}
            className='inline-block m-auto absolute top-3 border-4 border-white rounded-full'
          />
        </motion.div>
        <motion.p 
          className='text-base font-medium my-4 text-black'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {items.comment}
        </motion.p>
        <hr style={{ color: 'border' }} />
        <div className='flex justify-between'>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <p className='text-base font-medium pt-4 pb-2 text-black dark:text-white'>
              {items.name}
            </p>
            <p className='text-xs font-medium pb-2 text-black/50'>
              {items.profession}
            </p>
          </motion.div>
          <motion.div 
            className='flex mt-5'
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                viewport={{ once: false }}
              >
                <Icon
                  icon='twemoji:star'
                  width='18'
                  className={`mr-1 ${
                    i < validRating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Testimonial: React.FC = () => {
  // fetch data
  const [testimonals, setTestimonials] = useState<testimonials[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setTestimonials(data.TestimonialsData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section
      className="bg-testimonial dark:bg-darkmode bg-cover bg-center overflow-hidden before:absolute before:w-full before:h-full before:bg-[url('/images/wework/elipse.svg')] before:bg-no-repeat before:bg-center"
      id='testimonial-section'>
      <div className='container mx-auto max-w-7xl px-4'>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className=''
        >
          <motion.div 
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className='my-3'>See what others are saying.</h2>
          </motion.div>
          <motion.div 
            className='mt-20'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Slider {...settings}>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TestimonialSkeleton key={i} />
                  ))
                : testimonals.map((items, i) => (
                    <TestimonialCard key={i} items={items} />
                  ))}
            </Slider>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonial
