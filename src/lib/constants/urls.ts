import { isDev } from "../config"
// const prodURL = 'https://test-code-knowledge-server-ienqjjed1-max99xam.vercel.app/api'
const prodURL = 'https://test-code-knowledge-server.onrender.com/api'
export const BASE_URL = isDev ? 'http://localhost:3010/api': prodURL;

export const QUESTIONS_BASE_URL = BASE_URL + '/questions'
export const RANDOM_QUESTIONS_BASE_URL = QUESTIONS_BASE_URL + '/random'

export const SNIPPETS_BASE_URL = BASE_URL + '/snippets'

export const AUTH_ME_URL = BASE_URL + '/auth/me'
export const LOGOUT_URL = BASE_URL + '/auth/log-out'
export const SIGN_IN_URL = BASE_URL + '/auth/sign-in'
export const SIGN_UP_URL = BASE_URL + '/auth/sign-up'
