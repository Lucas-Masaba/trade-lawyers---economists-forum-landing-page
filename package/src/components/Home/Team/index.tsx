'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { tlefTeamData } from '@/data/tlef-team'
import type { TeamMember } from '@/types/tlefdata'

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <section id='Team' className='overflow-x-hidden py-20'>
      <div className='container mx-auto max-w-7xl px-4 relative'>
        {/* <p className='text-center text-primary text-lg tracking-widest uppercase'>
          leadership
        </p> */}
        <h2 className='text-center max-w-5xl mx-auto'>
          Our Team
        </h2>
        {/* <h5 className='font-medium text-center pt-10 text-black/50 max-w-3xl mx-auto'>
          A multidisciplinary team of trade lawyers and economists committed to transparent, ethical, and evidence-driven work.
        </h5> */}

        {/* Team Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
          {tlefTeamData.map((member) => (
            <div
              key={member.id}
              className='group cursor-pointer'
              onClick={() => setSelectedMember(member)}
            >
              <div className='relative overflow-hidden rounded-2xl mb-4 h-80 bg-grey'>
                <Image
                  src={member.imgSrc}
                  alt={member.name}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                />
              </div>
              <div className='text-center'>
                <h5 className='text-darkmode font-bold'>{member.name}</h5>
                <p className='text-primary text-sm font-medium mt-1'>{member.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Certificate Section */}
        <div className='mt-20 bg-primary/10 rounded-3xl p-12 border border-primary/20'>
          <div className='text-center'>
            <p className='text-center text-primary text-lg tracking-widest uppercase mb-6'>
              Registration
            </p>
            <h3 className='text-2xl font-bold text-darkmode mb-6'>
              TLEF Registration Certificate
            </h3>
            <p className='text-black/80 mb-8 max-w-2xl mx-auto text-justify'>
              View our official registration certificate documenting the legal establishment of the Trade Lawyers and Economists Forum.
            </p>
            <a
              href='/images/pdfs/REGISTRATION_CERTIFICATE.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-primary text-white text-lg font-semibold py-4 px-8 rounded-full hover:bg-darkmode transition-colors inline-block'
            >
              View Certificate (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
          onClick={() => setSelectedMember(null)}
        >
          <div
            className='bg-white rounded-3xl max-w-2xl w-full max-h-96 overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-8'>
              <div className='flex gap-6 mb-6'>
                <div className='relative w-24 h-24 shrink-0 rounded-xl overflow-hidden'>
                  <Image
                    src={selectedMember.imgSrc}
                    alt={selectedMember.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-darkmode'>{selectedMember.name}</h3>
                  <p className='text-primary font-bold text-lg'>{selectedMember.position}</p>
                </div>
              </div>

              <div className='space-y-4 text-black/80'>
                {selectedMember.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className='text-sm leading-relaxed text-justify'>
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedMember.expertise && selectedMember.expertise.length > 0 && (
                <div className='mt-6 pt-6 border-t border-grey'>
                  <p className='font-bold text-darkmode mb-3'>Areas of Expertise:</p>
                  <div className='flex flex-wrap gap-2'>
                    {selectedMember.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className='bg-primary/15 text-primary px-3 py-1 rounded-full text-sm font-medium'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedMember(null)}
                className='w-full mt-6 bg-grey hover:bg-darkmode hover:text-white text-darkmode font-bold py-2 rounded-lg transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Team
