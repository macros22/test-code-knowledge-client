import useSWRMutation from 'swr/mutation'
import { authApi } from '../../api/auth.api'
import { SIGN_IN_URL } from '../../constants/urls'

export const useSignInMutation = () =>
  useSWRMutation(SIGN_IN_URL, authApi.signIn, {
    onError: () => {
      console.log('error occured')
    },
    onSuccess(data, key, config) {
      console.log('successful sign in')
    },
  })
