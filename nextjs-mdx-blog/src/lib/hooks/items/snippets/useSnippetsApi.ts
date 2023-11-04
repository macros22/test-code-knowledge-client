import { snippetsApi } from '@/lib/api/snippets.api'
import { Role } from '@/lib/interfaces/user.interface'
import { useUser } from '../../useUser'

export const useSnippetsApi = () => {
  const { user } = useUser()
  const userRole = user?.role ? user.role : Role.User

  return {
    api: snippetsApi(userRole),
  }
}
