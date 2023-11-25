import useSWR from 'swr'
import { useSessionStorage } from './useSessionStorage'
import { isGuestName } from '../constants/names.storage'
import { authApi } from '../api/auth.api'
import { Role } from '../interfaces/user.interface'

export const useUser = () => {
  // Used isGuest to not make request for guest users.
  const [isGuest, setIsGuest] = useSessionStorage<boolean>(isGuestName, true)

  const {
    data: user,
    mutate,
    error,
  } = useSWR(isGuest ? null : 'user', authApi.getUser)

  const isLoading = !user && !error
  const isLoggedIn = Boolean(!error && user)
  const isAdmin = user?.role == Role.Admin

  const mutateUser = ({ isGuest }: { isGuest: boolean }) => {
    setIsGuest(isGuest)
    mutate()
  }

  return {
    isLoading,
    isLoggedIn,
    user,
    isAdmin,
    mutateUser,
  }
}
