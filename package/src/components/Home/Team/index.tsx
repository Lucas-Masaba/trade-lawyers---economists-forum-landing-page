'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { tlefTeamData } from '@/data/tlef-team'
import type { TeamMember } from '@/types/tlefdata'
import { motion } from 'framer-motion'

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <section id='Team' className='relative overflow-hidden py-20 bg-linear-to-br from-white via-(--color-primary)/5 to-white'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-(--color-primary)/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-(--color-primary)/5 rounded-full blur-3xl'></div>

      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
        {/* <p className='text-center text-primary text-lg tracking-widest uppercase'>
          leadership
        </p> */}
        <div className='text-center mb-16'>
          <h2 className='text-(--color-primary) max-w-5xl mx-auto mb-4'>
            Team
          </h2>
          {/* <p className='text-black/60 max-w-2xl mx-auto'>
            Meet the professionals driving Africa's trade policy and economic governance
          </p> */}
        </div>
        {/* <h5 className='font-medium text-center pt-10 text-black/50 max-w-3xl mx-auto'>
          A multidisciplinary team of trade lawyers and economists committed to transparent, ethical, and evidence-driven work.
        </h5> */}

        {/* Team Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
          {tlefTeamData.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className='group cursor-pointer'
              onClick={() => setSelectedMember(member)}
            >
              <motion.div 
                className='relative overflow-hidden rounded-3xl mb-4 aspect-3/4 bg-linear-to-br from-(--color-primary)/10 to-(--color-primary)/5 border-2 border-transparent group-hover:border-(--color-primary) transition-all shadow-lg group-hover:shadow-2xl'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={member.imgSrc || '/images/profile-pics/default.jpg'}
                  alt={member.name}
                  fill
                  className='object-cover object-top group-hover:scale-110 transition-transform duration-500'
                />
                {/* Overlay on hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className='absolute inset-0 bg-linear-to-t from-(--color-primary) via-(--color-primary)/50 to-transparent'
                >
                  <div className='absolute bottom-4 left-4 right-4'>
                    <Icon icon='mdi:eye' className='w-8 h-8 text-white mx-auto animate-bounce' />
                    <p className='text-white text-center text-sm mt-2'>View Details</p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div 
                className='text-center'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
                viewport={{ once: false }}
              >
                <h5 className='text-darkmode font-bold group-hover:text-(--color-primary) transition-colors duration-300'>{member.name}</h5>
                <p className='text-(--color-primary) text-sm font-medium mt-1'>{member.position}</p>
                {member.socials && member.socials.length > 0 && (
                  <motion.div 
                    className='flex items-center justify-center gap-2 mt-3'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                    viewport={{ once: false }}
                  >
                    {member.socials.map((social, socialIdx) => (
                      <motion.a 
                        key={`${member.id}-${social.label}`}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={social.label}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-(--color-primary)/10 text-(--color-primary) hover:bg-(--color-primary)/20 transition-colors'
                        whileHover={{ scale: 1.2, rotate: socialIdx % 2 === 0 ? 5 : -5 }}
                      >
                        <Icon icon={social.icon} className='w-4 h-4' />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Registration Certificate Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className='mt-20 bg-linear-to-br from-(--color-primary) to-(--color-primary)/80 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-300'
        >
          {/* Decorative circles */}
          <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse'></div>
          <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse'></div>
          
          <div className='text-center relative z-10'>
            <motion.div 
              className='flex justify-center mb-4 md:mb-6'
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className='bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-2xl hover:bg-white/30 transition-all duration-300'>
                <Icon icon='mdi:certificate' className='w-12 h-12 md:w-16 md:h-16 text-white' />
              </div>
            </motion.div>
            {/* <p className='text-white/90 text-lg tracking-widest uppercase mb-4'>
              Registration
            </p> */}
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className='text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6'
            >
              TLEF Registration Certificate
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false }}
              className='text-sm md:text-base text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto'
            >
              View our official registration certificate documenting the legal establishment of the Trade Lawyers and Economists Forum.
            </motion.p>
            <motion.a
              href='/images/pdfs/REGISTRATION_CERTIFICATE.pdf'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-white text-(--color-primary) text-sm md:text-base lg:text-lg font-semibold py-3 md:py-4 px-6 md:px-10 rounded-full hover:bg-white/90 transition-all inline-flex items-center gap-2 shadow-xl hover:shadow-2xl'
            >
              <Icon icon='mdi:file-pdf-box' className='w-5 h-5 md:w-6 md:h-6' />
              View Certificate (PDF)
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className='bg-(--color-primary) rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6 md:p-8'>
              <div className='md:grid md:grid-cols-5 gap-6 items-start'>
                {/* Left: Image with slide-in and sticky */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className='md:col-span-2 mb-6 md:mb-0 md:sticky md:top-6'
                >
                  <div className='relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-white/10'>
                    <Image
                      src={selectedMember.imgSrc || '/images/profile-pics/default.jpg'}
                      alt={selectedMember.name}
                      fill
                      className='object-cover object-top'
                      sizes='(max-width: 768px) 100vw, 40vw'
                    />
                  </div>
                </motion.div>

                {/* Right: Content with slide-in */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className='md:col-span-3'
                >
                  <h3 className='text-2xl md:text-3xl font-bold text-white'>{selectedMember.name}</h3>
                  <p className='text-white/90 font-bold text-lg mt-1'>{selectedMember.position}</p>

                  {selectedMember.socials && selectedMember.socials.length > 0 && (
                    <div className='flex items-center gap-3 mt-4'>
                      {selectedMember.socials.map((social) => (
                        <a
                          key={`${selectedMember.id}-${social.label}`}
                          href={social.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={social.label}
                          className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors'
                        >
                          <Icon icon={social.icon} className='w-5 h-5' />
                        </a>
                      ))}
                    </div>
                  )}

                  <div className='space-y-4 text-white mt-4'>
                    {selectedMember.bio && selectedMember.bio.trim() ? (
                      selectedMember.bio.split('\n\n').map((paragraph, index) => (
                        <p key={index} className='text-sm leading-relaxed text-justify text-white'>
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className='text-sm italic text-white/70'>Profile information coming soon.</p>
                    )}
                  </div>

                  {selectedMember.expertise && selectedMember.expertise.length > 0 && (
                    <div className='mt-6 pt-6 border-t border-white/30'>
                      <p className='font-bold text-white mb-3'>Areas of Expertise:</p>
                      <div className='flex flex-wrap gap-2'>
                        {selectedMember.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className='bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className='w-full mt-6 bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-lg transition-colors'
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Team
