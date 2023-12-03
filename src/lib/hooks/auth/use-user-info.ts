import useSWR from 'swr'
import { USER_INFO_URL } from '@/lib/constants/urls'
import { authApi } from '@/lib/api/auth.api'

export const useUserInfo = () => {
  const {
    data: userInfo,
    error,
  } = useSWR(USER_INFO_URL, authApi.userInfo)

  const isLoadingUserInfo = !userInfo && !error

  return {
    isLoadingUserInfo,
    userInfo,
  }
}
