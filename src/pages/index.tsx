import { Categories } from '@/components/categories'
import { withLayout } from '@/layouts'
import { useUser } from '@/lib/hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CategoriesPage = () => {
  //   const { user } = useUser();
  //   const router = useRouter();

  //  useEffect(() => {
  //     if (!user) {
  //       router.replace('auth/sign-in');
  //     }
  //   }, [user]);

  return <Categories />
}

// export default ProfilePage
export default withLayout('main', CategoriesPage)
