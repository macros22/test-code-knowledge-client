import cn from 'clsx'
import { format } from 'date-fns'
import { FC } from 'react'
import { Container } from '@/components/container/container'
import { FooterProps } from './footer.props'
import { GithubIcon } from 'lucide-react'
import { Logo } from '../header/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer
      className={cn(
        className,
        'bg-light mt-auto flex flex-wrap justify-center border-t py-4  align-middle',
      )}
      {...props}
    >
      <Container className="flex w-full flex-wrap justify-center self-center align-middle">
        <div className="xs:gap-2 flex flex-wrap justify-center align-middle sm:gap-4">
          <Logo size="sm" />
          <p className="!mt-0 py-2 text-muted-foreground">
            {' '}
            2021 - {format(new Date(), 'yyyy')}
          </p>
        </div>
        
        <a
          href="https://github.com/kramax42/test-code-knowledge-client"
          target="_blank"
          rel="noreferrer"
          className="flex justify-between gap-2 rounded-md px-4 py-2 capitalize text-muted-foreground hover:bg-accent hover:text-accent-foreground md:ml-auto"
        >
          <GithubIcon className="my-auto" />
          {` Github`}
        </a>
        <ThemeToggle />
      </Container>
    </footer>
  )
}
