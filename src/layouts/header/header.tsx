import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Container } from '@/components/container/container'
import { AvatarMenu } from './avatar-menu'
import { useUser } from '@/lib/hooks'
import { authApi } from '@/lib/api/auth.api'
import { Logo } from './logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { useEffect, useState } from 'react'
import { useUserInfo } from '@/lib/hooks/auth/use-user-info'
import { useGithubUserInfo } from '@/lib/hooks/auth/use-github-user-info'
import { useSuperTokensSession } from '@/lib/hooks/use-super-tokens-session'
import { NavSelect } from './nav-select'
import { Menu } from 'lucide-react'

export const Header = () => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false)
  // const { mutateUser, isLoggedIn } = useUser()
  // const { githubUserInfo } = useGithubUserInfo()
  const { isAuthenticated } = useSuperTokensSession()

  // useEffect(() => {
  //   console.log('userInfo', githubUserInfo)
  // }, [githubUserInfo])

  const handleLogOut = () => {
    signOut()
    // await authApi.logout()
    // mutateUser({ isGuest: true })
  }

  const links = (
    <>
      <NavSelect itemsMode="snippets" />
      <NavSelect itemsMode="questions" />
      <NavSelect itemsMode="test" />
      {isAuthenticated ? (
        <>
          <Button
            variant="ghost"
            className="text-sm capitalize text-muted-foreground"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/auth" className="text-sm capitalize text-muted-foreground">
          SignIn
        </Link>
      )}
    </>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Container className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="">
            <div className="hidden md:flex md:items-center md:space-x-1">
              {links}

              <ThemeToggle />
              <AvatarMenu />
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsBurgerOpened(true)}
                className="justify-between text-sm capitalize text-muted-foreground"
              >
                <Menu />
              </Button>
              <div
                className={`fixed bottom-0 left-0 mt-8 h-screen w-screen flex-1 justify-self-center bg-background pb-3 md:mt-0 md:block md:pb-0 ${
                  isBurgerOpened ? 'flex flex-col px-5 pt-12' : 'hidden'
                }`}
              >
                <Button
                  variant="ghost"
                  onClick={() => setIsBurgerOpened(false)}
                  className="absolute right-4 top-4 justify-between text-sm capitalize text-muted-foreground"
                >
                  <Menu />
                </Button>
                {links}
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  )
}
