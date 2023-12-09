import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/container/container'
import { AvatarMenu } from './avatar-menu'
import { Logo } from './logo'
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import { useSuperTokensSession } from '@/lib/hooks/use-super-tokens-session'
import { NavSelect } from './nav-select'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const Header = () => {
  const { isAuthenticated } = useSuperTokensSession()

  const handleLogOut = () => {
    signOut()
  }

  const links = (
    <>
      <NavSelect itemsMode="snippets" />
      <NavSelect itemsMode="questions" />
      <NavSelect itemsMode="test" />
    </>
  )

  const profile = (
    <div className="flex gap-3">
      <AvatarMenu />
      <Link
        href="/profile"
        className="pt-1 text-sm capitalize text-muted-foreground"
      >
        Profile info
      </Link>
    </div>
  )

  return (
    <header className={`sticky top-0 z-40 w-full border-b bg-background`}>
      <Container className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex md:items-center md:space-x-1">
            {links}

            {isAuthenticated ? (
              <Sheet>
                <SheetTrigger>
                  <AvatarMenu />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{profile}</SheetTitle>
                  </SheetHeader>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        variant="secondary"
                        className="mt-auto text-sm capitalize text-muted-foreground md:mt-0"
                        onClick={handleLogOut}
                      >
                        Logout
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ) : (
              <Link
                href="/auth"
                className="text-sm capitalize text-muted-foreground"
              >
                SignIn
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Button
                  variant="ghost"
                  className="justify-between text-sm capitalize text-muted-foreground"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-2">
                  {profile}
                  {links}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      variant="secondary"
                      className="mt-auto text-sm capitalize text-muted-foreground md:mt-0"
                      onClick={handleLogOut}
                    >
                      Logout
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  )
}
