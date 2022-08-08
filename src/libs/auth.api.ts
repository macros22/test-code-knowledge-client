import axios from 'axios';
import { AUTH_ME_URL, LOGOUT_URL, SIGN_IN_URL } from 'constants/urls';
import { IUser } from 'interfaces/user.interface';

export const authApi = {
	login: async (email: string, password: string) => {
		try {
			const res = await axios.post(
				SIGN_IN_URL,
				{
					email,
					password,
				},
				{ withCredentials: true }
			);

			// accessToken
			return res.data;
		} catch (error) {
			console.log(error);
		}

		return '';
	},

	getUser: async () => {
		try {
			let res = await axios.get(AUTH_ME_URL, { withCredentials: true });
			// return res.data as IUser;
			return res.data as IUser;
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
}
