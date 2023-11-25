import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="inline-block font-bold uppercase">
        {siteConfig.name}
      </span>
      <Icons.code className="h-6 w-6 text-primary" />
    </Link>
  )
}
