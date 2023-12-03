import axios, { AxiosError } from 'axios'
import {
  SIGN_IN_URL,
  SIGN_UP_URL,
  AUTH_ME_URL,
  LOGOUT_URL,
  USER_INFO_URL,
  GITHUB_USER_INFO,
} from '../constants/urls'
import { ISignInDto, ISignUpDto, IUser } from '../interfaces/user.interface'

export const authApi = {
  signIn: async (url: string, { arg }: { arg: ISignInDto }) => {
    await axios.post<ISignInDto>(url, arg, { withCredentials: true })
  },
  signUp: async (url: string, { arg }: { arg: ISignUpDto }) => {
    await axios.post<ISignUpDto>(url, arg, { withCredentials: true })
  },

  getUser: async () => {
    try {
      let res = await axios.get(AUTH_ME_URL, { withCredentials: true })
      return res.data.user as IUser
    } catch (error) {
      // console.log(error);
      throw error
    }
  },

  userInfo: async (url:string) => {
    const { data } = await axios.get(url);
    
    return data as {emails: string[]; id: string};
  },

  githubUserInfo: async (url: string) => {
    const { data } = await axios.get(url);
    
    return data;
  },

  logout: async () => {
    try {
      await axios.delete(LOGOUT_URL, { withCredentials: true })
    } catch (error) {
      console.log(error)
    }
  },
}
