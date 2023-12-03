import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Container } from '@/components/container/container'
import { NavSelect } from './nav-select'
import { useUser } from '@/lib/hooks'
import { authApi } from '@/lib/api/auth.api'
import { Logo } from './logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { useEffect } from 'react'
import { useUserInfo } from '@/lib/hooks/auth/use-user-info'
import { useGithubUserInfo } from '@/lib/hooks/auth/use-github-user-info'


export const Header = () => {
  const { mutateUser, isLoggedIn } = useUser()
  const { githubUserInfo } = useGithubUserInfo()

  useEffect(() => {
    console.log("userInfo", githubUserInfo);
  }, [githubUserInfo])

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
                href="/autho/sign-in"
                className="text-sm capitalize text-muted-foreground"
              >
                SignIn
              </Link>
            )}
            
            <Button onClick={() => signOut()}>logout ST</Button>

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
