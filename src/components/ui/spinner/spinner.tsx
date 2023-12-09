import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { FC, HTMLAttributes, SVGProps } from 'react'

export interface SpinnerProps
  extends Pick<SVGProps<SVGSVGElement>, 'className'> {}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <Loader2 className={cn(className, 'mr-2 h-4 w-4 animate-spin')} />
}
