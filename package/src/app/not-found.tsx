import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you requested does not exist or may have moved.',
  robots: {
    index: false,
    follow: false,
  },
}

const ErrorPage = () => {
  return (
    <main className='bg-white pt-28 pb-10 md:pt-32'>
      <section className='container mx-auto max-w-(--breakpoint-xl) px-4'>
        <div className='min-h-[calc(100vh-21rem)] flex items-center justify-center'>
          <div className='text-center max-w-2xl'>
            <p className='text-sm uppercase tracking-[0.28em] text-(--color-primary) font-semibold'>
              Error 404
            </p>
            <h1 className='mt-4 text-4xl md:text-6xl font-bold text-darkmode'>
              Page not found
            </h1>
            <p className='mt-5 text-base md:text-lg text-black/70'>
              The page you are looking for does not exist or may have moved.
            </p>
            <Link
              href='/'
              className='inline-flex mt-8 rounded-full bg-(--color-primary) px-8 py-3 text-white font-semibold hover:bg-(--color-primary)/90 transition-colors'>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ErrorPage
