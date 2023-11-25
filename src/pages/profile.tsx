import { withLayout } from '@/layouts'
import { useUser } from '@/lib/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProfilePage = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('auth/sign-in')
    }
  }, [user])

  return (
    <>
      <h4>email: {user?.email}</h4>
      <h4>name: {user?.name}</h4>
      <h4>role: {user?.role}</h4>
    </>
  )
}

// export default ProfilePage
export default withLayout('main', ProfilePage)
