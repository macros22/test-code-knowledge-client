import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

// from shadecn examples:
{
  /* <div className="relative">
<div className="absolute inset-0 flex items-center">
  <span className="w-full border-t" />
</div>
<div className="relative flex justify-center text-xs uppercase">
  <span className="bg-background px-2 text-muted-foreground">
    Or continue with
  </span>
</div>
</div> */
}

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        {
          'my-4 flex items-center bg-current text-sm before:me-6 before:flex-[1_1_0%] before:border-t after:ms-6 after:flex-[1_1_0%] after:border-t dark:text-white dark:before:border-gray-600 dark:after:border-gray-600':
            Boolean(props.children),
        },
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  ),
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
