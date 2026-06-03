'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { tlefMembershipData } from '@/data/tlef-content'
import { motion, AnimatePresence } from 'framer-motion'

type MembershipProps = {
  openFormOnMount?: boolean
}

const Membership = ({ openFormOnMount = false }: MembershipProps) => {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [showMembershipForm, setShowMembershipForm] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasAutoOpenedMembershipForm = useRef(false)
  const categoriesToShow = 4

  type FormData = {
    fullName: string
    email: string
    country: string
    roleTitle: string
    organizationType: string
    organizationName: string
    professionalProfileLink: string
    areaOfExpertise: string
  }

  const initialFormData: FormData = {
    fullName: '',
    email: '',
    country: '',
    roleTitle: '',
    organizationType: '',
    organizationName: '',
    professionalProfileLink: '',
    areaOfExpertise: '',
  }

  const roleTitleOptions = [
    'Partner / Principal',
    'Director / Head',
    'Senior Counsel / Senior Officer',
    'Policy Advisor / Analyst',
    'Economist / Researcher',
    'Lecturer / Academic',
    'Consultant / Practitioner',
    'Government Official',
    'Other',
  ]

  const organizationTypeOptions = [
    'Government / Regulator',
    'Regional Organization',
    'International Organization',
    'Law Firm',
    'Private Company',
    'NGO / Civil Society',
    'Academia / Research',
    'Independent Consultant',
    'Other',
  ]

  const expertiseOptions = [
    'Trade law',
    'Trade policy',
    'Economics',
    'Negotiations',
    'Research',
    'Customs / trade facilitation',
    'Investment',
    'Regional integration',
    'Capacity building',
    'Other',
  ]

  // Form state management
  const [formData, setFormData] = useState<FormData>(initialFormData)

  // Status for form submission
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const resetFormState = useCallback(() => {
    clearCloseTimer()
    setSubmitMessage('')
    setSubmitSuccess(false)
  }, [clearCloseTimer])

  const openMembershipForm = useCallback(() => {
    resetFormState()
    setShowMembershipForm(true)
  }, [resetFormState])

  const closeMembershipForm = useCallback(() => {
    resetFormState()
    setShowMembershipForm(false)
  }, [resetFormState])

  useEffect(() => {
    return () => {
      clearCloseTimer()
    }
  }, [clearCloseTimer])

  useEffect(() => {
    if (hasAutoOpenedMembershipForm.current) {
      return
    }

    if (openFormOnMount) {
      hasAutoOpenedMembershipForm.current = true
      openMembershipForm()
    }
  }, [openFormOnMount, openMembershipForm])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Submit form to Google Apps Script
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')
    setSubmitSuccess(false)

    try {
      if (!formData.fullName.trim()) {
        throw new Error('Please enter your full name')
      }

      if (!formData.email.trim()) {
        throw new Error('Please enter your email address')
      }

      if (!formData.country.trim()) {
        throw new Error('Please enter your country')
      }

      if (!formData.roleTitle.trim()) {
        throw new Error('Please select your current role / title')
      }

      if (!formData.organizationType.trim()) {
        throw new Error('Please select your organization type')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      if (formData.professionalProfileLink.trim()) {
        try {
          new URL(formData.professionalProfileLink.trim())
        } catch {
          throw new Error('Please enter a valid professional profile link or leave it blank')
        }
      }

      const normalizedPayload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        country: formData.country.trim(),
        roleTitle: formData.roleTitle.trim(),
        organizationType: formData.organizationType.trim(),
        organizationName: formData.organizationName.trim(),
        professionalProfileLink: formData.professionalProfileLink.trim(),
        areaOfExpertise: formData.areaOfExpertise.trim(),
      }

      // Submit through our server route so we can verify success reliably.
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedPayload)
      })

      const result = await response.json() as { success?: boolean; message?: string }

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit membership form')
      }

      // Success! Reset form and show message
      setSubmitSuccess(true)
      setSubmitMessage('✓ Thank you! Your membership has been registered successfully.')
      setFormData(initialFormData)

      // Close form after 2 seconds
      clearCloseTimer()
      closeTimerRef.current = setTimeout(() => {
        setShowMembershipForm(false)
        setSubmitMessage('')
        setSubmitSuccess(false)
        closeTimerRef.current = null
      }, 2000)

    } catch (error) {
      setSubmitSuccess(false)
      setSubmitMessage(`✗ Error: ${error instanceof Error ? error.message : 'Failed to submit form'}`)
    } finally {
      setSubmitting(false)
    }
  }

  // Title-based icon mapping keeps icon meaning aligned with each section's message.
  const pointIcons: { [key: string]: string } = {
    'professional growth & learning': 'mdi:school-outline',
    'networking & collaboration': 'mdi:account-group-outline',
    'research & knowledge sharing': 'mdi:file-document-edit-outline',
    'visibility & professional contribution': 'mdi:bullhorn-outline',
  }

  const getPointIcon = (title: string) => pointIcons[title.toLowerCase()] || 'mdi:circle-outline'
  return (
    <section id='membership' className='py-20 bg-white'>
      <div className='container mx-auto max-w-7xl px-4'>
        {/* <p className='text-center text-primary text-lg tracking-widest uppercase'>
          Join Us
        </p> */}
        <h2 className='text-center text-(--color-primary) pb-12'>{tlefMembershipData.heading}</h2>

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
                  className='bg-linear-to-br from-(--color-primary)/10 to-(--color-primary)/5 border-l-4 border-(--color-primary) rounded-lg p-8 hover:shadow-lg hover:shadow-(--color-primary)/20 transition-all duration-300'
                >
                  <div className='flex gap-4 items-start mb-6'>
                    <motion.div whileHover={{ scale: 1.15, rotate: 10 }}>
                      <Icon icon={getPointIcon(point.title)} className='w-8 h-8 text-(--color-primary) shrink-0 transition-transform duration-300' />
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
                        <span className='text-(--color-primary) font-bold text-lg shrink-0 pt-0.5'>›</span>
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
            className='mt-12 bg-(--color-primary) rounded-3xl p-8 border border-white/20 hover:shadow-2xl hover:shadow-(--color-primary)/30 transition-all duration-300'
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
                    <span className='text-(--color-primary) font-bold text-base shrink-0'>›</span>
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
                  className='mt-6 px-8 py-2 bg-(--color-primary) text-white font-semibold rounded-full hover:bg-(--color-primary)/90 transition-all hover:shadow-lg text-sm inline-flex items-center gap-2'
                >
                  Read More...
                  <Icon icon='mdi:chevron-right' className='w-5 h-5' />
                </motion.button>
              )}
            </div>

            {/* Join CTA */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className='bg-(--color-primary) rounded-3xl p-8 text-center flex flex-col justify-center hover:shadow-2xl hover:shadow-(--color-primary)/30 transition-all duration-300'
            >
              <p className='text-justify text-white mb-6'>
                {tlefMembershipData.joinCTA}
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openMembershipForm}
                className='bg-white text-(--color-primary) text-sm md:text-base lg:text-lg font-semibold py-3 md:py-4 px-6 md:px-10 rounded-full hover:bg-white/90 transition-all duration-300'
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
                <div className='relative w-full max-w-2xl max-h-[calc(100vh-120px)] overflow-y-auto bg-(--color-primary) rounded-3xl shadow-2xl border border-white/20 pointer-events-auto'>
                  {/* Decorative elements */}
                  <div className='absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10'></div>
                  <div className='absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10'></div>

                  {/* Header with close button */}
                  <div className='sticky top-0 z-50 flex items-center justify-between bg-(--color-primary) border-b border-white/20 p-6 md:p-8'>
                    <div className='flex items-center gap-3'>
                      <Icon icon='mdi:account-multiple' className='w-8 h-8 text-white' />
                      <h3 className='text-3xl font-bold text-white'>Who Can Join?</h3>
                    </div>
                    <button
                      onClick={() => setShowCategoriesModal(false)}
                      className='p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors ml-4 shrink-0'
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

        {/* Membership Form Modal */}
        <AnimatePresence>
          {showMembershipForm && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMembershipForm(false)}
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'
              >
                <div className='relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 pointer-events-auto max-h-[90vh] overflow-y-auto'>
                  {/* Header */}
                  <div className='sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 p-6 md:p-8'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-primary)/10 text-(--color-primary)'>
                        <Icon icon='mdi:clipboard-text-outline' className='w-7 h-7' />
                      </div>
                      <div>
                        <h3 className='text-3xl font-bold text-(--color-primary)'>Membership Form</h3>
                        <p className='text-sm text-gray-500'>Complete the form below to request membership.</p>
                      </div>
                    </div>
                    <button
                      onClick={closeMembershipForm}
                      className='p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors ml-4 shrink-0'
                    >
                      <Icon icon='mdi:close' className='w-6 h-6 text-gray-600' />
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className='p-8 md:p-12'>
                    <form onSubmit={handleFormSubmit} className='space-y-6'>
                      {/* Full Name */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Full Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          name='fullName'
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder='Enter your full name'
                          autoComplete='name'
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Email Address <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder='Enter your email'
                          autoComplete='email'
                          inputMode='email'
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        />
                      </div>

                      {/* Role / Title */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Current Role / Title <span className='text-red-500'>*</span>
                        </label>
                        <select
                          name='roleTitle'
                          value={formData.roleTitle}
                          onChange={handleInputChange}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        >
                          <option value=''>Select your role / title</option>
                          {roleTitleOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Organization Type */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Organization Type <span className='text-red-500'>*</span>
                        </label>
                        <select
                          name='organizationType'
                          value={formData.organizationType}
                          onChange={handleInputChange}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        >
                          <option value=''>Select organization type</option>
                          {organizationTypeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Organization Name */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Organization Name <span className='text-gray-400'>(optional)</span>
                        </label>
                        <input
                          type='text'
                          name='organizationName'
                          value={formData.organizationName}
                          onChange={handleInputChange}
                          placeholder='Enter your organization name'
                          autoComplete='organization'
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        />
                      </div>

                      {/* Country */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Country <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          name='country'
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder='Enter your country'
                          autoComplete='country-name'
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        />
                      </div>

                      {/* Primary Area of Expertise */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Primary Area of Expertise <span className='text-gray-400'>(optional)</span>
                        </label>
                        <select
                          name='areaOfExpertise'
                          value={formData.areaOfExpertise}
                          onChange={handleInputChange}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        >
                          <option value=''>Select an area of expertise</option>
                          {expertiseOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Professional Profile Link */}
                      <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                          Professional Profile Link <span className='text-gray-400'>(optional)</span>
                        </label>
                        <input
                          type='url'
                          name='professionalProfileLink'
                          value={formData.professionalProfileLink}
                          onChange={handleInputChange}
                          placeholder='LinkedIn, ORCID, Google Scholar, website, or profile URL'
                          autoComplete='url'
                          inputMode='url'
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 transition-all'
                        />
                        <p className='mt-2 text-xs text-gray-500'>Share any public professional profile if you have one. This is optional.</p>
                      </div>

                      {/* Submit Message */}
                      {submitMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg text-center font-semibold ${
                            submitSuccess
                              ? 'bg-green-100 text-green-700 border border-green-300'
                              : 'bg-red-100 text-red-700 border border-red-300'
                          }`}
                        >
                          {submitMessage}
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={submitting}
                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                          submitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-(--color-primary) hover:bg-(--color-primary)/90'
                        }`}
                      >
                        {submitting ? (
                          <span className='flex items-center justify-center gap-2'>
                            <Icon icon='mdi:loading' className='w-5 h-5 animate-spin' />
                            Submitting...
                          </span>
                        ) : (
                          'Submit Membership'
                        )}
                      </motion.button>

                      {/* Cancel Button */}
                      <button
                        type='button'
                        onClick={closeMembershipForm}
                        className='w-full py-3 px-6 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-all'
                      >
                        Cancel
                      </button>
                    </form>
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
