import cn from 'clsx'
import { format } from 'date-fns'
import { FC } from 'react'
import { Container } from '@/components/container/container'
import { FooterProps } from './footer.props'
import { GithubIcon } from 'lucide-react'
import { Logo } from '../header/logo'

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer
      className={cn(className, 'bg-light mt-auto border-t h-16 flex')}
      {...props}
    >
      <Container className="flex self-center w-full">

        <div className='flex gap-4 align-middle'>
        <Logo size='sm' />
        <p className='py-2 !mt-0 text-muted-foreground'> 2021 - {format(new Date(), 'yyyy')}</p>
        </div>
        <a
          href="https://github.com/kramax42/test-code-knowledge-client"
          target="_blank"
          rel="noreferrer"
          
          className="ml-auto flex gap-2 justify-between capitalize text-muted-foreground hover:bg-accent hover:text-accent-foreground py-2 px-4 rounded-md"
        >
          <GithubIcon className="my-auto" />
          {` Github`}
        </a>
      </Container>
    </footer>
  )
}
