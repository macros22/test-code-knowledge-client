import useSWRMutation from 'swr/mutation'
import { authApi } from '../../api/auth.api'
import { SIGN_UP_URL } from '../../constants/urls'

export const useSignUpMutation = () =>
  useSWRMutation(SIGN_UP_URL, authApi.signUp, {
    onError: () => {
      console.log('error occured')
    },
    onSuccess(data, key, config) {
      console.log('successful sign in')
    },
  })
