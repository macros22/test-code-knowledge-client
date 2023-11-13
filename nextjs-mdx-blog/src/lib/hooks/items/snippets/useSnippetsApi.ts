import { snippetsApi } from '@/lib/api/snippets.api'
import { Role } from '@/lib/interfaces/user.interface'
import { useUser } from '../../useUser'

export const useSnippetsApi = () => {
  return {
    api: snippetsApi(),
  }
}
