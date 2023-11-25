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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

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

            <ThemeToggle />
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  )
}
