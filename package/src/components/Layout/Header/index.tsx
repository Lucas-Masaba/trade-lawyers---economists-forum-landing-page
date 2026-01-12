'use client'
import { Key, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { HeaderItem } from '@/types/menu'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const navbarRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  // header data fetch

  const [headerData, setHeaderData] = useState<HeaderItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setHeaderData(data.headerData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 border-b ${
        sticky
          ? 'shadow-lg bg-[var(--color-primary)]/90 backdrop-blur-lg border-white/10'
          : 'bg-[var(--color-primary)]/100 backdrop-blur-lg shadow-none border-white/10'
      }`}>
      <div className='lg:py-0 py-1'>
        <div className='container mx-auto max-w-(--breakpoint-xl) flex items-center justify-between px-4 text-white'>
          <div
            className={`pr-10 lg:border-r border-[var(--color-primary)]/10 duration-300 transition-all transform ${
              sticky ? 'py-2 scale-95' : 'py-3'
            }`}>
            <div className='bg-white px-2 py-1 rounded-sm hover:shadow-lg transition-shadow duration-300'>
              <Logo />
            </div>
          </div>
          <nav className='hidden lg:flex grow items-center gap-8 justify-center text-white'>
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div
            className={`flex items-center gap-4 pl-16 lg:border-l border-white/20 duration-300 transition-all ${
              sticky ? 'py-2' : 'py-3'
            }`}>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300 active:scale-95'
              aria-label='Toggle mobile menu'>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${navbarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${navbarOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${navbarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40 animate-in fade-in' onClick={() => setNavbarOpen(false)} />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-screen w-full shadow-lg transform transition-all duration-500 max-w-xs ${
            navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50 bg-[var(--color-primary)]`}>
          <div className='flex items-center justify-between p-4 bg-white'>
            <h2 className='text-lg font-bold'>
              <Logo />
            </h2>

            {/*  */}
            <button
              onClick={() => setNavbarOpen(false)}
              className="bg-[url('/images/closed.svg')] bg-no-repeat bg-contain w-5 h-5 absolute top-4 right-4"
              style={{ filter: 'brightness(0) saturate(100%) invert(15%) sepia(28%) saturate(1844%) hue-rotate(163deg) brightness(95%) contrast(93%)' }}
              aria-label='Close menu Modal'></button>
          </div>
          <nav className='flex flex-col items-start p-4 h-full'>
            {headerData.map(
              (item: HeaderItem, index: Key | null | undefined) => (
                <MobileHeaderLink key={index} item={item} />
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
