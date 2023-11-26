import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mx-auto max-w-6xl px-6 lg:max-w-5xl', className)}
    {...props}
  />
))
Container.displayName = 'Container'
