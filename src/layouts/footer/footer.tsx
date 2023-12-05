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
      className={cn(className, 'bg-light mt-auto flex h-16 border-t')}
      {...props}
    >
      <Container className="flex w-full self-center">
        <div className="flex gap-4 align-middle">
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
          className="ml-auto flex justify-between gap-2 rounded-md px-4 py-2 capitalize text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <GithubIcon className="my-auto" />
          {` Github`}
        </a>
      </Container>
    </footer>
  )
}
