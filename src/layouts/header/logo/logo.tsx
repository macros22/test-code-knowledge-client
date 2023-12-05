import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { FC } from 'react'

export interface LogoProps {
  size?: 'sm' | 'md'
}

export const Logo: FC<LogoProps> = ({ size = 'md' }) => {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 space-x-2 font-bold uppercase ${
        size === 'sm' ? 'text-sm' : ''
      }`}
    >
      {siteConfig.name}
      <Icons.code
        className={`${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} text-primary`}
      />
    </Link>
  )
}
