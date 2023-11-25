import cn from 'clsx'
import { format } from 'date-fns'
import { FC } from 'react'
import { Container } from '@/components/Container'
import { FooterProps } from './footer.props'

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer
      className={cn(className, 'bg-light mt-auto border-t py-4')}
      {...props}
    >
      <Container className="flex">
        <p>Code knowledge test © 2021 - {format(new Date(), 'yyyy')}</p>
        <a
          href="https://github.com/kramax42/test-code-knowledge-client"
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex gap-2"
        >
          {/* <BsGithub className="my-auto" /> */}
          {` Github`}
        </a>
      </Container>
    </footer>
  )
}
