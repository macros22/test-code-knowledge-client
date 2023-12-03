import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { withLayout } from '@/layouts'
import { useUserInfo } from '@/lib/hooks/auth/use-user-info'
import { useSuperTokensSession } from '@/lib/hooks/use-super-tokens-session'
import { useUser } from '@/lib/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProfilePage = () => {
  // const { user } = useUser()
  const { isAuthenticated } = useSuperTokensSession()
  const { userInfo } = useUserInfo()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('auth')
    }
  }, [router, isAuthenticated])

  return (
    <Card className="mx-auto w-[500px]">
      <CardHeader>
        <CardTitle>User info</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <h5>email: {userInfo?.emails[0]}</h5>
        <h5>id: {userInfo?.id}</h5>
        {/* <form>
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name of your project" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="framework">Framework</Label>
        <Select>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </form> */}
      </CardContent>
      {/* <CardFooter className="flex justify-between">
  <Button variant="outline">Cancel</Button>
  <Button>Deploy</Button>
</CardFooter> */}
    </Card>
  )
}

export default withLayout('main', ProfilePage)
