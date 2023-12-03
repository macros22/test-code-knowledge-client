import useSWR from 'swr'
import { GITHUB_USER_INFO, USER_INFO_URL } from '@/lib/constants/urls'
import { authApi } from '@/lib/api/auth.api'
import { useUserInfo } from './use-user-info'

export const useGithubUserInfo = () => {
  const { userInfo } = useUserInfo()

  console.log('userInfo', userInfo)

  const { data: githubUserInfo, error } = useSWR(
    `${GITHUB_USER_INFO}/${userInfo?.id}`,
    authApi.githubUserInfo,
  )

  const isLoadingGithubUserInfo = !githubUserInfo && !error

  return {
    isLoadingGithubUserInfo,
    githubUserInfo,
  }
}
