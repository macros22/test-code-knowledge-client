import { Role } from '@/lib/interfaces/user.interface'
import { useUser } from '../../useUser'
import { questionsApi } from '@/lib/api/questions.api'

export const useQuestionsApi = () => {
  const { user } = useUser()
  const userRole = user?.role ? user.role : Role.User

  return {
    api: questionsApi(userRole),
  }
}
