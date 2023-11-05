import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { Container } from '@/components/Container'
import { NavSelect } from './nav-select'
import { useUser } from '@/lib/hooks'
import { authApi } from '@/lib/api/auth.api'
import { Logo } from './logo'

export function Header() {
  const { mutateUser, isLoggedIn } = useUser()

  const logoutHandler = async () => {
    await authApi.logout()
    mutateUser({ isGuest: true })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Container className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <NavSelect itemsMode="snippets" />
            <NavSelect itemsMode="questions" />
            <NavSelect itemsMode="test" />
            {isLoggedIn ? (
              <>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="text-sm capitalize text-muted-foreground"
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-sm capitalize text-muted-foreground"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/auth/sign-in"
                className="text-sm capitalize text-muted-foreground"
              >
                SignIn
              </Link>
            )}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.twitter className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  )
}
