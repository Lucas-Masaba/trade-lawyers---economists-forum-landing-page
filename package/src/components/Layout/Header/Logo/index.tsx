import Link from 'next/link'
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <Link href='/' className='inline-block max-w-xs'>
      <Image
        src='/images/trade_logo.png'
        alt='TLEF Logo'
        width={80}
        height={80}
        priority
        style={{ maxWidth: '180px', height: 'auto' }}
      />
    </Link>
  )
}

export default Logo
