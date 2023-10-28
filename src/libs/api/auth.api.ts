import axios, { AxiosError } from 'axios';
import {
  AUTH_ME_URL,
  LOGOUT_URL,
  SIGN_IN_URL,
  SIGN_UP_URL
} from 'libs/constants/urls';
import { ISignInDto, ISignUpDto, IUser } from 'libs/interfaces/user.interface';

export const authApi = {
  signIn: async (dto: ISignInDto) => {
    try {
      const res = await axios.post(SIGN_IN_URL, dto, { withCredentials: true });

      // accessToken
      return res.data;
    } catch (error) {
      console.log(error);
    }

    return '';
  },

  signUp: async (dto: ISignUpDto) => {
    try {
      const res = await axios.post(SIGN_UP_URL, dto, { withCredentials: true });
      return { user: res.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { errorMessage: error.response?.data.message };
      }
    }

    return {
      user: undefined,
      errorMessage: undefined
    };
  },

  getUser: async () => {
    try {
      let res = await axios.get(AUTH_ME_URL, { withCredentials: true });
      return res.data.user as IUser;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.delete(LOGOUT_URL, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  }
};
